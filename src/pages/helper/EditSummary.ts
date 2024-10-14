interface IValues {
	reference_status: string;
	note: string;
	total: string;
	g_total: string;

}
const validate = (values: IValues) => {
	const errors: IValues = {
		reference_status: '',
        note: '',
        total: '',
        g_total: '',
	};

	// const errors: {
	// 	reference_status?: string;
	// 	note?: string;
	// 	total?: string;
	// 	g_total?: string;
	// } = {};

	if (!values.reference_status) {
		errors.reference_status = 'Required';
	} else if (values.reference_status.length < 3) {
		errors.reference_status = 'Must be 3 characters or more';
	} else if (values.reference_status.length > 20) {
		errors.reference_status = 'Must be 20 characters or less';
	}

	if (!values.note) {
		errors.note = 'Required';
	} else if (values.note.length < 3) {
		errors.note = 'Must be 3 characters or more';
	} else if (values.note.length > 20) {
		errors.note = 'Must be 20 characters or less';
	}

	if (!values.total) {
		errors.total = 'Required';
	} else if (values.total.length < 3) {
		errors.total = 'Must be 3 characters or more';
	} else if (values.total.length > 20) {
		errors.total = 'Must be 20 characters or less';
	}
	if (!values.g_total) {
		errors.g_total = 'Required';
	} else if (values.g_total.length < 3) {
		errors.g_total = 'Must be 3 characters or more';
	} else if (values.g_total.length > 20) {
		errors.g_total = 'Must be 20 characters or less';
	}

	// if (parseInt(values.total) < 0) {
	// 	errors.total = 'should be more than 0';
	// } 

	// if (parseInt(values.g_total) < 0) {
	// 	errors.g_total = 'should be more than 0';
	// } 



	return errors;
};

export default validate;
