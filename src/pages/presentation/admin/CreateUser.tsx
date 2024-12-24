import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';

import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import Button from '../../../components/bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from '../../../components/bootstrap/forms/Select';
import axios from 'axios';

const SELECT_ROLE_OPTIONS = [
	{ value: 'admin', text: 'Admin' },
	{ value: 'user', text: 'User' },
];

type UserDataType = {
	id: number;
	email: string;
	name: string;
	mobile: string;
	role: string;
    password: string;
	view_mccr: boolean;
	view_quotation: boolean;
	write_mccr: boolean;
	write_quotation: boolean;
};

const CreateUser = () => {
	const navigate = useNavigate();
	const { user_id } = useParams();
	const [userData, setUserData] = useState<UserDataType>();

	const fetchData = async () => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		axios.get(import.meta.env.VITE_BASE_URL + `/users/${user_id}`, config).then((response) => {
			setUserData(response.data.data);
		});
	};

	//Get Users table data
	useEffect(() => {
		fetchData();
	}, []);

	const formik = useFormik({
		initialValues: {
			name: '',
			role: '',
			email: '',
			mobile: '',
            password: '',
            retype_password: '',
			view_quotation: true,
			write_quotation: true,
			view_mccr: true,
			write_mccr: true,
		},
		enableReinitialize: true,
		validate: (values) => {
			const errors: {
				name?: string;
				role?: string;
				email?: string;
				mobile?: string;
                password?: string;
                retype_password?: string;
			} = {};


			if (!values.name) {
				errors.name = 'Required';
			}
			if (!values.role) {
				errors.role = 'Required';
			}
			if (!values.email) {
				errors.email = 'Required';
			}
			if (!values.mobile) {
				errors.mobile = 'Required';
			}
            if (!values.password) {
				errors.password = 'Required';
			}
            if (!values.retype_password) {
				errors.retype_password = 'Required';
                
			}
            if(values.retype_password != values.password){
                errors.retype_password = 'Retype password not match';
            }

			return errors;
		},
		onSubmit: async (values) => {


			await handleSubmit(values);

			
		},
	});

	const handleSubmit = async(values: any) => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		const payload = {
			name: values.name,
			role: values.role,
			email: values.email,
			mobile: values.mobile,
            password: values.password,
			view_quotation: values.view_quotation? true: false,
			write_quotation: values.write_quotation? true: false,
			view_mccr: values.view_mccr? true: false,
			write_mccr: values.write_mccr? true: false,
		};

		axios
			.post(import.meta.env.VITE_BASE_URL + `/users`, payload, config)
			.then((response) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>New User Added Successfully</span>
					</span>,
					'User Added.',
				);
				navigate(`../admin`, {replace: true});


			})
			.catch((errors) => 
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Error!</span>
					</span>,
					errors,
				)
			);
	};


	return (
		<PageWrapper title='Manage User'>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>Create User</strong>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-xl-12 col-lg-12 col-md-6'>
						<Card stretch tag='form'>
							<CardHeader>
								<CardLabel>
									<CardTitle tag='div' className='h3'>
										Create User
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='pb-0' isScrollable>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup id='name' label='Name' isFloating>
											<Input
												placeholder='Name'
												autoComplete='additional-name'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.name}
												isValid={formik.isValid}
												isTouched={formik.touched.name}
												invalidFeedback={formik.errors.name}
												validFeedback='Valid Name'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='role' label='Role' isFloating>
											<Select
												id='inputGroupSelect01'
												ariaLabel='Default select example'
												value={formik.values.role}
												list={SELECT_ROLE_OPTIONS}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.role}
												invalidFeedback={formik.errors.role}
												validFeedback='Valid Role'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='email' label='Email' isFloating>
											<Input
												placeholder='Email'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.email}
												isValid={formik.isValid}
												isTouched={formik.touched.email}
												invalidFeedback={formik.errors.email}
												validFeedback='Valid Email'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='mobile' label='Mobile' isFloating>
											<Input
												placeholder='Mobile'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.mobile}
												isValid={formik.isValid}
												isTouched={formik.touched.mobile}
												invalidFeedback={formik.errors.mobile}
												validFeedback='Valid Mobile'
											/>
										</FormGroup>
									</div>
                                    <div className='col-md-6'>
										<FormGroup id='password' label='Password' isFloating>
											<Input
												placeholder='Password'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.password}
												isValid={formik.isValid}
												isTouched={formik.touched.password}
												invalidFeedback={formik.errors.password}
												validFeedback='Valid Password'
                                                type='password'
											/>
										</FormGroup>
									</div>
                                    <div className='col-md-6'>
										<FormGroup id='retype_password' label='Retype Password' isFloating>
											<Input
												placeholder='Retype Password'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.retype_password}
												isValid={formik.isValid}
												isTouched={formik.touched.retype_password}
												invalidFeedback={formik.errors.retype_password}
												validFeedback='Valid Retype Password'
                                                type='password'
											/>
										</FormGroup>
									</div>
									<div className='col-md-12'></div>
									<div className='col-md-12'>
										<h3>Manage Access</h3>
									</div>
									<div className='col-md-12'>
										<div className='row g-4'>
											<div className='col-md-3'>
												<FormGroup id='view_quotation'>
													<Checks
														type='switch'
														id='view_quotation'
														label='View Quotation'
														name='view_quotation'
														onChange={formik.handleChange}
														checked={formik.values.view_quotation}
													/>
												</FormGroup>
											</div>
											<div className='col-md-3'>
												<FormGroup id='write_quotation'>
													<Checks
														type='switch'
														id='write_quotation'
														label='Create / Edit Quotation'
														name='write_quotation'
														onChange={formik.handleChange}
														checked={formik.values.write_quotation}
													/>
												</FormGroup>
											</div>
											<div className='col-md-3'>
												<FormGroup id='view_mccr'>
													<Checks
														type='switch'
														id='view_mccr'
														label='View MCCR'
														name='view_mccr'
														onChange={formik.handleChange}
														checked={formik.values.view_mccr}
													/>
												</FormGroup>
											</div>
											<div className='col-md-3'>
												<FormGroup id='write_mccr'>
													<Checks
														type='switch'
														id='write_mccr'
														label='Create / Edit MCCR'
														name='write_mccr'
														onChange={formik.handleChange}
														checked={formik.values.write_mccr}
													/>
												</FormGroup>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterRight>
									<Button
										color='success'
										icon='Save'
										tag='a'
										target='_blank'
										//type='submit'
										onClick={formik.submitForm}
									>
										Save
									</Button>
								</CardFooterRight>
							</CardFooter>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default CreateUser;
