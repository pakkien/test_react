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
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
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
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { useFormik } from 'formik';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import { debounce } from '../../../helpers/helpers';
import UsersTable from './components/UsersTable';
import ManageOption from './components/ManageOption';



type TTabs = 'Manage Users' | 'Manage Options' ;
const TABS: { [key: string]: TTabs } = {
	MANAGE_USERS: 'Manage Users',
	MANAGE_OPTIONS: 'Manage Options'
};


const AdminPage = () => {

	const [activeTab, setActiveTab] = useState<TTabs>(TABS.MANAGE_USERS);
	

	const navigate = useNavigate();
	return (
		<PageWrapper title='Admin'>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back
					</Button>
					<SubheaderSeparator />
					<strong className='fs-5'>Admin</strong>
					<SubheaderSeparator/>
					<ButtonGroup>
						{Object.keys(TABS).map((key) => (
							<Button
								key={key}
								color={activeTab === TABS[key] ? 'success' : 'light'}
								onClick={() => setActiveTab(TABS[key])}>
								{TABS[key]}
							</Button>
						))}
					</ButtonGroup>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				{activeTab==TABS.MANAGE_USERS?<UsersTable/>:<ManageOption/>}
			</Page>
		</PageWrapper>
	);
};

export default AdminPage;
