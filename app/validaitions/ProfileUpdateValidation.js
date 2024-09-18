import * as yup from 'yup';

const ProfileValidation = yup.object().shape({
    firstName: yup
        .string()
        .required({ firstName: 'First name is required' })
        .matches(/^[A-Za-z\u00C0-\u00FF]+(?:\s[A-Za-z\u00C0-\u00FF]+)*$/, { message: { firstName: 'Can only Contains Letters' }, excludeEmptyString: true }),

    lastName: yup
        .string()
        .required({ lastName: 'Last name is required' })
        .matches(/^[A-Za-z\u00C0-\u00FF]+(?:\s[A-Za-z\u00C0-\u00FF]+)*$/, { message: { lastName: 'Can only Contains Letters' }, excludeEmptyString: true }),

    email: yup
        .string()
        .email({email:'Must be a valid email'})
        .required({ email: 'Email is required' }),
    phoneNumber: yup
        .string()
        .required({ phoneNumber: 'Phone number is required' })
        .matches(/^\+?[1-9]\d{1,14}$/, { message: { phoneNumber: 'Invalid Format' }, excludeEmptyString: true })
});

export default ProfileValidation;