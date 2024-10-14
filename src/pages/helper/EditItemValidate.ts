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
		quantity?: number;
		unit?: string;
		unit_cost?: number;
		total_cost?: number;
		margin?: number;
		unit_price?: number;
		total_price?: number;
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

	// if (!values.quantity) {
	// 	errors.quantity = 'Required';
	// } else if (values.quantity.length < 3) {
	// 	errors.quantity = 'Must be 3 characters or more';
	// } else if (values.quantity.length > 20) {
	// 	errors.quantity = 'Must be 20 characters or less';
	// }




	return errors;
};

export default validate;
