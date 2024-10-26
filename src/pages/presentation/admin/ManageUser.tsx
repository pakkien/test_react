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
import validate from '../../helper/editPagesValidate';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import Button from '../../../components/bootstrap/Button';
import Alert, { AlertHeading, AlertLink } from '../../../components/bootstrap/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/bootstrap/forms/Select';

const SELECT_ROLE_OPTIONS = [
	{ value: 'admin', text: 'Admin' },
	{ value: 'user', text: 'User' },

];


const ManageUser = () => {
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: 'John',
			role: 'Admin',
			email: 'abc@gmail.com',
		},
		validate,
		onSubmit: () => {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				"The user's account details have been successfully updated.",
			);
		},
	});

	const inlineCheckboxes = useFormik({
		initialValues: {
			viewQuotation: true,
			createEditQuotation: true,
			viewMCCR: true,
			createEditMCCR: true,
		},
		onSubmit: () => {},
	});

	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const handleButtonClick = () => {
		setIsAlertVisible(true);

		setTimeout(() => {
			setIsAlertVisible(false);
		}, 3000);
	};

	return (
		<PageWrapper title='Manage User'>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>Profile Information</strong>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				{isAlertVisible && (
					<Alert color='success' isLight icon='VerifiedUser' isDismissible>
						Save Success
					</Alert>
				)}
				<div className='row h-100'>
					<div className='col-xl-12 col-lg-12 col-md-6'>
						<Card stretch tag='form'>
							<CardHeader>
								<CardLabel>
									<CardTitle tag='div' className='h3'>
										Profile Information
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
									<div className='col-md-12'>
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
									<div className='col-md-12'>
										<h3>Manage Access</h3>
									</div>
									<div className='col-md-12'>
										<div className='row g-4'>
											<div className='col-md-3'>
												<Checks
													type='switch'
													id='viewQuotation'
													label='View Quotation'
													name='viewQuotation'
													onChange={inlineCheckboxes.handleChange}
													checked={inlineCheckboxes.values.viewQuotation}
												/>
											</div>
											<div className='col-md-3'>
												<Checks
													type='switch'
													id='createEditQuotation'
													label='Create / Edit Quotation'
													name='createEditQuotation'
													onChange={inlineCheckboxes.handleChange}
													checked={
														inlineCheckboxes.values.createEditQuotation
													}
												/>
											</div>
											<div className='col-md-3'>
												<Checks
													type='switch'
													id='viewMCCR'
													label='View MCCR'
													name='viewMCCR'
													onChange={inlineCheckboxes.handleChange}
													checked={inlineCheckboxes.values.viewMCCR}
												/>
											</div>
											<div className='col-md-3'>
												<Checks
													type='switch'
													id='createEditMCCR'
													label='Create / Edit MCCR'
													name='createEditMCCR'
													onChange={inlineCheckboxes.handleChange}
													checked={inlineCheckboxes.values.createEditMCCR}
												/>
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
										onClick={handleButtonClick}>
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

export default ManageUser;
