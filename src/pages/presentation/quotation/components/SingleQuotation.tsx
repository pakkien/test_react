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
//import validate2 from '../../../helper/EditItemValidate';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import Item from '../../../../layout/Navigation/Item';
import { setTimeout } from 'timers/promises';
import ScrollspyNav from '../../../../components/bootstrap/ScrollspyNav';
import { OnValueChange } from 'react-number-format';
import SingleItemEditForm from './SingleItemEditForm';

import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import { TModalFullScreen, TModalSize } from '../../../../type/modal-type';
import SingleSubItemEditForm from './SingleSubItemEditForm';

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
	quantity: string;
	unit: string;
	unit_cost: string;
	total_cost: string;
	margin: string;
	unit_price: string;
	total_price: string;
	sub_item: sub_item[];
};

type sub_item = {
	sub_item_id: string;
	item_id: string;
	product_desc: string;
	brand: string;
	model: string;
	remarks: string;
	quantity: string;
	unit: string;
	unit_cost: string;
	total_cost: string;
	margin: string;
	unit_price: string;
	total_price: string;
};

type summary = {
	reference_status: string;
	note: string;
	total: string;
	g_total: string;
};

type ItemFormProps = {
	mode: string;
	data: item;
};

type SubItemFormProps = {
	mode: string;
	data: sub_item;
};

