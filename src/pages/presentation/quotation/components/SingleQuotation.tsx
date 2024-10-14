import React, {
	EventHandler,
	FormEventHandler,
	JSXElementConstructor,
	useEffect,
	useRef,
	useState,
} from 'react';
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
import { FieldArray, FormikProvider, useFormik } from 'formik';
import validate from '../../../helper/EditQuotationValidate';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import Item from '../../../../layout/Navigation/Item';
import { setTimeout } from 'timers/promises';
import ScrollspyNav from '../../../../components/bootstrap/ScrollspyNav';
import { OnValueChange } from 'react-number-format';

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
	total: string;
	g_total: string;
};

const SingleQuotation = (QuotationProps: QuotationProps) => {
	const navigate = useNavigate();
	const title = QuotationProps.mode + ' Quotation';
	const isViewMode = QuotationProps.mode.toLowerCase() === 'view' ? true : false;

	const [QuotationData, setQuotationData] = useState(QuotationProps);

	const [Count, setCount] = useState(0);

	const handleDelete = (_item: item) => {
		QuotationData.data.item = QuotationData.data.item.filter(
			(item) => item.item_id != _item.item_id,
		);
		setCount(Count + 1); //force rerendering
	};

	const handleAddItem = () => {
		CreateNewItem();
		setCount(Count + 1); //force rerendering
	};

	const handleEditItem = (_item: item) => {
		console.log(_item);
		setCount(Count + 1); //force rerendering
	};

	const CreateNewItem = () => {
		let new_id = crypto.randomUUID();
		let new_item: item = {
			item_id: new_id,
			product_desc: '',
			brand: '',
			model: '',
			remarks: '',
			quantity: 0,
			unit: '',
			unit_cost: 0,
			total_cost: 0,
			margin: 0,
			unit_price: 0,
			total_price: 0,
			sub_item: [],
		};

		QuotationData.data.item.push(new_item);
		setQuotationData(QuotationData);

		setCount(Count + 1); //force rerendering
	};

	const formik = useFormik({
		initialValues: {
			client: QuotationData.data.client,
			end_user: QuotationData.data.end_user,
			site_location: QuotationData.data.site_location,
			building: QuotationData.data.building,
			pic: QuotationData.data.pic,
			email: QuotationData.data.email,
			project_ref: QuotationData.data.project_ref,
		},
		validate,
		onSubmit: (values) => {
			console.log(values);
			alert(JSON.stringify(values, null, 2));
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
					<strong className='fs-5'>{QuotationData.mode} Quotation</strong>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				{/* <form className='form' id='quotationFormId' onSubmit={handleSubmit}> */}
				<form className='form' id='quotationFormId' onSubmit={formik.handleSubmit}>
					<Card>
						<CardHeader>
							<CardLabel>
								<CardTitle tag='div' className='h3'>
									{QuotationData.mode} Quotation
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
									<FormGroup id='site_location' label='Site Location' isFloating>
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
									hidden={isViewMode ? true : false}
									onClick={CreateNewItem}>
									Add Item
								</Button>
							</CardFooterRight>
						</CardFooter>
					</Card>
					{/* <FormikProvider value={formik}>
						<FieldArray
							name=''
							render={() =>
								QuotationData.data.item.map((item, idx) => (
									<SingleItem
										key={item.item_id}
										mode={QuotationData.mode}
										data={item}
										deletefunc={handleDelete}
										addItemfunc={handleAddItem}
									/>
								))
							}
						/>
					</FormikProvider> */}

					{QuotationData.data.item.map((item, idx) => (
						<SingleItem
							key={item.item_id}
							mode={QuotationData.mode}
							data={item}
							deletefunc={handleDelete}
							addItemfunc={handleAddItem}
						/>
					))}
					<Summary mode={QuotationData.mode} data={QuotationData.data.summary} />

					{/* <Card>
						<CardHeader>
							<CardLabel>
								<CardTitle tag='div' className='h3'>
									Summary
								</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='pb-0'>
							<div className='row g-4'>
								<div className='col-md-8'>
									<FormGroup
										id='reference_status'
										label='Reference Status'
										isFloating>
										<Input
											placeholder='reference_status'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.reference_status}
											isValid={formik.isValid}
											isTouched={formik.touched.reference_status}
											invalidFeedback={formik.errors.reference_status}
											validFeedback='Valid reference status'
											disabled={isViewMode ? true : false}
										/>
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='total' label='Total (RM)' isFloating>
										<Input
											type='number'
											step={2}
											placeholder='total'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.total}
											isValid={formik.isValid}
											isTouched={formik.touched.total}
											invalidFeedback={formik.errors.total}
											validFeedback='Valid total'
											disabled={isViewMode ? true : false}
										/>
									</FormGroup>
								</div>
								<div className='col-md-8'>
									<FormGroup id='note' label='Note' isFloating>
										<Input
											placeholder='note'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.note}
											isValid={formik.isValid}
											isTouched={formik.touched.note}
											invalidFeedback={formik.errors.note}
											validFeedback='Valid note'
											disabled={isViewMode ? true : false}
										/>
									</FormGroup>
								</div>
								<div className='col-md-4'>
									<FormGroup id='g_total' label='G/Total (RM)' isFloating>
										<Input
											type='number'
											step={0.1}
											placeholder='g_total'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.g_total}
											isValid={formik.isValid}
											isTouched={formik.touched.g_total}
											invalidFeedback={formik.errors.g_total}
											validFeedback='Valid G/total'
											disabled={isViewMode ? true : false}
										/>
									</FormGroup>
								</div>
							</div>
						</CardBody>
						<CardFooter>
							<CardFooterRight>
								<Button color='dark' icon='Edit' hidden={isViewMode ? true : false}>
									Draft
								</Button>
								<Button
									type='submit'
									color='success'
									icon='Save'
									isDisable={!formik.isValid && !!formik.submitCount}>
									Save
								</Button>
							</CardFooterRight>
						</CardFooter>
					</Card> */}
				</form>
			</Page>
		</PageWrapper>
	);
};

export default SingleQuotation;
