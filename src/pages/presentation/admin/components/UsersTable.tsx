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
	CardBody,
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
import axios from 'axios';
import showNotification from '../../../../components/extras/showNotification';

function returnTrueFalseIconisTrue(isTrue: Boolean) {
	if (isTrue) {
		return (
			<Icon
				icon='CheckCircleOutline'
				className=''
				color='success'
				size='2x'
				forceFamily='material'
			/>
		);
	} else {
		return <Icon icon='Cancel' className='' color='danger' size='2x' forceFamily='material' />;
	}
}

type UserDataType = {
	id: number;
	email: string;
	name: string;
	role: string;
	view_mccr: boolean;
	view_quotation: boolean;
	write_mccr: boolean;
	write_quotation: boolean;
};

const UsersTable = () => {
	const [userData, setUserData] = useState<UserDataType[]>([]);
	const [tableData, setTableData] = useState(userData);

	const fetchData = async () => {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		axios.get('http://127.0.0.1:5000/users', config).then((response) => {
			setUserData(response.data.data);
			setTableData(response.data.data);
			//console.log(response.data.options);
		});
	};

	//Get Users table data
	useEffect(() => {
		fetchData();
	}, []);

	function handleDelete(id: number) {
		const config = {
			headers: { Authorization: `${localStorage.getItem('bts_token')}` },
		};

		axios
			.delete(`http://127.0.0.1:5000/users/${id}`, config)
			.then((response) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>User Deleted</span>
					</span>,
					'User deleted successfully',
				);

				fetchData();
			})
			.catch((errors) => console.log(errors));
	}

	const navigate = useNavigate();

	const goToEditPage = (id: number) => {
		navigate(`manage-user/${id}`);
	};

	const [userToDelete, setUserToDelete] = useState({ name: '', id: -99 });
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

	//search

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { items, requestSort, getClassNamesFor } = useSortableData(tableData);

	const onFormSubmit = (values: { search: any }) => {
		const searchValue = values.search.toString().toLowerCase();
		const newData = searchAndFilterData(searchValue);

		if (!values.search) {
			setTableData(userData);
		} else {
			setTableData(newData);
		}
	};

	const formik = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: onFormSubmit,
		onReset: () => setTableData(userData),
	});

	const searchAndFilterData = (search_string: string) => {
		return userData.filter((item: UserDataType) => {
			return (
				item.name.toLowerCase().includes(search_string) ||
				item.role.toLowerCase().includes(search_string) ||
				item.email.toLowerCase().includes(search_string)
			);
		});
	};

	return (
		<>
			<Card stretch>
				<CardBody className='table-responsive' isScrollable>
					<div className='row g-4'>
						<div className='col-md-4'>
							<CardHeader>
								<CardLabel>
									<CardTitle tag='div' className='h3'>
										Manage Users
									</CardTitle>
								</CardLabel>
							</CardHeader>
						</div>
						<div className='col-md-4'>
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
						<div className='col-md-4'>
							<Button
								color='success'
								className='float-end'
								icon='Create'
								tag='a'
								isDisable>
								Create
							</Button>
						</div>
						<div className='col-md-12'>
							<table className='table table-modern'>
								<thead>
									<tr>
										<th>#</th>
										<th
											onClick={() => requestSort('role')}
											className='cursor-pointer text-decoration-underline'>
											Role
											<Icon
												size='lg'
												className={getClassNamesFor('role')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('name')}
											className='cursor-pointer text-decoration-underline'>
											Name
											<Icon
												size='lg'
												className={getClassNamesFor('name')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('email')}
											className='cursor-pointer text-decoration-underline'>
											Email
											<Icon
												size='lg'
												className={getClassNamesFor('email')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('view_quotation')}
											className='cursor-pointer text-decoration-underline'>
											View Quotation
											<Icon
												size='lg'
												className={getClassNamesFor('view_quotation')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('write_quotation')}
											className='cursor-pointer text-decoration-underline'>
											Create / Edit Quotation
											<Icon
												size='lg'
												className={getClassNamesFor('write_quotation')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('view_mccr')}
											className='cursor-pointer text-decoration-underline'>
											View MCCR
											<Icon
												size='lg'
												className={getClassNamesFor('view_mccr')}
												icon='FilterList'
											/>
										</th>
										<th
											onClick={() => requestSort('write_mccr')}
											className='cursor-pointer text-decoration-underline'>
											Create / Edit MCCR
											<Icon
												size='lg'
												className={getClassNamesFor('write_mccr')}
												icon='FilterList'
											/>
										</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{dataPagination(items, currentPage, perPage).map((item, i) => (
										<tr key={item.id}>
											<td>{i + 1}</td>
											<td>{item.role}</td>
											<td>{item.name}</td>
											<td>{item.email}</td>
											<td>
												{returnTrueFalseIconisTrue(item.view_quotation)}
											</td>
											<td>
												{returnTrueFalseIconisTrue(item.write_quotation)}
											</td>
											<td>{returnTrueFalseIconisTrue(item.view_mccr)}</td>
											<td>{returnTrueFalseIconisTrue(item.write_mccr)}</td>
											<td>
												<div className='row'>
													<div className='col-auto'>
														<Button
															color='primary'
															icon='Edit'
															shadow='none'
															hoverShadow='lg'
															tag='a'
															target='_blank'
															onClick={() =>
																goToEditPage(item.id)
															}></Button>
													</div>
													<div className='col-auto'>
														<Button
															className='me-4'
															color='danger'
															isLight
															icon='Delete'
															onClick={() => {
																setUserToDelete({
																	name: item.name,
																	id: item.id,
																});
																initialStatus();
																setCenteredStatus(true);
																setState(true);
															}}></Button>
													</div>
												</div>
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
						Confirm Delete User - {userToDelete.name}
					</ModalTitle>
				</ModalHeader>
				<ModalBody>Confirm to delete {userToDelete.name}</ModalBody>
				<ModalFooter>
					<Button
						color='danger'
						icon='Delete'
						onClick={() => {
							setState(false);
							handleDelete(userToDelete.id);
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

export default UsersTable;
