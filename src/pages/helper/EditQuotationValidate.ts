interface IValues {
	client: string;
	end_user: string;
	site_location: string;
	building: string;
	pic: string;
	email: string;
	project_ref: string;

}
const validate = (values: IValues) => {
	// const errors: IValues = {
	// 	client: '',
	// 	end_user: '',
	// 	site_location: '',
    //     building: '',
    //     pic: '',
    //     email: '',
    //     project_ref: '',
	// };

	const errors: {
				client?: string;
				end_user?: string;
				site_location?: string;
				building?: string;
				pic?: string;
				email?: string;
				project_ref?: string;
				g_total?: string;
			} = {};

	if (!values.client) {
		errors.client = 'Required';
	} else if (values.client.length < 3) {
		errors.client = 'Must be 3 characters or more';
	} else if (values.client.length > 20) {
		errors.client = 'Must be 20 characters or less';
	}

    if (!values.end_user) {
		errors.end_user = 'Required';
	} else if (values.end_user.length < 3) {
		errors.end_user = 'Must be 3 characters or more';
	} else if (values.end_user.length > 20) {
		errors.end_user = 'Must be 20 characters or less';
	}
    if (!values.site_location) {
		errors.site_location = 'Required';
	} else if (values.site_location.length < 3) {
		errors.site_location = 'Must be 3 characters or more';
	} else if (values.site_location.length > 20) {
		errors.site_location = 'Must be 20 characters or less';
	}
    if (!values.building) {
		errors.building = 'Required';
	} else if (values.building.length < 3) {
		errors.building = 'Must be 3 characters or more';
	} else if (values.building.length > 20) {
		errors.building = 'Must be 20 characters or less';
	}
    if (!values.pic) {
		errors.pic = 'Required';
	} else if (values.pic.length < 3) {
		errors.pic = 'Must be 3 characters or more';
	} else if (values.pic.length > 20) {
		errors.pic = 'Must be 20 characters or less';
	}
    if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
    if (!values.project_ref) {
		errors.project_ref = 'Required';
	} else if (values.project_ref.length < 3) {
		errors.project_ref = 'Must be 3 characters or more';
	} else if (values.project_ref.length > 20) {
		errors.project_ref = 'Must be 20 characters or less';
	}

	console.log("error:" + JSON.stringify(errors));
	return errors;
};

export default validate;


