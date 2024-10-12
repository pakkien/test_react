import React, { useState } from 'react';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import { TModalSize, TModalFullScreen } from '../../../type/modal-type';
import Alert from '../../../components/bootstrap/Alert';

// const formik = useFormik({
// 	initialValues: {
// 		searchInput: '',
// 	},
// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	onSubmit: (values) => {
// 		// alert(JSON.stringify(values, null, 2));
// 	},
// });

function returnTrueFalseIconisTrue(isTrue: Boolean) {
	if (isTrue) {
		return (
			<Icon
				icon='CheckCircleOutline'
				className=''
				color='success'
				size='3x'
				forceFamily='material'
			/>
		);
	} else {
		return <Icon icon='Cancel' className='' color='danger' size='3x' forceFamily='material' />;
	}
}

const AdminPage = () => {
	const userData = [
		{
			user_id: '1',
			role: 'Admin',
			name: 'John Doe',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '2',
			role: 'Admin',
			name: 'John2',
			email: 'user1@gmail.com',
			view_quotation: false,
			create_edit_quotation: false,
			view_mccr: false,
			create_edit_mccr: false,
		},
		{
			user_id: '3',
			role: 'Admin',
			name: 'John3',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '4',
			role: 'Admin',
			name: 'John4',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '5',
			role: 'Admin',
			name: 'John5',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '6',
			role: 'Admin',
			name: 'John6',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '7',
			role: 'Admin',
			name: 'John7',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '8',
			role: 'Admin',
			name: 'John8',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '9',
			role: 'Admin',
			name: 'John9',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
		{
			user_id: '10',
			role: 'User',
			name: 'John10',
			email: 'user1@gmail.com',
			view_quotation: true,
			create_edit_quotation: true,
			view_mccr: true,
			create_edit_mccr: true,
		},
	];

	const [lists, setList] = useState(userData);

	function handleRemove(user_id: string) {
		const newList = lists.filter((item) => item.user_id !== user_id);
		setList(newList);
	}

	const navigate = useNavigate();

	const goToEditPage = () => {
		navigate('manage-user');
	};

	const [userToDelete, setUserToDelete] = useState({ name: '', id: '' });
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
	// 	<>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 		<p>
	// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
	// 			facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
	// 			vestibulum at eros.
	// 		</p>
	// 		<p>
	// 			Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
	// 			lacus vel augue laoreet rutrum faucibus dolor auctor.
	// 		</p>
	// 		<p>
	// 			Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
	// 			scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
	// 			metus auctor fringilla.
	// 		</p>
	// 	</>
	// ) : (
	// 	<p>
	// 		Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
	// 		in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
	// 	</p>
	// );

	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const handleButtonClick_deleteUser = (id: string) => {
		handleRemove(id);

		setIsAlertVisible(true);

		setTimeout(() => {
			setIsAlertVisible(false);
		}, 3000);
	};

	return (
		<PageWrapper title='Admin'>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>User Management</strong>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				{isAlertVisible && (
					<Alert color='success' isLight icon='VerifiedUser' isDismissible>
						Delete Success
					</Alert>
				)}
				<Card stretch>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h3'>
								User Management
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Button color='success' icon='Create' tag='a' target='_blank'>
								Create
							</Button>
						</CardActions>
					</CardHeader>

					{/* <CardHeader>
						<SubHeader>
							<SubHeaderLeft>
								<label
									className='border-0 bg-transparent cursor-pointer me-0'
									htmlFor='searchInput'>
									<Icon icon='Search' size='2x' color='primary' />
								</label>
								<Input
									id='searchInput'
									type='search'
									className='border-0 shadow-none bg-transparent'
									placeholder='Search...'
									// onChange={formik.handleChange}
									// value={formik.values.searchInput}
								/>
							</SubHeaderLeft>
						</SubHeader>
					</CardHeader> */}

					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern'>
							<thead>
								<tr>
									<th>Role</th>
									<th>Name</th>
									<th>Email</th>
									<th>View Quotation</th>
									<th>Create / Edit Quotation</th>
									<th>View MCCR</th>
									<th>Create / Edit MCCR</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{lists.map((item) => (
									//<li key={item.id}>{item.name}</li>
									<tr key={item.user_id}>
										<td>{item.role}</td>
										<td>{item.name}</td>
										<td>{item.email}</td>
										<td>{returnTrueFalseIconisTrue(item.view_quotation)}</td>
										<td>
											{returnTrueFalseIconisTrue(item.create_edit_quotation)}
										</td>
										<td>{returnTrueFalseIconisTrue(item.view_mccr)}</td>
										<td>{returnTrueFalseIconisTrue(item.create_edit_mccr)}</td>
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
														onClick={() => goToEditPage()}></Button>
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
																id: item.user_id,
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
					</CardBody>
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
								handleButtonClick_deleteUser(userToDelete.id);
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
			</Page>
		</PageWrapper>
	);
};

export default AdminPage;
