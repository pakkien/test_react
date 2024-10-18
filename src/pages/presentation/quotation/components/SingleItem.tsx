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
	deleteItemfunc: (item: item) => void;
	addItemfunc: () => void;
	editItemfunc: (item: item) => void;

	deleteSubItemfunc: (sub_item: sub_item) => void;
	addSubItemfunc: (item_id: string) => void;
	editSubItemfunc: (sub_item: sub_item) => void;
	//formik: formik
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

const SingleItem = (ItemProps: ItemProps) => {
	const [mode, setMode] = useState(ItemProps.mode.toLowerCase());

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
		onSubmit: (values) => {
			//console.log(JSON.stringify(QuotationData));
			// alert(JSON.stringify(values, null, 2));
			// setMode('edit');
		},
	});

	const handleButtonClick_deleteItem = (_item: item) => {
		ItemProps.deleteItemfunc(_item);
	};

	const handleButtonClick_editItem = (_item: item) => {
		ItemProps.editItemfunc(_item);
	};

	const handleDeleteSubItem = (_sub_item: sub_item) => {
		ItemData.data.sub_item = ItemData.data.sub_item.filter(
			(sub_item) => sub_item.sub_item_id != _sub_item.sub_item_id,
		);
		ItemProps.deleteSubItemfunc(_sub_item);
		setCount(Count + 1); //force rerendering
	};

	const handleEditSubItem = (_sub_item: sub_item) => {
		//show dialog
		ItemProps.editSubItemfunc(_sub_item);
	};

	const handleButtonClick_addItem = () => {
		ItemProps.addItemfunc();
	};

	const handleButtonClick_addSubItem = (item_id: string) => {
		//CreateNewSubItem();
		//show dialog
		ItemProps.addSubItemfunc(item_id);
	};

	const CreateNewSubItem = () => {
		let new_id = crypto.randomUUID();
		let new_sub_item: sub_item = {
			sub_item_id: new_id,
			item_id: ItemProps.data.item_id,
			product_desc: '',
			brand: '',
			model: '',
			remarks: '',
			quantity: '',
			unit: '',
			unit_cost: '',
			total_cost: '',
			margin: '',
			unit_price: '',
			total_price: '',
		};

		ItemData.data.sub_item.push(new_sub_item);
		setItemData(ItemData);
		setCount(Count + 1);
	};

	return (
		<Card id={'#item_card_id#' + ItemProps.data.item_id} onSubmit={formik.handleSubmit}>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h3'>
						Item Details &nbsp;&nbsp;
						<Button
							color='info'
							icon='Edit'
							hidden={mode == 'view' ? true : false}
							onClick={() => {
								handleButtonClick_editItem(ItemProps.data);
							}}>
							Edit
						</Button>
					</CardTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='danger'
						icon='Delete'
						tag='a'
						hidden={mode == 'view' ? true : false}
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
								disabled
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
								disabled
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
								disabled
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
								disabled
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
										disabled
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
										disabled
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
										disabled
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
								disabled
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
								disabled
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
								disabled
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
								disabled
							/>
						</FormGroup>
					</div>
					<div className='col-md-12'>
						{ItemProps.data.sub_item.length > 0 && (
							<Accordion
								id='accSample'
								activeItemId={ItemProps.data.item_id}
								color='dark'>
								<AccordionItem id={ItemProps.data.item_id} title='Sub Item'>
									{ItemProps.data.sub_item.map((sub_item) => (
										<SingleSubItem
											key={sub_item.sub_item_id}
											mode={ItemProps.mode}
											data={sub_item}
											deleteSubItemfunc={handleDeleteSubItem}
											editSubItemfunc={handleEditSubItem}
										/>
									))}
								</AccordionItem>
							</Accordion>
						)}
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
						hidden={mode == 'view' ? true : false}
						onClick={() => {
							handleButtonClick_addItem();
						}}>
						Add Item
					</Button>
					<Button
						color='info'
						icon='Add'
						tag='a'
						hidden={mode == 'view' ? true : false}
						onClick={() => {
							handleButtonClick_addSubItem(ItemProps.data.item_id);
						}}>
						Add Sub-Item
					</Button>
				</CardFooterRight>
			</CardFooter>
		</Card>
	);
};

export default SingleItem;
