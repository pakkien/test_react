import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
	write_mccr: boolean;
	write_quotation: boolean;
};

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [userData, setUserData] = useState<UserDataType>();

	useEffect(() => {
		//set userData from local storage
		var userData_cached = localStorage.getItem('bts_userData') || '';	
		if (userData_cached != '') {
			var userData_cached2 = JSON.parse(userData_cached);
			setUserData({
				refresh_token: userData_cached2.refresh_token,
				token: userData_cached2.token,
				email: userData_cached2.email,
				id: userData_cached2.id,
				mobile: userData_cached2.mobile,
				name: userData_cached2.name,
				role: userData_cached2.role,
				view_mccr: userData_cached2.view_mccr,
				view_quotation: userData_cached2.view_quotation,
				write_mccr: userData_cached2.write_mccr,
				write_quotation: userData_cached2.write_quotation,
			});
		}

		const interval = setInterval(() => {
			handleRefresh();

		}, 30 * 60 * 1000); //30min refresh interval
		return () => clearInterval(interval);
	}, []);

	const handleRefresh = async () => {
		console.log('refresh is called');
		var refresh_token = localStorage.getItem('bts_refreshtoken') || '';

		if (refresh_token != '') {
			refreshTokenAPICall(refresh_token);
		} else {
			setUserData(undefined);
		}
	};

	const refreshTokenAPICall = async (refresh_token: string) => {
		const payload = {
			refresh_token: refresh_token,
		};

		axios
			.post(import.meta.env.VITE_BASE_URL + `/auth/refresh`, payload)
			.then((response) => {
				localStorage.setItem('bts_UserEmail', response.data.user.email);
				localStorage.setItem('bts_token', response.data.token);
				localStorage.setItem('bts_refreshtoken', response.data.refresh_token);

				var userData = {
					refresh_token: response.data.refresh_token,
					token: response.data.token,
					email: response.data.user.email,
					id: response.data.user.id,
					mobile: response.data.user.mobile,
					name: response.data.user.name,
					role: response.data.user.role,
					view_mccr: response.data.user.view_mccr,
					view_quotation: response.data.user.view_quotation,
					write_mccr: response.data.user.write_mccr,
					write_quotation: response.data.user.write_quotation,
				};

				localStorage.setItem('bts_userData', JSON.stringify(userData));

				//set for UI elements
				setUserData({
					refresh_token: response.data.refresh_token,
					token: response.data.token,
					email: response.data.user.email,
					id: response.data.user.id,
					mobile: response.data.user.mobile,
					name: response.data.user.name,
					role: response.data.user.role,
					view_mccr: response.data.user.view_mccr,
					view_quotation: response.data.user.view_quotation,
					write_mccr: response.data.user.write_mccr,
					write_quotation: response.data.user.write_quotation,
				});
			})
			.catch((error) => {
				setUserData(undefined);
			});
	};

	return (
		<AuthContext.Provider value={{ userData, setUserData }}>{children}</AuthContext.Provider>
	);
};

AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
