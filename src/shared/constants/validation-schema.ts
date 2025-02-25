import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	time: Yup.string().required('Time is required'),
	tasks: Yup.array().of(
		Yup.object().shape({
			taskName: Yup.string().required('Task name is required'),
			projectHours: Yup.string().required('Project hours are required')
		})
	),
	employees: Yup.array().when('active', {
		is: (values) => {
			return false;
		},
		then: Yup.array().of(
			Yup.array().of(
				Yup.object().shape({
					task: Yup.string().required('Task is required'),
					project: Yup.string(),
					projectHours: Yup.string().required('Project hours are required')
				})
			)
		)
	})
});

const checkInValidationSchema = Yup.object().shape({
	time: Yup.string()
		.matches(/^[0-9]{2}:[0-9]{2}$/, 'Please enter valid time format (hh:mm)')
		.matches(/^[^\s]*$/, 'Spaces are not allowed in the input')
		.test('valid-time', 'Invalid time value', (value) => {
			if (!value) return true;

			const [hours, minutes] = value.split(':').map(Number);

			if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
				return false;
			}

			return true;
		})
		.required(' ')
});

const checkOutValidationWithOptSchema = Yup.object().shape({
	time: Yup.string()
		.matches(/^[0-9]{2}:[0-9]{2}$/, 'Please enter valid time format (hh:mm)')
		.matches(/^[^\s]*$/, 'Spaces are not allowed in the input')
		.test('valid-time', 'Invalid time value', (value) => {
			if (!value) return true;

			const [hours, minutes] = value.split(':').map(Number);

			if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
				return false;
			}

			return true;
		})
		.required('Time is required'),
	tasks: Yup.array().of(
		Yup.object().shape({
			taskName: Yup.string().required('Task is required'),
			projectHours: Yup.string()
				.matches(/^[0-9]{2}:[0-9]{2}$/, 'Please enter valid time format (hh:mm)')
				.matches(/^[^\s]*$/, 'Spaces are not allowed in the input')
				.test('valid-time', 'Invalid time value', (value) => {
					if (!value) return true;

					const [hours, minutes] = value.split(':').map(Number);

					if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
						return false;
					}

					return true;
				})
		})
	)
});

const checkOutValidationSchema = Yup.object().shape({
	time: Yup.string()
		.matches(/^[0-9]{2}:[0-9]{2}$/, 'Please enter valid time format (hh:mm)')
		.matches(/^[^\s]*$/, 'Spaces are not allowed in the input')
		.test('valid-time', 'Invalid time value', (value) => {
			if (!value) return true;

			const [hours, minutes] = value.split(':').map(Number);

			if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
				return false;
			}

			return true;
		})
		.required('Time is required'),
	tasks: Yup.array().of(
		Yup.object().shape({
			taskName: Yup.string().nullable().required('Task is required'),
			projectHours: Yup.string()
				.matches(/^[0-9]{2}:[0-9]{2}$/, 'Please enter valid time format (hh:mm)')
				.matches(/^[^\s]*$/, 'Spaces are not allowed in the input')
				.test('valid-time', 'Invalid time value', (value) => {
					if (!value) return true;

					const [hours, minutes] = value.split(':').map(Number);

					if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
						return false;
					}

					return true;
				})
		})
	)
});

const checkOutwithNoTaskValidationSchema = Yup.object().shape({
	time: Yup.string()
		.matches(/^[0-9]{2}:[0-9]{2}$/, 'Please enter valid time format (hh:mm)')
		.matches(/^[^\s]*$/, 'Spaces are not allowed in the input')
		.test('valid-time', 'Invalid time value', (value) => {
			if (!value) return true;

			const [hours, minutes] = value.split(':').map(Number);

			if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
				return false;
			}

			return true;
		})
		.required('Time is required')
});

const addMissingDayValidationSchema = Yup.object().shape({
	date: Yup.date()
		.nullable()
		.required(' ')
		.test('is-date', ' ', (value) => {
			return value instanceof Date && !isNaN(value.getTime());
		}),
	inTime: Yup.string().required(' '),
	outTime: Yup.string().required(' ')
});

const wfhValidationSchema = Yup.object().shape({
	startDate: Yup.date().required('Start Date is required'),
	endDate: Yup.date().required('End Date is required'),
	reason: Yup.string().required('Reason is required'),
	isConfirm: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
});

export {
	validationSchema,
	checkOutValidationSchema,
	checkOutValidationWithOptSchema,
	checkOutwithNoTaskValidationSchema,
	checkInValidationSchema,
	addMissingDayValidationSchema,
	wfhValidationSchema
};
