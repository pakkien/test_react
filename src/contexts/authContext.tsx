import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';


export interface IAuthContextProps {
	userData: UserDataType | undefined;
	setUserData: React.Dispatch<React.SetStateAction<UserDataType | undefined>>;

}

type UserDataType = {
	refresh_token: string;
	token: string;
	email: string;
	id: number;
	mobile: string;
	name: string;
	role: string;
	view_mccr: boolean;
	view_quotation: boolean;
	write_mccr: boolean,
	write_quotation: boolean;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [userData, setUserData] = useState<UserDataType>();


	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 	  console.log('This will be called every 2 seconds');

	// 	  //refresh token
	// 	  console.log(JSON.stringify(userData));
	// 	}, 2000);
	  
	// 	return () => clearInterval(interval);
	// }, []);

	//TODO: add refresh token
	return <AuthContext.Provider value={{userData, setUserData}}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
