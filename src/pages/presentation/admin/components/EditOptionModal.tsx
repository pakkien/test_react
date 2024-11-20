import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from '../../../../components/bootstrap/Button';
import Modal, {
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from '../../../../components/bootstrap/Modal';
import { TModalSize, TModalFullScreen } from '../../../../type/modal-type';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Select from '../../../../components/bootstrap/forms/Select';
import Input from '../../../../components/bootstrap/forms/Input';
import axios from 'axios';

import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';

type EditQuotationProps = {
	option_id: number
	option_name: string;
	option_value: string;
	stateEditModal: boolean;
	setStateEditModal: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit_EditOption: (option_id: number, option_name: string, option_value:string) => void;
};

const EditOptionModal = (props: EditQuotationProps) => {
	//modal

	const formikEditOption = useFormik({
		initialValues: {
			//option_name_dropdown: props.,
			option_name: props.option_name,
			option_value: props.option_value,
		},
		validate: (values) => {
			const errors: {
				option_name?: string;
				option_value?: string;
			} = {};
			if (!values.option_name) {
				errors.option_name = 'Required';
			}

			if (!values.option_value) {
				errors.option_value = 'Required';
			}

			return errors;
		},
		onSubmit: async (values) => {
			// const option_name = values.option_name_dropdown
			// 	? values.option_name_dropdown
			// 	: values.option_name;
			//await handleSubmitAddOption(option_name, values.option_value);
			await props.handleSubmit_EditOption(props.option_id, values.option_name, values.option_value);
		},
	});


	// const handleSubmit = async (option_id: number, option_name: string, option_value:string) => {
	// 	const config = {
	// 		headers: { Authorization: `${localStorage.getItem('bts_token')}` },
	// 	};

	// 	const payload = {
	// 		option_name: option_name,
	// 		option_value: option_value
	// 	};

	// 	axios
	// 		.put(`http://127.0.0.1:5000/option/${option_id}`, payload, config)
	// 		.then((response) => {
	// 			showNotification(
	// 				<span className='d-flex align-items-center'>
	// 					<Icon icon='Info' size='lg' className='me-1' />
	// 					<span>Option Deleted</span>
	// 				</span>,
	// 				'Option updated successfully',
	// 			);
	// 			//alert('done');

	// 		})
	// 		.catch((errors) => 
	// 			showNotification(
	// 				<span className='d-flex align-items-center'>
	// 					<Icon icon='Info' size='lg' className='me-1' />
	// 					<span>Error update option</span>
	// 				</span>,
	// 				errors,
	// 			)
	// 		)
	// }

	return (
		
		<>
			<Modal
				isOpen={props.stateEditModal}
				setIsOpen={props.setStateEditModal}
				titleId='EditOptionModal'
				isStaticBackdrop={false}
				isScrollable={false}
				isCentered={false}
				size={null}
				fullScreen={false}
				isAnimation={true}>
				<ModalHeader setIsOpen={true ? props.setStateEditModal : undefined}>
					<ModalTitle id='EditOptionModalTitleId'>Edit Option</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='pb-0'>
						<div className='row g-4'>
							<div className='col-md-6'>
								<FormGroup id='option_name' label='Option Name' isFloating>
									<Input
										placeholder='Option Name'
										//autoComplete='additional-name'
										onChange={formikEditOption.handleChange}
										onBlur={formikEditOption.handleBlur}
										value={formikEditOption.values.option_name}
										isValid={formikEditOption.isValid}
										isTouched={formikEditOption.touched.option_name}
										invalidFeedback={formikEditOption.errors.option_name}
										validFeedback='Valid Option Name'
									/>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup id='option_value' label='Option Value' isFloating>
									<Input
										placeholder='Option Value'
										//autoComplete='additional-name'
										onChange={formikEditOption.handleChange}
										onBlur={formikEditOption.handleBlur}
										value={formikEditOption.values.option_value}
										isValid={formikEditOption.isValid}
										isTouched={formikEditOption.touched.option_value}
										invalidFeedback={formikEditOption.errors.option_value}
										validFeedback='Valid Option Value'
									/>
								</FormGroup>
							</div>
							<div className='col-md-12'></div>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
				<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => props.setStateEditModal(false)}>
						Cancel
					</Button>
					<Button
						color='success'
						icon='Save'
						onClick={() => {
							props.setStateEditModal(false);
							formikEditOption.submitForm();
						}}>
						Save
					</Button>
					
				</ModalFooter>
			</Modal>
		</>
	);
};

export default EditOptionModal;
