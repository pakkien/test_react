import React, { EventHandler } from 'react';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
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
import Button from '../../../../components/bootstrap/Button';
import Icon from '../../../../components/icon/Icon';
import validate from '../../../helper/EditSummary';
import { useFormik } from 'formik';
import showNotification from '../../../../components/extras/showNotification';

type SummaryProps = {
	mode: string;
	data: summary;
};

type summary = {
	reference_status: string;
	note: string;
	total: string;
	g_total: string;
};

const Summary = (SummaryProps: SummaryProps) => {
	const isViewMode = SummaryProps.mode.toLowerCase() === 'view' ? true : false;

	const formik = useFormik({
		initialValues: {
			reference_status: SummaryProps.data.reference_status,
			note: SummaryProps.data.note,
			total: SummaryProps.data.total,
			g_total: SummaryProps.data.g_total,
		},
		validate,
		onSubmit: () => {},
	});

	return (
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
						<FormGroup id='reference_status' label='Reference Status' isFloating>
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
	);
};

export default Summary;
