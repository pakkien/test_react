interface IValues {
	product_desc: string;
	brand: string;
	model: string;
	remarks: string;
	quantity: number;
	unit: string;
	unit_cost: number;
	total_cost: number;
	margin: number;
	unit_price: number;
	total_price: number;

}
const validate = (values: IValues) => {
	const errors: IValues = {
		product_desc: '',
			brand: '',
			model: '',
			remarks: '',
			quantity: 0,
			unit: '',
			unit_cost: 0,
			total_cost: 0,
			margin: 0,
			unit_price: 0,
			total_price: 0,
	};

	if (!values.brand) {
		errors.brand = 'Required';
	} else if (values.brand.length < 3) {
		errors.brand = 'Must be 3 characters or more';
	} else if (values.brand.length > 20) {
		errors.brand = 'Must be 20 characters or less';
	}

    // if (!values.end_user) {
	// 	errors.end_user = 'Required';
	// } else if (values.end_user.length < 3) {
	// 	errors.end_user = 'Must be 3 characters or more';
	// } else if (values.end_user.length > 20) {
	// 	errors.end_user = 'Must be 20 characters or less';
	// }
    // if (!values.site_location) {
	// 	errors.site_location = 'Required';
	// } else if (values.site_location.length < 3) {
	// 	errors.site_location = 'Must be 3 characters or more';
	// } else if (values.site_location.length > 20) {
	// 	errors.site_location = 'Must be 20 characters or less';
	// }
    // if (!values.building) {
	// 	errors.building = 'Required';
	// } else if (values.building.length < 3) {
	// 	errors.building = 'Must be 3 characters or more';
	// } else if (values.building.length > 20) {
	// 	errors.building = 'Must be 20 characters or less';
	// }
    // if (!values.pic) {
	// 	errors.pic = 'Required';
	// } else if (values.pic.length < 3) {
	// 	errors.pic = 'Must be 3 characters or more';
	// } else if (values.pic.length > 20) {
	// 	errors.pic = 'Must be 20 characters or less';
	// }
    // if (!values.email) {
	// 	errors.email = 'Required';
	// } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	// 	errors.email = 'Invalid email address';
	// }
    // if (!values.project_ref) {
	// 	errors.project_ref = 'Required';
	// } else if (values.project_ref.length < 3) {
	// 	errors.project_ref = 'Must be 3 characters or more';
	// } else if (values.project_ref.length > 20) {
	// 	errors.project_ref = 'Must be 20 characters or less';
	// }

	return errors;
};

export default validate;