const SingleQuotation = (QuotationProps: QuotationProps) => {
	const navigate = useNavigate();
	const title = QuotationProps.mode + ' Quotation';
	const isViewMode = QuotationProps.mode.toLowerCase() === 'view' ? true : false;

	//#region modal
	//modal item
	const [state, setState] = useState(false);

	//modal sub item
	const [state2, setState2] = useState(false);

	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(true);
	const [sizeStatus, setSizeStatus] = useState<TModalSize>(null);
	const [fullScreenStatus, setFullScreenStatus] = useState<TModalFullScreen | undefined>(
		undefined,
	);
	const [animationStatus, setAnimationStatus] = useState(true);
	const [longContentStatus, setLongContentStatus] = useState(false);
	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);

	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(true);
		setSizeStatus('xl');
		setFullScreenStatus(undefined);
		setAnimationStatus(true);
		setLongContentStatus(false);
		setHeaderCloseStatus(true);
	};

	//#endregion modal

	const getNewItem = () => {
		let new_id = crypto.randomUUID();
		let new_item: item = {
			item_id: new_id,
			product_desc: '',
			brand: '',
			model: '',
			remarks: '',
			quantity: '0',
			unit: '',
			unit_cost: '0',
			total_cost: '0',
			margin: '0',
			unit_price: '0',
			total_price: '0',
			sub_item: [],
		};
		return new_item;
	};

	const itemEditDataProps: ItemFormProps = {
		mode: 'Create',
		data: getNewItem(),
	};

	const [itemEditData, setItemEditData] = useState(itemEditDataProps);

	const getNewSubItem = (item_id: string) => {
		let new_id = crypto.randomUUID();
		let new_sub_item: sub_item = {
			sub_item_id: new_id,
			item_id: item_id,
			product_desc: '',
			brand: '',
			model: '',
			remarks: '',
			quantity: '0',
			unit: '',
			unit_cost: '0',
			total_cost: '0',
			margin: '0',
			unit_price: '0',
			total_price: '0',
		};
		return new_sub_item;
	};

	const subItemEditDataProps: SubItemFormProps = {
		mode: 'Create',
		data: getNewSubItem(''),
	};

	const [subItemEditData, setSubItemEditData] = useState(subItemEditDataProps);

	const [QuotationData, setQuotationData] = useState(QuotationProps);

	const [Count, setCount] = useState(0);

	const handleDeleteItem = (_item: item) => {
		QuotationData.data.item = QuotationData.data.item.filter(
			(item) => item.item_id != _item.item_id,
		);
		setCount(Count + 1); //force rerendering
	};

	const handleEditItem = (_item: item) => {
		//console.log(_item);
		//show dialog for edit item
		itemEditData.mode = 'Edit';
		itemEditData.data = _item;
		//console.log('itemEditData:' + JSON.stringify(itemEditData));
		setItemEditData(itemEditData);
		setState(true);
		initialStatus();
	};

	const updateEditedItem = (_item: item) => {
		let itemIndex = QuotationData.data.item.findIndex((i) => i.item_id == _item.item_id);
		QuotationData.data.item[itemIndex] = _item;
		setCount(Count + 1); //force rerendering
	};

	const handleAddItem = () => {
		itemEditData.mode = 'Create';
		itemEditData.data = CreateNewItem();
		//console.log('itemEditData:' + JSON.stringify(itemEditData));
		setItemEditData(itemEditData);
		setState(true);
		initialStatus();
	};

	const updateAddedItem = (_item: item) => {
		QuotationData.data.item.push(_item);
		setQuotationData(QuotationData);
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
			quantity: '0',
			unit: '',
			unit_cost: '0',
			total_cost: '0',
			margin: '0',
			unit_price: '0',
			total_price: '0',
			sub_item: [],
		};
		return new_item;
	};

	const CreateNewSubItem = (item_id: string) => {
		let new_id = crypto.randomUUID();
		let new_item: sub_item = {
			sub_item_id: new_id,
			item_id: item_id,
			product_desc: '',
			brand: '',
			model: '',
			remarks: '',
			quantity: '0',
			unit: '',
			unit_cost: '0',
			total_cost: '0',
			margin: '0',
			unit_price: '0',
			total_price: '0',
		};
		return new_item;
	};

	const handleDeleteSubItem = (_sub_item: sub_item) => {
		let itemIndex = QuotationData.data.item.findIndex((i) => i.item_id == _sub_item.item_id);
		QuotationData.data.item[itemIndex].sub_item = QuotationData.data.item[
			itemIndex
		].sub_item.filter((x) => x.sub_item_id != _sub_item.sub_item_id);
		setCount(Count + 1); //force rerendering
	};

	const handleEditSubItem = (_sub_item: sub_item) => {
		//show dialog for edit sub item
		subItemEditData.mode = 'Edit';
		subItemEditData.data = _sub_item;
		//console.log('itemEditData:' + JSON.stringify(itemEditData));
		setSubItemEditData(subItemEditData);
		setState2(true);
		initialStatus();
	};

	const handleAddSubItem = (item_id: string) => {
		subItemEditData.mode = 'Create';
		subItemEditData.data = CreateNewSubItem(item_id);
		//console.log('itemEditData:' + JSON.stringify(itemEditData));
		setSubItemEditData(subItemEditData);
		setState2(true);
		initialStatus();
	};

	const updateAddedSubItem = (_sub_item: sub_item) => {
		// data from form

		let itemIndex = QuotationData.data.item.findIndex((i) => i.item_id == _sub_item.item_id);
		QuotationData.data.item[itemIndex].sub_item.push(_sub_item);
	};

	const updateEditedSubItem = (_sub_item: sub_item) => {
		//data from form
		let itemIndex = QuotationData.data.item.findIndex((i) => i.item_id == _sub_item.item_id);
		let subItemIndex = QuotationData.data.item[itemIndex].sub_item.findIndex(
			(i) => i.sub_item_id == _sub_item.sub_item_id,
		);
		QuotationData.data.item[itemIndex].sub_item[subItemIndex] = _sub_item;
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

			reference_status: QuotationData.data.summary.reference_status,
			note: QuotationData.data.summary.note,
			total: QuotationData.data.summary.total,
			g_total: QuotationData.data.summary.g_total,
		},
		validate,
		onSubmit: (values) => {
			//console.log(JSON.stringify(QuotationData));
			//alert(JSON.stringify(values, null, 2));

			//console.log(values);
			const test = Object.assign({ quotation_id: QuotationData.data.quotation_id }, values, {
				item: QuotationData.data.item,
			});
			console.log(JSON.stringify(test));
			alert(JSON.stringify(test));
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
				<p>{JSON.stringify(QuotationData)}</p>
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
									onClick={handleAddItem}>
									Add Item
								</Button>
							</CardFooterRight>
						</CardFooter>
					</Card>
					{QuotationData.data.item.map((item, idx) => (
						<SingleItem
							key={idx + crypto.randomUUID()}
							mode={QuotationData.mode}
							data={item}
							deleteItemfunc={handleDeleteItem}
							addItemfunc={handleAddItem}
							editItemfunc={handleEditItem}
							addSubItemfunc={handleAddSubItem}
							editSubItemfunc={handleEditSubItem}
							deleteSubItemfunc={handleDeleteSubItem}
						/>
					))}
					<Card>
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
					</Card>
				</form>

				{/* modal form item */}

				<form>
					<Modal
						isOpen={state}
						setIsOpen={setState}
						titleId='itemEditModal'
						isStaticBackdrop={staticBackdropStatus}
						isScrollable={scrollableStatus}
						isCentered={centeredStatus}
						size={sizeStatus}
						fullScreen={fullScreenStatus}
						isAnimation={animationStatus}>
						<ModalHeader setIsOpen={headerCloseStatus ? setState : undefined}>
							<ModalTitle id='itemEditModalId'>
								{itemEditData.mode.toLowerCase() == 'edit'
									? 'Edit item'
									: 'Add item'}
							</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<SingleItemEditForm
								mode={itemEditData.mode}
								data={itemEditData.data}
								editItemfunc={updateEditedItem}
								createItemfunc={updateAddedItem}
								setState={setState}
							/>
						</ModalBody>
					</Modal>
				</form>

				{/* modal form sub item */}
				<form>
					<Modal
						isOpen={state2}
						setIsOpen={setState2}
						titleId='subItemEditModal'
						isStaticBackdrop={staticBackdropStatus}
						isScrollable={scrollableStatus}
						isCentered={centeredStatus}
						size={sizeStatus}
						fullScreen={fullScreenStatus}
						isAnimation={animationStatus}>
						<ModalHeader setIsOpen={headerCloseStatus ? setState2 : undefined}>
							<ModalTitle id='subItemEditModalId'>
								{subItemEditData.mode.toLowerCase() == 'edit'
									? 'Edit Sub item'
									: 'Add Sub item'}
							</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<SingleSubItemEditForm
								mode={subItemEditData.mode}
								data={subItemEditData.data}
								editSubItemfunc={updateEditedSubItem}
								createSubItemfunc={updateAddedSubItem}
								setState={setState2}
							/>
						</ModalBody>
					</Modal>
				</form>
			</Page>
		</PageWrapper>
	);
};

export default SingleQuotation;
