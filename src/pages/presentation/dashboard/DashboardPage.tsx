import React, { useState } from 'react';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Popovers from '../../../components/bootstrap/Popovers';
import { TModalSize, TModalFullScreen } from '../../../type/modal-type';
import Button from '../../../components/bootstrap/Button';
import Modal, {
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from '../../../components/bootstrap/Modal';

const DashboardPage = () => {
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

	return (
		<PageWrapper title='Dashboard Page'>
			<SubHeader>
				<SubHeaderLeft>
					<Popovers
						title='DashboardPage.tsx'
						desc={<code>src/pages/presentation/dashboard/DashboardPage.tsx</code>}>
						SubHeaderLeft
					</Popovers>
					<code>DashboardPage.tsx</code>
					<SubheaderSeparator />
				</SubHeaderLeft>
				<SubHeaderRight>
					<Popovers
						title='DashboardPage.tsx'
						desc={<code>src/pages/presentation/dashboard/DashboardPage.tsx</code>}>
						SubHeaderRight
					</Popovers>
					<code>DashboardPage.tsx</code>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12 mb-3'>
						<Button
							className='me-4'
							color='danger'
							isLight
							icon='Delete'
							onClick={() => {
								initialStatus();
								setCenteredStatus(true);
								setState(true);
							}}>
							Delete
						</Button>
						<Popovers
							title='DashboardPage.tsx'
							desc={<code>src/pages/presentation/dashboard/DashboardPage.tsx</code>}>
							Page
						</Popovers>
						<code className='ps-3'>DashboardPage.tsx</code>
					</div>
				</div>

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
						<ModalTitle id='exampleModalLabel'>Modal title</ModalTitle>
					</ModalHeader>
					<ModalBody>AAA</ModalBody>
					<ModalFooter>
						<Button
							color='info'
							isOutline
							className='border-0'
							onClick={() => setState(false)}>
							Close
						</Button>
						<Button color='info' icon='Save'>
							Save changes
						</Button>
					</ModalFooter>
				</Modal>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
