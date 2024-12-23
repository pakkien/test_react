import React, { FC, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import AuthContext from '../../../contexts/authContext';
import USERS, {
	getUserDataWithEmail,
	getUserDataWithUsername,
} from '../../../common/data/userDummyData';
import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';
import axios from 'axios';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Business Tracking System</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};
LoginHeader.defaultProps = {
	isNewUser: false,
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const { setUserData } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);

	//remove 
	localStorage.removeItem('bts_UserEmail');
	localStorage.removeItem('bts_token');
	localStorage.removeItem('bts_refreshtoken');

	const loginApiCall = async (email: string, password: string) => {
		const payload = {
			email: email,
			password: password,
		};

		axios
			.post(import.meta.env.VITE_BASE_URL + `/auth/login`, payload)
			.then((response) => {
				//console.log(response.data);
				// if (setUser) {
				// 	setUser(email);
				// }

				handleOnClick();
				localStorage.setItem('bts_UserEmail', response.data.user.email);
				localStorage.setItem('bts_token', response.data.token);
				localStorage.setItem('bts_refreshtoken', response.data.refresh_token);
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

				//cache token
				//return true;
			})
			.catch((error) => {
				formik.setFieldError('loginPassword', 'Username and password do not match.');
				//return false;
			});
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginEmail: '',
			loginPassword: '',
		},
		validate: (values) => {
			const errors: { loginEmail?: string; loginPassword?: string } = {};

			if (!values.loginEmail) {
				errors.loginEmail = 'Required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			loginApiCall(values.loginEmail, values.loginPassword);
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<PageWrapper isProtected={false} title='Login'>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-6 col-lg-12 col-md-12'>
						<Card data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}
										aria-label='Facit'>
										<Logo width={200} />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}></div>

								<LoginHeader isNewUser={false} />

								<Alert isLight icon='Lock' isDismissible>
									<div className='row'>
										<div className='col-12'>
											<strong>Email:</strong> tester1@email.com
										</div>
										<div className='col-12'>
											<strong>Password:</strong> password123
										</div>
									</div>
								</Alert>
								<form className='row g-4'>
									<>
										<div className='col-12'>
											<FormGroup
												id='loginEmail'
												isFloating
												label='Your email'>
												<Input
													autoComplete='username'
													value={formik.values.loginEmail}
													isTouched={formik.touched.loginEmail}
													invalidFeedback={formik.errors.loginEmail}
													isValid={formik.isValid}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													onFocus={() => {
														formik.setErrors({});
													}}
												/>
											</FormGroup>
										</div>
										<div>
											<FormGroup
												id='loginPassword'
												isFloating
												label='Password'>
												<Input
													type='password'
													autoComplete='current-password'
													value={formik.values.loginPassword}
													isTouched={formik.touched.loginPassword}
													invalidFeedback={formik.errors.loginPassword}
													validFeedback='Looks good!'
													isValid={formik.isValid}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<Button
												color='warning'
												className='w-100 py-3'
												onClick={formik.handleSubmit}>
												Login
											</Button>
										</div>
									</>
								</form>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
