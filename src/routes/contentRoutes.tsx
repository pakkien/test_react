import React, { lazy } from 'react';
import {
	trackingListMenu,
	adminPagesMenu,
	dashboardPagesMenu,
	demoPagesMenu,
	pageLayoutTypesPagesMenu,
	quotationMenu,
} from '../menu';
import Login from '../pages/presentation/auth/Login';

const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
};
const ADMIN = {
	ADMIN_PAGE: lazy(() => import('../pages/presentation/admin/AdminPage')),
	MANAGE_USER: lazy(() => import('../pages/presentation/admin/ManageUser')),
};

const TRACKING_LIST = {
	TRACKING_LIST_PAGE: lazy(() => import('../pages/presentation/tracking-list/TrackingList')),
	VIEW_QUOTATION_PAGE: lazy(() => import('../pages/presentation/tracking-list/ViewQuotation')),
};

const QUOTATION = {
	QUOTATION_LIST_PAGE: lazy(() => import('../pages/presentation/quotation/QuotationList')),
	VIEW_QUOTATION_PAGE: lazy(() => import('../pages/presentation/quotation/ViewQuotation')),
	EDIT_QUOTATION_PAGE: lazy(() => import('../pages/presentation/quotation/EditQuotation')),
	CREATE_QUOTATION_PAGE: lazy(() => import('../pages/presentation/quotation/CreateQuotation')),
};

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};
const PAGE_LAYOUTS = {
	HEADER_SUBHEADER: lazy(() => import('../pages/presentation/page-layouts/HeaderAndSubheader')),
	HEADER: lazy(() => import('../pages/presentation/page-layouts/OnlyHeader')),
	SUBHEADER: lazy(() => import('../pages/presentation/page-layouts/OnlySubheader')),
	CONTENT: lazy(() => import('../pages/presentation/page-layouts/OnlyContent')),
	BLANK: lazy(() => import('../pages/presentation/page-layouts/Blank')),
	ASIDE: lazy(() => import('../pages/presentation/aside-types/DefaultAsidePage')),
	MINIMIZE_ASIDE: lazy(() => import('../pages/presentation/aside-types/MinimizeAsidePage')),
};

const presentation = [
	/**
	 * Landing
	 */
	{
		path: dashboardPagesMenu.dashboard.path,
		element: <LANDING.DASHBOARD />,
	},
	{
		path: trackingListMenu.trackingList.path,
		element: <TRACKING_LIST.TRACKING_LIST_PAGE />,
	},
	{
		path: 'tracking/view-quotation',
		element: <TRACKING_LIST.VIEW_QUOTATION_PAGE />,
	},
	{
		path: quotationMenu.quotation.path,
		element: <QUOTATION.QUOTATION_LIST_PAGE />,
	},
	{
		path: 'quotation/view-quotation',
		element: <QUOTATION.VIEW_QUOTATION_PAGE />,
	},
	{
		path: 'quotation/edit-quotation',
		element: <QUOTATION.EDIT_QUOTATION_PAGE />,
	},
	{
		path: 'quotation/create-quotation',
		element: <QUOTATION.CREATE_QUOTATION_PAGE />,
	},
	{
		path: adminPagesMenu.admin.path,
		element: <ADMIN.ADMIN_PAGE />,
	},
	{
		path: 'admin/manage-user',
		element: <ADMIN.MANAGE_USER />,
	},
	{
		path: demoPagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},
	{
		path: demoPagesMenu.login.path,
		element: <Login />,
	},
	{
		path: demoPagesMenu.signUp.path,
		element: <Login isSignUp />,
	},

	/** ************************************************** */

	/**
	 * Page Layout Types
	 */
	{
		path: pageLayoutTypesPagesMenu.blank.path,
		element: <PAGE_LAYOUTS.BLANK />,
	},
	{
		path: pageLayoutTypesPagesMenu.pageLayout.subMenu.headerAndSubheader.path,
		element: <PAGE_LAYOUTS.HEADER_SUBHEADER />,
	},
	{
		path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyHeader.path,
		element: <PAGE_LAYOUTS.HEADER />,
	},
	{
		path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlySubheader.path,
		element: <PAGE_LAYOUTS.SUBHEADER />,
	},
	{
		path: pageLayoutTypesPagesMenu.pageLayout.subMenu.onlyContent.path,
		element: <PAGE_LAYOUTS.CONTENT />,
	},
	{
		path: pageLayoutTypesPagesMenu.asideTypes.subMenu.defaultAside.path,
		element: <PAGE_LAYOUTS.ASIDE />,
	},
	{
		path: pageLayoutTypesPagesMenu.asideTypes.subMenu.minimizeAside.path,
		element: <PAGE_LAYOUTS.MINIMIZE_ASIDE />,
	},
];
const contents = [...presentation];

export default contents;
