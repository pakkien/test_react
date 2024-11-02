import React, { useState } from 'react';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import { Form, useFormik } from 'formik';
import Button from '../../../../components/bootstrap/Button';
import { TModalFullScreen, TModalSize } from '../../../../type/modal-type';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';

// type AdditionalInfo = {
//     po_no: string;
//     po_date: string;
//     po_amount: string;
//     po_attach_file: string;
//     so_no: string;
//     so_attach_file: string;
//     invoice_no: string;
//     invoice_date: string;
//     payment_terms: string;
//     invoice_amount: string;
//     invoice_attach_file: string;
//     remarks: string;
//     status_overwrite: string;
// }

type AdditionalInfoFormProps = {
	state: boolean;
	id: string;
	formik: any;
};

const AdditionalInfoForm = (props: AdditionalInfoFormProps) => {
	const formik = props.formik;
	// const formik = useFormik({
	// 	initialValues: {
	// 		po_no: '',
	//         po_date: '',
	//         po_amount: '',
	//         po_attach_file: '',
	//         so_no: '',
	//         so_attach_file: '',
	//         invoice_no: '',
	//         invoice_date: '',
	//         payment_terms: '',
	//         invoice_amount: '',
	//         invoice_attach_file: '',
	//         remarks: '',
	//         status_overwrite: ''
	// 	},

	// 	//validate,
	// 	onSubmit: (values) => {
	// 		console.log(JSON.stringify(values));
	// 		//alert(JSON.stringify(values, null, 2));
	// 	},
	// });

	return (
		<div className='row g-4'>
			<div className='col-md-4'>
				<FormGroup id='po_no' label='PO No.' isFloating>
					<Input
						placeholder='po_no'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.po_no}
						isValid={formik.isValid}
						isTouched={formik.touched.po_no}
						invalidFeedback={formik.errors.po_no}
						validFeedback='Valid po_no'
					/>
				</FormGroup>
			</div>
			<div className='col-md-4'>
				<FormGroup id='po_amount' label='PO Amount' isFloating>
					<Input
						placeholder='po_amount'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.po_amount}
						isValid={formik.isValid}
						isTouched={formik.touched.po_amount}
						invalidFeedback={formik.errors.po_amount}
						validFeedback='Valid po_amount'
					/>
				</FormGroup>
			</div>
			<div className='col-md-4'>
				<FormGroup id='po_attach_file' label='po_attach_file' isFloating>
					<Input
						placeholder='po_attach_file'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.po_attach_file}
						isValid={formik.isValid}
						isTouched={formik.touched.po_attach_file}
						invalidFeedback={formik.errors.po_attach_file}
						validFeedback='Valid po_attach_file'
					/>
				</FormGroup>
			</div>
			<hr />
			<div className='col-md-4'>
				<FormGroup id='so_no' label='so_no' isFloating>
					<Input
						placeholder='so_no'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.so_no}
						isValid={formik.isValid}
						isTouched={formik.touched.so_no}
						invalidFeedback={formik.errors.so_no}
						validFeedback='Valid so_no'
					/>
				</FormGroup>
			</div>
			<div className='col-md-4'>
				<FormGroup id='so_attach_file' label='so_attach_file' isFloating>
					<Input
						placeholder='so_attach_file'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.so_attach_file}
						isValid={formik.isValid}
						isTouched={formik.touched.so_attach_file}
						invalidFeedback={formik.errors.so_attach_file}
						validFeedback='Valid so_attach_file'
					/>
				</FormGroup>
			</div>
			<hr />
			<div className='col-md-4'>
				<FormGroup id='invoice_no' label='invoice_no' isFloating>
					<Input
						placeholder='invoice_no'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.invoice_no}
						isValid={formik.isValid}
						isTouched={formik.touched.invoice_no}
						invalidFeedback={formik.errors.invoice_no}
						validFeedback='Valid invoice_no'
					/>
				</FormGroup>
			</div>
			<div className='col-md-4'>
				<FormGroup id='invoice_date' label='invoice_date' isFloating>
					<Input
						placeholder='invoice_date'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.invoice_date}
						isValid={formik.isValid}
						isTouched={formik.touched.invoice_date}
						invalidFeedback={formik.errors.invoice_date}
						validFeedback='Valid invoice_date'
					/>
				</FormGroup>
			</div>
			<div className='col-md-4'>
				<FormGroup id='payment_terms' label='payment_terms' isFloating>
					<Input
						placeholder='payment_terms'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.payment_terms}
						isValid={formik.isValid}
						isTouched={formik.touched.payment_terms}
						invalidFeedback={formik.errors.payment_terms}
						validFeedback='Valid payment_terms'
					/>
				</FormGroup>
			</div>


			<div className='col-md-4'>
				<FormGroup id='invoice_amount' label='invoice_amount' isFloating>
					<Input
						placeholder='invoice_amount'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.invoice_amount}
						isValid={formik.isValid}
						isTouched={formik.touched.invoice_amount}
						invalidFeedback={formik.errors.invoice_amount}
						validFeedback='Valid invoice_amount'
					/>
				</FormGroup>
			</div>
			<div className='col-md-4'>
				<FormGroup id='invoice_attach_file' label='invoice_attach_file' isFloating>
					<Input
						placeholder='invoice_attach_file'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.invoice_attach_file}
						isValid={formik.isValid}
						isTouched={formik.touched.invoice_attach_file}
						invalidFeedback={formik.errors.invoice_attach_file}
						validFeedback='Valid invoice_attach_file'
					/>
				</FormGroup>
			</div>
            <hr/>
			<div className='col-md-4'>
				<FormGroup id='remarks' label='remarks' isFloating>
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
			<div className='col-md-4'>
				<FormGroup id='status_overwrite' label='status_overwrite' isFloating>
					<Input
						placeholder='status_overwrite'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.status_overwrite}
						isValid={formik.isValid}
						isTouched={formik.touched.status_overwrite}
						invalidFeedback={formik.errors.status_overwrite}
						validFeedback='Valid status_overwrite'
					/>
				</FormGroup>
			</div>
		</div>
	);
};

export default AdditionalInfoForm;
