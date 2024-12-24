import { PropsWithChildren, ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext";

type ProtectedRouteProps = PropsWithChildren;

type UserAccessProps = {
    children: ReactNode,
    view_mccr?: boolean;
	view_quotation?: boolean;
	write_mccr?: boolean;
	write_quotation?: boolean;
};


export function ProtectedRouteUser(props: UserAccessProps) {
    const { userData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        //console.log("userData:" + JSON.stringify(userData));
        var refresh_token = localStorage.getItem('bts_refreshtoken') || '';
        var token = localStorage.getItem('bts_token') || '';

        if(!userData || !refresh_token || !token){
            navigate('/auth-pages/login', {replace: true});
        }

        if(!userData?.view_quotation && props.view_quotation){
            navigate('/auth-pages/page403', {replace: true});
        }

        if(!userData?.write_quotation && props.write_quotation){
            navigate('/auth-pages/page403', {replace: true});
        }

        if(!userData?.view_mccr && props.view_mccr){
            navigate('/auth-pages/page403', {replace: true});
        }

        if(!userData?.write_mccr && props.write_mccr){
            navigate('/auth-pages/page403', {replace: true});
        }

    }, [navigate, userData])
    

    return props.children;
}

export function ProtectedRouteAdmin({children}: ProtectedRouteProps) {
    const { userData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        //console.log("userData:" + JSON.stringify(userData));
        var refresh_token = localStorage.getItem('bts_refreshtoken') || '';
        var token = localStorage.getItem('bts_token') || '';

        if(!userData || !refresh_token || !token){
            navigate('/auth-pages/page403', {replace: true});
        }

        if(userData?.role.toLowerCase() != 'admin'){
            navigate('/auth-pages/page403', {replace: true});
        }


    }, [navigate, userData])
    

    return children;
}