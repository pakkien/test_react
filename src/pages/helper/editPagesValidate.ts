interface IValues {
	name: string;
	role: string;
	email: string;
	// lastName: string;
	// displayName: string;
	// emailAddress: string;
	// currentPassword: string;
	// newPassword: string;
	// confirmPassword: string;
}
const validate = (values: IValues) => {
	const errors: IValues = {
		name: '',
		role: '',
		email: ''
		// lastName: '',
		// displayName: '',
		// emailAddress: '',
		// currentPassword: '',
		// newPassword: '',
		// confirmPassword: '',
	};
	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length < 3) {
		errors.name = 'Must be 3 characters or more';
	} else if (values.name.length > 20) {
		errors.name = 'Must be 20 characters or less';
	}


	if (!values.role) {
		errors.role = 'Required';
	} else if (values.role.length < 3) {
		errors.role = 'Must be 3 characters or more';
	} else if (values.role.length > 20) {
		errors.role = 'Must be 20 characters or less';
	}

	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	// if (!values.lastName) {
	// 	errors.lastName = 'Required';
	// } else if (values.lastName.length < 3) {
	// 	errors.lastName = 'Must be 3 characters or more';
	// } else if (values.lastName.length > 20) {
	// 	errors.lastName = 'Must be 20 characters or less';
	// }

	// if (!values.displayName) {
	// 	errors.displayName = 'Required';
	// } else if (values.displayName.length > 30) {
	// 	errors.displayName = 'Must be 20 characters or less';
	// }

	// if (!values.emailAddress) {
	// 	errors.emailAddress = 'Required';
	// } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)) {
	// 	errors.emailAddress = 'Invalid email address';
	// }

	// if (values.currentPassword) {
	// 	if (!values.newPassword) {
	// 		errors.newPassword = 'Please provide a valid password.';
	// 	} else {
	// 		errors.newPassword = '';

	// 		if (values.newPassword.length < 8 || values.newPassword.length > 32) {
	// 			errors.newPassword +=
	// 				'The password must be at least 8 characters long, but no more than 32. ';
	// 		}
	// 		if (!/[0-9]/g.test(values.newPassword)) {
	// 			errors.newPassword +=
	// 				'Require that at least one digit appear anywhere in the string. ';
	// 		}
	// 		if (!/[a-z]/g.test(values.newPassword)) {
	// 			errors.newPassword +=
	// 				'Require that at least one lowercase letter appear anywhere in the string. ';
	// 		}
	// 		if (!/[A-Z]/g.test(values.newPassword)) {
	// 			errors.newPassword +=
	// 				'Require that at least one uppercase letter appear anywhere in the string. ';
	// 		}
	// 		if (!/[!@#$%^&*)(+=._-]+$/g.test(values.newPassword)) {
	// 			errors.newPassword +=
	// 				'Require that at least one special character appear anywhere in the string. ';
	// 		}
	// 	}

	// 	if (!values.confirmPassword) {
	// 		errors.confirmPassword = 'Please provide a valid password.';
	// 	} else if (values.newPassword !== values.confirmPassword) {
	// 		errors.confirmPassword = 'Passwords do not match.';
	// 	}
	//}

	return errors;
};

export default validate;
