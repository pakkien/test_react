import React from 'react';
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
import validate from '../../../helper/EditItemValidate';
import { useFormik } from 'formik';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';

type SubItemProps = {
	mode: string;
	data: sub_item;
	deleteSubItemfunc: (sub_item: sub_item) => void;
};

type sub_item = {
	sub_item_id: string;
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

const SingleSubItem = (SubItemProps: SubItemProps) => {
	const isViewMode = SubItemProps.mode.toLowerCase() === 'view' ? true : false;

	const formik = useFormik({
		initialValues: {
			product_desc: SubItemProps.data.product_desc,
			brand: SubItemProps.data.brand,
			model: SubItemProps.data.model,
			remarks: SubItemProps.data.remarks,
			quantity: SubItemProps.data.quantity,
			unit: SubItemProps.data.unit,
			unit_cost: SubItemProps.data.unit_cost,
			total_cost: SubItemProps.data.total_cost,
			margin: SubItemProps.data.margin,
			unit_price: SubItemProps.data.unit_price,
			total_price: SubItemProps.data.total_price,
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

	const handleButtonClick_deleteItem = (sub_item: sub_item) => {
		SubItemProps.deleteSubItemfunc(sub_item);
	};

	return (
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h3'>
						Add Sub-Item Details
					</CardTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='danger'
						icon='Delete'
						tag='a'
						hidden={isViewMode ? true : false}
						onClick={() => {
							handleButtonClick_deleteItem(SubItemProps.data);
						}}>
						Delete Sub-Item
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody>
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
				</div>
			</CardBody>
			<CardFooter>
				<></>
			</CardFooter>
		</Card>
	);
};

export default SingleSubItem;
