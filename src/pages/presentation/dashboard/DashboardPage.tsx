import React, { useState } from 'react';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Popovers from '../../../components/bootstrap/Popovers';
import Card, { CardBody } from '../../../components/bootstrap/Card';

const DashboardPage = () => {

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
						<Popovers
							title='DashboardPage.tsx'
							desc={<code>src/pages/presentation/dashboard/DashboardPage.tsx</code>}>
							Page
						</Popovers>
						<code className='ps-3'>DashboardPage.tsx</code>
					</div>
				</div>
				<Card>
					<CardBody>
						<h1>Work in Progress...</h1>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
