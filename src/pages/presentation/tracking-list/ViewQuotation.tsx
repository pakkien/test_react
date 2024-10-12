import React from 'react';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTabItem,
	CardTitle,
} from '../../../components/bootstrap/Card';

import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import Badge from '../../../components/bootstrap/Badge';
import SubItemDetails from './components/SubItemDetails';
import ItemDetails from './components/ItemDetails';
import Summary from './components/Summary';

const ViewQuotation = () => {
	const navigate = useNavigate();

	// const formik = useFormik({
	// 	initialValues: {
	// 		firstName: 'John',
	// 		lastName: 'Doe',
	// 		displayName: 'johndoe',
	// 		emailAddress: 'johndoe@site.com',
	// 		phone: '',
	// 		currentPassword: '',
	// 		newPassword: '',
	// 		confirmPassword: '',
	// 		checkOne: true,
	// 		checkTwo: false,
	// 		checkThree: true,
	// 	},
	// 	validate,
	// 	onSubmit: () => {
	// 		setIsLoading(true);
	// 		setTimeout(handleSave, 2000);
	// 	},
	// });

	return (
		<PageWrapper title='Admin'>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>Quotation No: </strong>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-xl-12 col-lg-12 col-md-12'>
						<Card tag='form'>
							<CardHeader>
								<CardLabel>
									<CardTitle tag='div' className='h3'>
										View Quotation
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='pb-0'>
								<div className='row g-4'>
									<div className='col-md-4'>
										<FormGroup
											id='QuotationDate'
											label='Quotation Date'
											isFloating>
											<Input placeholder='Name' defaultValue='31/01/2024' />
										</FormGroup>
									</div>
									<div className='col-md-8'>
										<FormGroup id='Client' label='Client' isFloating>
											<Input placeholder='Name' defaultValue='Client' />
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup id='EndUser' label='End User' isFloating>
											<Input placeholder='Name' defaultValue='KDU' />
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup
											id='SiteLocation'
											label='Site Location'
											isFloating>
											<Input placeholder='Name' defaultValue='KDU' />
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup id='Building' label='Building' isFloating>
											<Input placeholder='Name' defaultValue='KDU A' />
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup id='PIC' label='PIC' isFloating>
											<Input placeholder='Name' defaultValue='Jack' />
										</FormGroup>
									</div>
									<div className='col-md-8'>
										<FormGroup id='Email' label='Email' isFloating>
											<Input placeholder='Name' defaultValue='jack@kdu.com' />
										</FormGroup>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<></>
							</CardFooter>
						</Card>
					</div>
					<div className='col-xl-12 col-lg-12 col-md-12'>
						<Card hasTab>
							<CardTabItem id='Quotation' title='Quotation'>
								<ItemDetails />
							</CardTabItem>

							<CardTabItem id='Quotation' title='Variation 1'>
								<ItemDetails />
							</CardTabItem>

							<CardTabItem id='Quotation' title='Variation 2'>
								<ItemDetails />
							</CardTabItem>

							<CardTabItem id='Quotation' title='Variation 3'>
								<ItemDetails />
							</CardTabItem>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ViewQuotation;
