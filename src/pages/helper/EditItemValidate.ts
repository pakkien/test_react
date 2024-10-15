interface IValues {
	product_desc: string;
	brand: string;
	model: string;
	remarks: string;
	quantity: string;
	unit: string;
	unit_cost: string;
	total_cost: string;
	margin: string;
	unit_price: string;
	total_price: string;

}
const validate = (values: IValues) => {
	// const errors: IValues = {
	// 	product_desc: '',
	// 		brand: '',
	// 		model: '',
	// 		remarks: '',
	// 		quantity: 0,
	// 		unit: '',
	// 		unit_cost: 0,
	// 		total_cost: 0,
	// 		margin: 0,
	// 		unit_price: 0,
	// 		total_price: 0,
	// };

	const errors: {
		product_desc?: string;
		brand?: string;
		model?: string;
		remarks?: string;
		quantity?: string;
		unit?: string;
		unit_cost?: string;
		total_cost?: string;
		margin?: string;
		unit_price?: string;
		total_price?: string;
	} = {};

	if (!values.product_desc) {
		errors.product_desc = 'Required';
	} else if (values.product_desc.length < 3) {
		errors.product_desc = 'Must be 3 characters or more';
	} else if (values.product_desc.length > 20) {
		errors.product_desc = 'Must be 20 characters or less';
	}

	if (!values.brand) {
		errors.brand = 'Required';
	} else if (values.brand.length < 3) {
		errors.brand = 'Must be 3 characters or more';
	} else if (values.brand.length > 20) {
		errors.brand = 'Must be 20 characters or less';
	}

	
	if (!values.model) {
		errors.model = 'Required';
	} else if (values.model.length < 3) {
		errors.model = 'Must be 3 characters or more';
	} else if (values.model.length > 20) {
		errors.model = 'Must be 20 characters or less';
	}

	if (!values.remarks) {
		errors.remarks = 'Required';
	} else if (values.remarks.length < 3) {
		errors.remarks = 'Must be 3 characters or more';
	} else if (values.remarks.length > 20) {
		errors.remarks = 'Must be 20 characters or less';
	}

	if (!values.unit) {
		errors.unit = 'Required';
	} else if (values.unit.length < 3) {
		errors.unit = 'Must be 3 characters or more';
	} else if (values.unit.length > 20) {
		errors.unit = 'Must be 20 characters or less';
	}
	if (!values.quantity) {
		errors.quantity = 'Required';
	} else if (values.quantity.length < 3) {
		errors.quantity = 'Must be 3 characters or more';
	} else if (values.quantity.length > 20) {
		errors.quantity = 'Must be 20 characters or less';
	}
	if (!values.unit_cost) {
		errors.unit_cost = 'Required';
	} else if (values.unit_cost.length < 3) {
		errors.unit_cost = 'Must be 3 characters or more';
	} else if (values.unit_cost.length > 20) {
		errors.unit_cost = 'Must be 20 characters or less';
	}
	if (!values.total_cost) {
		errors.total_cost = 'Required';
	} else if (values.total_cost.length < 3) {
		errors.total_cost = 'Must be 3 characters or more';
	} else if (values.total_cost.length > 20) {
		errors.total_cost = 'Must be 20 characters or less';
	}
	if (!values.margin) {
		errors.margin = 'Required';
	} else if (values.margin.length < 3) {
		errors.margin = 'Must be 3 characters or more';
	} else if (values.margin.length > 20) {
		errors.margin = 'Must be 20 characters or less';
	}
	if (!values.unit_price) {
		errors.unit_price = 'Required';
	} else if (values.unit_price.length < 3) {
		errors.unit_price = 'Must be 3 characters or more';
	} else if (values.unit_price.length > 20) {
		errors.unit_price = 'Must be 20 characters or less';
	}
	if (!values.total_price) {
		errors.total_price = 'Required';
	} else if (values.total_price.length < 3) {
		errors.total_price = 'Must be 3 characters or more';
	} else if (values.total_price.length > 20) {
		errors.total_price = 'Must be 20 characters or less';
	}





	return errors;
};

export default validate;
