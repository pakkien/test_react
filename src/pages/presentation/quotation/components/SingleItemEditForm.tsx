import React, { useState } from 'react';
import Modal, {
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from '../../../../components/bootstrap/Modal';
import Button from '../../../../components/bootstrap/Button';
import { TModalSize, TModalFullScreen } from '../../../../type/modal-type';
import { json } from 'stream/consumers';
import SingleItem from './SingleItem';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import validate from '../../../helper/EditItemValidate';
import QuotationDataType from '../../../dataTypes/QuotationDataType';

type ItemFormProps = {
	mode: string;
	data: QuotationDataType.Item;
	editItemfunc: (item: QuotationDataType.Item) => void;
	createItemfunc: (item: QuotationDataType.Item) => void;
	setState: (state: boolean) => void;
};


const SingleItemEditForm = (itemFormProps: ItemFormProps) => {
	const formik = useFormik({
		initialValues: {
			product_desc: itemFormProps.data.product_desc,
			brand: itemFormProps.data.brand,
			model: itemFormProps.data.model,
			remarks: itemFormProps.data.remarks,
			quantity: itemFormProps.data.quantity,
			unit: itemFormProps.data.unit,
			unit_cost: itemFormProps.data.unit_cost,
			total_cost: itemFormProps.data.total_cost,
			margin: itemFormProps.data.margin,
			unit_price: itemFormProps.data.unit_price,
			total_price: itemFormProps.data.total_price,
		},

		validate,
		onSubmit: (values) => {
			//console.log(JSON.stringify(QuotationData));
			//alert(JSON.stringify(values, null, 2));

			let new_item: QuotationDataType.Item = {
				item_id: itemFormProps.data.item_id, //remain
				quotation_rev_id: itemFormProps.data.quotation_rev_id, //remain
				product_desc: values.product_desc,
				brand: values.brand,
				model: values.model,
				remarks: values.remarks,
				quantity: values.quantity,
				unit: values.unit,
				unit_cost: values.unit_cost,
				total_cost: values.total_cost,
				margin: values.margin,
				unit_price: values.unit_price,
				total_price: values.total_price,
				sub_item: itemFormProps.data.sub_item, //remain
			};

			if (itemFormProps.mode.toLowerCase() == 'edit') {
				itemFormProps.editItemfunc(new_item);
			} else if (itemFormProps.mode.toLowerCase() == 'create') {
				itemFormProps.createItemfunc(new_item);
			}
			itemFormProps.setState(false);
			//setMode('edit');
		},
	});

	return (
		<div className='row g-4'>
			<div className='col-md-12'>
				<FormGroup id='product_desc' label='Product Description | Job Scope' isFloating>
					<Input
						placeholder='product_desc'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.product_desc}
						isValid={formik.isValid}
						isTouched={formik.touched.product_desc}
						invalidFeedback={formik.errors.product_desc}
						validFeedback='Valid product description'
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
					/>
				</FormGroup>
			</div>
			<ModalFooter>
				<Button
					color='info'
					icon={itemFormProps.mode.toLowerCase() == 'create' ? 'Add' : 'Save'}
					onClick={formik.handleSubmit}>
					{itemFormProps.mode.toLowerCase() == 'create' ? 'Add Item' : 'Save Item'}
				</Button>
			</ModalFooter>
		</div>
	);
};

export default SingleItemEditForm;