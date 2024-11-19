import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import useSortableData from '../../../../hooks/useSortableData';
import { TModalSize, TModalFullScreen } from '../../../../type/modal-type';
import Button from '../../../../components/bootstrap/Button';
import Alert from '../../../../components/bootstrap/Alert';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Modal, {
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from '../../../../components/bootstrap/Modal';
import { debounce } from '../../../../helpers/helpers';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Input from '../../../../components/bootstrap/forms/Input';
import Icon from '../../../../components/icon/Icon';
import showNotification from '../../../../components/extras/showNotification';
import axios from 'axios';

//datetime
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import Select from '../../../../components/bootstrap/forms/Select';
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

// const optionData = [
//   {
//     "created_at": "Mon, 18 Nov 2024 04:27:01 GMT",
//     "created_by": "tester1",
//     "option_id": 2,
//     "option_name": "optionName",
//     "option_value": "123",
//     "updated_at": "Mon, 18 Nov 2024 04:27:01 GMT",
//     "updated_by": "tester1"
//   },
//   {
//     "created_at": "Mon, 18 Nov 2024 04:27:05 GMT",
//     "created_by": "tester1",
//     "option_id": 3,
//     "option_name": "optionName2",
//     "option_value": "123",
//     "updated_at": "Mon, 18 Nov 2024 04:27:05 GMT",
//     "updated_by": "tester1"
//   },
//   {
//     "created_at": "Mon, 18 Nov 2024 04:27:07 GMT",
//     "created_by": "tester1",
//     "option_id": 4,
//     "option_name": "optionName3",
//     "option_value": "123",
//     "updated_at": "Mon, 18 Nov 2024 04:27:07 GMT",
//     "updated_by": "tester1"
//   }
// ]

type OptionDataType = {
	created_at: string;
	created_by: string;
	option_id: number;
	option_name: string;
	option_value: string;
	updated_at: string;
	update_by: string;
};

const ManageOption = () => {
	const [optionData, setOptionData] = useState<OptionDataType[]>([]);
	const [tableData, setTableData] = useState(optionData);

	const fetchData = async () => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		axios.get('http://127.0.0.1:5000/option/', config).then((response) => {
			setOptionData(response.data.options);
			setTableData(response.data.options);
			//console.log(response.data.options);
		});
	};

	//Get Quotation table data
	useEffect(() => {
		fetchData();
	}, []);

	//search

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { items, requestSort, getClassNamesFor } = useSortableData(tableData);

	const onFormSubmit = (values: { search: any; option_name: any }) => {
		const searchValue = values.search.toString().toLowerCase();
		const optionNameValue = values.option_name.toString().toLowerCase();
		const newData = searchAndFilterData(searchValue, optionNameValue);

		if (!values.search && !values.option_name) {
			setTableData(optionData);
		} else {
			setTableData(newData);
		}
	};

	const formik = useFormik({
		initialValues: {
			search: '',
			option_name: '',
		},
		onSubmit: onFormSubmit,
		onReset: () => setTableData(optionData),
	});

	const searchAndFilterData = (search_string: string, option_name: string) => {
		let tempData = optionData;
		//console.log("optionName: " + option_name);

		if (option_name) {
			tempData = optionData.filter((item) => item.option_name.toLowerCase() === option_name);
		}

		return tempData.filter((item: any) => {
			return (
				item.option_name.toLowerCase().includes(search_string) ||
				item.option_value.toLowerCase().includes(search_string) ||
				dayjs(`${item.created_at}`).format('DD-MM-YYYY').includes(search_string) ||
				item.created_by.toLowerCase().includes(search_string) ||
				dayjs(`${item.updated_at}`).format('DD-MM-YYYY').includes(search_string) ||
				item.updated_by.toLowerCase().includes(search_string)
			);
		});
	};

	//delete
	const [optionToDelete, setOptionToDelete] = useState({
		option_id: '',
		option_name: '',
		option_value: '',
	});
	const [state, setState] = useState(false);
	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
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
		setCenteredStatus(false);
		setSizeStatus(null);
		setFullScreenStatus(false);
		setAnimationStatus(true);
		setLongContentStatus(false);
		setHeaderCloseStatus(true);
	};

	//const [isAlertVisible, setIsAlertVisible] = useState(false);

	const handleDelete = (id: string) => {
		//handleRemove(id);
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		axios
			.delete(`http://127.0.0.1:5000/option/${id}`, config)
			.then((response) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Option Deleted</span>
					</span>,
					'Option deleted successfully',
				);

				setIsCreateMode(false);
				fetchData();
			})
			.catch((errors) => console.log(errors));
	};

	//Create option
	const [isCreateMode, setIsCreateMode] = useState(false);

	const handleSubmitAddOption = async (option_name: string, option_value: string) => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		const payload = {
			option_name: option_name,
			option_value: option_value,
		};

		axios
			.post(`http://127.0.0.1:5000/option/`, payload, config)
			.then((response) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Option Added</span>
					</span>,
					'Option added successfully',
				);

				//setIsCreateMode(false);
				fetchData();
				formikAddOption.resetForm();
			})
			.catch((errors) => console.log(errors));
	};

	const formikAddOption = useFormik({
		initialValues: {
			option_name_dropdown: '',
			option_name: '',
			option_value: '',
		},
		validate: (values) => {
			const errors: {
				option_name?: string;
				option_value?: string;
			} = {};
			if (!values.option_name && !values.option_name_dropdown) {
				errors.option_name = 'Required';
			}

			if (!values.option_value) {
				errors.option_value = 'Required';
			}

			return errors;
		},
		onSubmit: async (values) => {
			//api call
			//console.log(values);

			const option_name = values.option_name_dropdown
				? values.option_name_dropdown
				: values.option_name;
			await handleSubmitAddOption(option_name, values.option_value);
		},
	});

	//distinct option_name only
	const option_names = optionData.map((item) => item.option_name);
	const distinctOptions = [...new Set(option_names)];
	const dropdown_optionNames_add = distinctOptions.map((op) => {
		return { value: op, text: op };
	});
	const dropdown_optionNames_view = distinctOptions.map((op) => {
		return { value: op, text: op };
	});
	dropdown_optionNames_add.splice(0, 0, { value: '', text: 'Create New Option' });
	dropdown_optionNames_view.splice(0, 0, { value: '', text: 'All Option' });

	return (
		<>
			<Card hidden={!isCreateMode} tag='form'>
				<CardHeader>
					<CardLabel>
						<CardTitle tag='div' className='h3'>
							Add Options
						</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='dark'
							className='float-end'
							icon='Close'
							tag='a'
							isLight
							onClick={() => {
								formikAddOption.resetForm();
								setIsCreateMode(false);
								formik.resetForm();
							}}></Button>
					</CardActions>
				</CardHeader>
				<CardBody className='pb-0'>
					<div className='row g-4'>
						<div
							className={
								formikAddOption.values.option_name_dropdown == ''
									? 'col-md-2'
									: 'col-md-4'
							}>
							<FormGroup
								id='option_name_dropdown'
								label={
									formikAddOption.values.option_name_dropdown == ''
										? ''
										: 'Option Name'
								}
								isFloating>
								<Select
									id='OptionNameSelect'
									ariaLabel='Default select option name'
									value={formikAddOption.values.option_name_dropdown}
									list={dropdown_optionNames_add}
									onBlur={formikAddOption.handleBlur}
									isValid={formikAddOption.isValid}
									isTouched={formikAddOption.touched.option_name_dropdown}
									invalidFeedback={formikAddOption.errors.option_name_dropdown}
									//validFeedback='Valid Option Name'
									onChange={(e: { target: { value: any } }) => {
										formikAddOption.handleChange(e);

										//if (e.target.value)
										debounce(
											() =>
												onFormSubmit({
													...formik.values,
													option_name: e.target.value,
												}),
											1000,
										)();
									}}
								/>
							</FormGroup>
						</div>
						<div
							className='col-md-4'
							hidden={formikAddOption.values.option_name_dropdown != ''}>
							<FormGroup id='option_name' label='Option Name' isFloating>
								<Input
									placeholder='Option Name'
									//autoComplete='additional-name'
									onChange={formikAddOption.handleChange}
									onBlur={formikAddOption.handleBlur}
									value={formikAddOption.values.option_name}
									isValid={formikAddOption.isValid}
									isTouched={formikAddOption.touched.option_name}
									invalidFeedback={formikAddOption.errors.option_name}
									validFeedback='Valid Option Name'
								/>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='option_value' label='Option Value' isFloating>
								<Input
									placeholder='Option Value'
									//autoComplete='additional-name'
									onChange={formikAddOption.handleChange}
									onBlur={formikAddOption.handleBlur}
									value={formikAddOption.values.option_value}
									isValid={formikAddOption.isValid}
									isTouched={formikAddOption.touched.option_value}
									invalidFeedback={formikAddOption.errors.option_value}
									validFeedback='Valid Option Value'
								/>
							</FormGroup>
						</div>
						<div className='col-md-12'></div>
					</div>
				</CardBody>
				<CardFooter>
					<CardFooterRight>
						<Button
							color='success'
							className='float-end'
							icon='Add'
							tag='a'
							onClick={formikAddOption.handleSubmit}>
							Add
						</Button>
					</CardFooterRight>
				</CardFooter>
			</Card>
			<Card>
				<CardBody>
					<div className='row g-4'>
						<div className='col-md-3' hidden={isCreateMode}>
							<CardHeader>
								<CardLabel>
									<CardTitle tag='div' className='h3'>
										Manage Options
									</CardTitle>
								</CardLabel>
							</CardHeader>
						</div>
						<div className='col-md-2' hidden={isCreateMode}>
							<FormGroup
								id='option_name_dropdown'
								label={
									formikAddOption.values.option_name_dropdown == ''
										? ''
										: 'Option Name'
								}
								isFloating>
								<Select
									id='OptionNameSelect'
									ariaLabel='Default select option name'
									value={formikAddOption.values.option_name_dropdown}
									list={dropdown_optionNames_view}
									//onBlur={formikAddOption.handleBlur}
									//isValid={formikAddOption.isValid}
									isTouched={formikAddOption.touched.option_name_dropdown}
									//invalidFeedback={formikAddOption.errors.option_name_dropdown}
									//validFeedback='Valid Option Name'
									onChange={(e: { target: { value: any } }) => {
										formikAddOption.handleChange(e);

										//if (e.target.value)
										debounce(
											() =>
												onFormSubmit({
													...formik.values,
													option_name: e.target.value,
													search: formik.values.search,
												}),
											1000,
										)();
									}}
								/>
							</FormGroup>
						</div>
						<div className='col-md-4' hidden={isCreateMode}>
							<Alert color='light' isLight>
								<form onSubmit={formik.handleSubmit}>
									<FormGroup>
										<div className='d-flex' data-tour='search'>
											<label className='border-0 bg-transparent'>
												<Icon icon='Search' size='2x' color='primary' />
											</label>
											<Input
												id='search'
												placeholder='Search...'
												className='border-0 shadow-none bg-transparent'
												onChange={(e: {
													target: { value: string | any[] };
												}) => {
													formik.handleChange(e);

													if (e.target.value.length > 2)
														debounce(
															() =>
																onFormSubmit({
																	...formik.values,
																	search: e.target.value,
																	option_name:
																		formikAddOption.values
																			.option_name_dropdown,
																}),
															1000,
														)();

													if (e.target.value.length === 0)
														formik.resetForm();
												}}
												value={formik.values.search}
											/>
										</div>
									</FormGroup>
								</form>
							</Alert>
						</div>
						<div className='col-md-3' hidden={isCreateMode}>
							<Button
								color='primary'
								className='float-end'
								icon='Add'
								tag='a'
								onClick={() => {
									setIsCreateMode(true);
									formik.resetForm();
								}}>
								Add
							</Button>
						</div>
						<div className='col-md-12'></div>
						<div className='col-md-12'>
							<table className='table table-modern'>
								<thead>
									<tr>
										<th>#</th>
										<th
											onClick={() => requestSort('option_name')}
											className='cursor-pointer text-decoration-underline'>
											Option Name
											<Icon
												size='lg'
												className={getClassNamesFor('option_name')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('option_value')}
											className='cursor-pointer text-decoration-underline'>
											Option Value
											<Icon
												size='lg'
												className={getClassNamesFor('option_value')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('created_at')}
											className='cursor-pointer text-decoration-underline'>
											Created Datetime
											<Icon
												size='lg'
												className={getClassNamesFor('created_at')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('created_by')}
											className='cursor-pointer text-decoration-underline'>
											Created By
											<Icon
												size='lg'
												className={getClassNamesFor('created_by')}
												icon='FilterList'
											/>
										</th>

										<th
											onClick={() => requestSort('updated_at')}
											className='cursor-pointer text-decoration-underline'>
											Updated Datetime
											<Icon
												size='lg'
												className={getClassNamesFor('updated_at')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('updated_by')}
											className='cursor-pointer text-decoration-underline'>
											Updated By
											<Icon
												size='lg'
												className={getClassNamesFor('updated_by')}
												icon='FilterList'
											/>
										</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{dataPagination(items, currentPage, perPage).map((item, i) => (
										<tr key={item.option_id}>
											<td>{i + 1}</td>
											<td>{item.option_name}</td>
											<td>{item.option_value}</td>
											<td>
												{dayjs
													.utc(`${item.created_at}`)
													.local()
													.format('DD-MM-YYYY HH:mm:ss')}
											</td>
											<td>{item.created_by}</td>
											<td>
												{dayjs
													.utc(`${item.updated_at}`)
													.local()
													.format('DD-MM-YYYY HH:mm:ss')}
											</td>
											<td>{item.updated_by}</td>
											<td>
												<Button
													className='me-4'
													color='danger'
													isLight
													icon='Delete'
													onClick={() => {
														setOptionToDelete({
															option_id: item.option_id,
															option_name: item.option_name,
															option_value: item.option_value,
														});
														initialStatus();
														setCenteredStatus(true);
														setState(true);
													}}></Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</CardBody>
				<PaginationButtons
					data={items}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>
			<Modal
				isOpen={state}
				setIsOpen={setState}
				titleId='exampleModalLabel'
				isStaticBackdrop={staticBackdropStatus}
				isScrollable={scrollableStatus}
				isCentered={centeredStatus}
				size={sizeStatus}
				fullScreen={fullScreenStatus}
				isAnimation={animationStatus}>
				<ModalHeader setIsOpen={headerCloseStatus ? setState : undefined}>
					<ModalTitle id='confirmDeleteUserModal'>
						Confirm Delete:
						{optionToDelete.option_value}
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<p>
						Option Name: {optionToDelete.option_name} <br /> Option Value:{' '}
						{optionToDelete.option_value}
					</p>
				</ModalBody>
				<ModalFooter>
					<Button
						color='danger'
						icon='Delete'
						onClick={() => {
							setState(false);
							handleDelete(optionToDelete.option_id);
						}}>
						Delete
					</Button>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setState(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default ManageOption;
