import React, { JSXElementConstructor, useState } from 'react';
import Button from '../../../../components/bootstrap/Button';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import Page from '../../../../layout/Page/Page';
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
} from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import SingleItem from './SingleItem';
import Summary from './Summary';
import { reference } from '@popperjs/core';
import { useFormik } from 'formik';
import validate from '../../../helper/EditQuotationValidate';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';

type QuotationProps = {
	mode: string;
	data: QuotationData;
};

type QuotationData = {
	quotation_id: string;
	client: string;
	end_user: string;
	site_location: string;
	building: string;
	pic: string;
	email: string;
	project_ref: string;
	item: item[];
	summary: summary;
};

type item = {
	item_id: string;
	product_desc: string;
	brand: string;
	model: string;
	remarks: string;
	quantity: number;
	unit: string;
	unit_cost: number;
	total_cost: number;
	margin: number;
	unit_price: number;
	total_price: number;
	sub_item: sub_item[];
};

type sub_item = {
	sub_item_id: string;
	product_desc: string;
	brand: string;
	model: string;
	remarks: string;
	quantity: number;
	unit: string;
	unit_cost: number;
	total_cost: number;
	margin: number;
	unit_price: number;
	total_price: number;
};

type summary = {
	reference_status: string;
	note: string;
	total: number;
	g_total: number;
};

const SingleQuotation = (QuotationProps: QuotationProps) => {
	const navigate = useNavigate();
	const title = QuotationProps.mode + ' Quotation';
	const isViewMode = QuotationProps.mode.toLowerCase() === 'view' ? true : false;

	const formik = useFormik({
		initialValues: {
			client: QuotationProps.data.client,
			end_user: QuotationProps.data.end_user,
			site_location: QuotationProps.data.site_location,
			building: QuotationProps.data.building,
			pic: QuotationProps.data.pic,
			email: QuotationProps.data.email,
			project_ref: QuotationProps.data.project_ref,
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

	return (
		<PageWrapper title={title}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>{QuotationProps.mode} Quotation</strong>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-xl-12 col-lg-12 col-md-12'>
						<Card tag='form'>
							<CardHeader>
								<CardLabel>
									<CardTitle tag='div' className='h3'>
										{QuotationProps.mode} Quotation
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='pb-0'>
								<div className='row g-4'>
									<div className='col-md-12'>
										<FormGroup id='client' label='Client' isFloating>
											<Input
												placeholder='client'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.client}
												isValid={formik.isValid}
												isTouched={formik.touched.client}
												invalidFeedback={formik.errors.client}
												validFeedback='Valid Client'
												disabled={isViewMode ? true : false}
											/>
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup id='end_user' label='End User' isFloating>
											<Input
												placeholder='end_user'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.end_user}
												isValid={formik.isValid}
												isTouched={formik.touched.end_user}
												invalidFeedback={formik.errors.end_user}
												validFeedback='Valid End User'
												disabled={isViewMode ? true : false}
											/>
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup
											id='site_location'
											label='Site Location'
											isFloating>
											<Input
												placeholder='site_location'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.site_location}
												isValid={formik.isValid}
												isTouched={formik.touched.site_location}
												invalidFeedback={formik.errors.site_location}
												validFeedback='Valid Site Location'
												disabled={isViewMode ? true : false}
											/>
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup id='building' label='Building' isFloating>
											<Input
												placeholder='building'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.building}
												isValid={formik.isValid}
												isTouched={formik.touched.building}
												invalidFeedback={formik.errors.building}
												validFeedback='Valid Building'
												disabled={isViewMode ? true : false}
											/>
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup id='pic' label='PIC' isFloating>
											<Input
												placeholder='pic'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.pic}
												isValid={formik.isValid}
												isTouched={formik.touched.pic}
												invalidFeedback={formik.errors.pic}
												validFeedback='Valid PIC'
												disabled={isViewMode ? true : false}
											/>
										</FormGroup>
									</div>
									<div className='col-md-8'>
										<FormGroup id='email' label='Email' isFloating>
											<Input
												placeholder='email'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.email}
												isValid={formik.isValid}
												isTouched={formik.touched.email}
												invalidFeedback={formik.errors.email}
												validFeedback='Valid Email'
												disabled={isViewMode ? true : false}
											/>
										</FormGroup>
									</div>
									<div className='col-md-12'>
										<FormGroup
											id='project_ref'
											label='Project Reference'
											isFloating>
											<Input
												placeholder='Project Reference'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.project_ref}
												isValid={formik.isValid}
												isTouched={formik.touched.project_ref}
												invalidFeedback={formik.errors.project_ref}
												validFeedback='Valid Project Reference'
												disabled={isViewMode ? true : false}
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterRight>
									<Button
										color='info'
										icon='Add'
										tag='a'
										target='_blank'
										hidden={isViewMode ? true : false}>
										Add Item
									</Button>
								</CardFooterRight>
							</CardFooter>
						</Card>
						<SingleItem mode={QuotationProps.mode} data={QuotationProps.data.item[0]} />
						<Summary />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default SingleQuotation;
