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
import USERS, { getUserDataWithEmail, getUserDataWithUsername } from '../../../common/data/userDummyData';
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
	const { setUser } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	//const [signInPassword, setSignInPassword] = useState<boolean>(false);
	//const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);

	// const emailCheck = (email: string) => {
	// 	return !!getUserDataWithEmail(email);
	// };

	// const passwordCheck = (email: string, password: string) => {
	// 	return getUserDataWithEmail(email).password === password;
	// };

	const loginApiCall = async (email: string, password: string) => {
		const payload = {
			email: email,
			password: password
		};
		
		axios.post(`http://127.0.0.1:5000/auth/login`, payload).then((response) => {

			console.log(response.data);
			if (setUser) {
				setUser(email);
			}

			handleOnClick();
			localStorage.setItem('bts_token', response.data.token);

			//cache token
			//return true;
		  }).catch(error => {
			formik.setFieldError('loginPassword', 'Username and password do not match.');
			//return false;
		  });
	}

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginEmail: '',
			loginPassword: '' ,
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
	// const handleContinue = () => {
	// 	setIsLoading(true);
	// 	setTimeout(() => {
	// 		if (
	// 			!Object.keys(USERS).find(
	// 				(f) => USERS[f].email?.toString() == formik.values.loginEmail,
	// 			)
	// 		) {
	// 			formik.setFieldError('loginEmail', 'No such user found in the system.');
	// 		} else {
	// 			setSignInPassword(true);
	// 		}
	// 		setIsLoading(false);
	// 	}, 1000);
	// };

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
									})}>
									{/* <div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Login
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Sign Up
											</Button>
										</div>
									</div> */}
								</div>

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
												label='Your email'
												// className={classNames({
												// 	'd-none': signInPassword,
												// })}
												>
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
											{/* {signInPassword && (
												<div className='text-center h4 mb-3 fw-bold'>
													Hi, {formik.values.loginEmail}.
												</div>
											)} */}
										</div>
										<div>
											<FormGroup
												id='loginPassword'
												isFloating
												label='Password'
												// className={classNames({
												// 	'd-none': !signInPassword,
												// })}
											>
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

									{/* BEGIN :: Social Login */}

									{/* END :: Social Login */}
								</form>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
			{/* <div className='text-center'>
				<a
					href='/'
					className={classNames('text-decoration-none me-3', {
						'link-light': singUpStatus,
						'link-dark': !singUpStatus,
					})}>
					Privacy policy
				</a>
				<a
					href='/'
					className={classNames('link-light text-decoration-none', {
						'link-light': singUpStatus,
						'link-dark': !singUpStatus,
					})}>
					Terms of use
				</a>
			</div> */}
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
