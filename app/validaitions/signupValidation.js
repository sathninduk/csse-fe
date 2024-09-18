import * as yup from 'yup';

const form1 = yup.object().shape({
    // TODO: Add validation for the following fields
    firstName: yup.string().required({firstName: 'First Name is required'}).min(3, {firstName: 'First Name must be at least 3 characters'}).max(30, {firstName: 'First Name cannot exceed 30 characters'}),
    lastName: yup.string().required({lastName: 'Last Name is required'}).min(3, {lastName: 'Last Name must be at least 3 characters'}).max(30, {lastName: 'Last Name cannot exceed 30 characters'}),
});

const form2 = yup.object().shape({
    //email and phone number should be have at least 10 characters
    email: yup.string().email({email: 'Invalid email format'}).required({email: 'Email is required'}),
    phone: yup.string().required({phone: 'Phone Number is required'}).min(10, {phone: 'Phone Number must be at least 10 characters'}),
});

//dob and gender

const form3 = yup.object().shape({
    dateOfBirth: yup.string().required({dateOfBirth: 'Date of Birth is required'}),
    gender: yup.string ().required({gender:'Select one'})
});

const form4 = yup.object().shape({
    password: yup.string().required({password: 'Password is required'}).min(8, {password: 'Password must be at least 8 characters'}),

});

export { form1, form2,form3, form4 };