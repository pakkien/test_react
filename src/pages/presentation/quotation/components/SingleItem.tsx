import { type } from 'os';
import React, { useState } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import SingleSubItem from './SingleSubItem';
import { useFormik } from 'formik';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import validate from '../../../helper/EditItemValidate';
import Accordion, { AccordionItem } from '../../../../components/bootstrap/Accordion';

type ItemProps = {
	mode: string;
	data: item;
	deletefunc: (item: item) => void;
	addItemfunc: () => void;
	// addSubItemfunc: (item: item) => void;
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

const SingleItem = (ItemProps: ItemProps) => {
	const isViewMode = ItemProps.mode.toLowerCase() === 'view' ? true : false;

	const [ItemData, setItemData] = useState(ItemProps);
	const [Count, setCount] = useState(0);

	const formik = useFormik({
		initialValues: {
			product_desc: ItemProps.data.product_desc,
			brand: ItemProps.data.brand,
			model: ItemProps.data.model,
			remarks: ItemProps.data.remarks,
			quantity: ItemProps.data.quantity,
			unit: ItemProps.data.unit,
			unit_cost: ItemProps.data.unit_cost,
			total_cost: ItemProps.data.total_cost,
			margin: ItemProps.data.margin,
			unit_price: ItemProps.data.unit_price,
			total_price: ItemProps.data.total_price,
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

	const handleButtonClick_deleteItem = (item: item) => {
		ItemProps.deletefunc(item);
	};

	const handleDeleteSubItem = (_sub_item: sub_item) => {
		ItemData.data.sub_item = ItemData.data.sub_item.filter(
			(sub_item) => sub_item.sub_item_id != _sub_item.sub_item_id,
		);
		setCount(Count + 1); //force rerendering
	};

	const handleButtonClick_addItem = () => {
		ItemProps.addItemfunc();
	};

	const handleButtonClick_addSubItem = () => {
		CreateNewSubItem();
	};

	const CreateNewSubItem = () => {
		let new_id = crypto.randomUUID();
		let new_sub_item: sub_item = {
			sub_item_id: new_id,
			product_desc: new_id,
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
		};

		ItemData.data.sub_item.push(new_sub_item);
		setItemData(ItemData);
		setCount(Count + 1);
	};

	return (
		<Card tag='form' id={'#item_card_id#' + ItemProps.data.item_id}>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h3'>
						Add Item Details
					</CardTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='danger'
						icon='Delete'
						tag='a'
						hidden={isViewMode ? true : false}
						onClick={() => {
							handleButtonClick_deleteItem(ItemProps.data);
						}}>
						Delete Item
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody className='pb-0'>
				<div className='row g-4'>
					<div className='col-md-12'>
						<FormGroup
							id='product_desc'
							label='Product Description | Job Scope'
							isFloating>
							<Input
								placeholder='product_desc'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.product_desc}
								isValid={formik.isValid}
								isTouched={formik.touched.product_desc}
								invalidFeedback={formik.errors.product_desc}
								validFeedback='Valid product description'
								disabled={isViewMode ? true : false}
							/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='brand' label='Brand' isFloating>
							<Input
								placeholder='brand'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.brand}
								isValid={formik.isValid}
								isTouched={formik.touched.brand}
								invalidFeedback={formik.errors.brand}
								validFeedback='Valid brand'
								disabled={isViewMode ? true : false}
							/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='model' label='Model' isFloating>
							<Input
								placeholder='model'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.model}
								isValid={formik.isValid}
								isTouched={formik.touched.model}
								invalidFeedback={formik.errors.model}
								validFeedback='Valid model'
								disabled={isViewMode ? true : false}
							/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='remarks' label='Remarks' isFloating>
							<Input
								placeholder='remarks'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.remarks}
								isValid={formik.isValid}
								isTouched={formik.touched.remarks}
								invalidFeedback={formik.errors.remarks}
								validFeedback='Valid remarks'
								disabled={isViewMode ? true : false}
							/>
						</FormGroup>
					</div>
					<div className='col-md-8'>
						<div className='row'>
							<div className='col-4'>
								<FormGroup id='quantity' label='Quantity' isFloating>
									<Input
										placeholder='quantity'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.quantity}
										isValid={formik.isValid}
										isTouched={formik.touched.quantity}
										invalidFeedback={formik.errors.quantity}
										validFeedback='Valid quantity'
										disabled={isViewMode ? true : false}
									/>
								</FormGroup>
							</div>
							<div className='col-4'>
								<FormGroup id='unit' label='Unit' isFloating>
									<Input
										placeholder='unit'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.unit}
										isValid={formik.isValid}
										isTouched={formik.touched.unit}
										invalidFeedback={formik.errors.unit}
										validFeedback='Valid unit'
										disabled={isViewMode ? true : false}
									/>
								</FormGroup>
							</div>
							<div className='col-4'>
								<FormGroup id='unit_cost' label='Unit Cost' isFloating>
									<Input
										placeholder='unit_cost'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.unit_cost}
										isValid={formik.isValid}
										isTouched={formik.touched.unit_cost}
										invalidFeedback={formik.errors.unit_cost}
										validFeedback='Valid unit_cost'
										disabled={isViewMode ? true : false}
									/>
								</FormGroup>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<FormGroup id='total_cost' label='Total Cost' isFloating>
							<Input
								placeholder='unit_cost'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.total_cost}
								isValid={formik.isValid}
								isTouched={formik.touched.total_cost}
								invalidFeedback={formik.errors.total_cost}
								validFeedback='Valid total_cost'
								disabled={isViewMode ? true : false}
							/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='margin' label='Margin' isFloating>
							<Input
								placeholder='margin'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.margin}
								isValid={formik.isValid}
								isTouched={formik.touched.margin}
								invalidFeedback={formik.errors.margin}
								validFeedback='Valid margin'
								disabled={isViewMode ? true : false}
							/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='unit_price' label='Unit Price (RM)' isFloating>
							<Input
								placeholder='unit_price'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.unit_price}
								isValid={formik.isValid}
								isTouched={formik.touched.unit_price}
								invalidFeedback={formik.errors.unit_price}
								validFeedback='Valid unit_price'
								disabled={isViewMode ? true : false}
							/>
						</FormGroup>
					</div>
					<div className='col-md-4'>
						<FormGroup id='total_price' label='Total Price (RM)' isFloating>
							<Input
								placeholder='total_price'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.total_price}
								isValid={formik.isValid}
								isTouched={formik.touched.total_price}
								invalidFeedback={formik.errors.total_price}
								validFeedback='Valid total_price'
								disabled={isViewMode ? true : false}
							/>
						</FormGroup>
					</div>
					<div className='col-md-12'>
						<Accordion
							id='accSample'
							activeItemId={ItemProps.data.item_id}
							color='dark'>
							<AccordionItem id={ItemProps.data.item_id} title='Sub Item'>
								{/* <SubItemSection
									mode={ItemProps.mode}
									data={ItemProps.data.sub_item}
								/> */}
								{ItemProps.data.sub_item.map((sub_item) => (
									<SingleSubItem
										key={sub_item.sub_item_id}
										mode={ItemProps.mode}
										data={sub_item}
										deleteSubItemfunc={handleDeleteSubItem}
									/>
								))}
							</AccordionItem>
						</Accordion>
					</div>
					<div className='col-md-12'></div>
				</div>
			</CardBody>
			<CardFooter>
				<CardFooterRight>
					<Button
						color='info'
						icon='Add'
						tag='a'
						hidden={isViewMode ? true : false}
						onClick={() => {
							handleButtonClick_addItem();
						}}>
						Add Item
					</Button>
					<Button
						color='info'
						icon='Delete'
						tag='a'
						hidden={isViewMode ? true : false}
						onClick={() => {
							handleButtonClick_addSubItem();
						}}>
						Add Sub-Item
					</Button>
				</CardFooterRight>
			</CardFooter>
		</Card>
	);
};

export default SingleItem;
