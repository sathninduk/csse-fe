import * as yup from 'yup';

const form1 = yup.object().shape({
    // TODO: Add validation for the following fields
    firstName: yup.string().required({firstName: 'First Name is required'}).min(3, {firstName: 'Name must be at least 3 characters'}).max(30, {firstName: 'Name cannot exceed 30 characters'}),
    lastName: yup.string().required({lastName: 'Last Name is required'}),
});

const form2 = yup.object().shape({
    //email and phone number should be have at least 10 characters
    email: yup.string().required({email: 'Email is required'}),
    phone: yup.string().required({phone: 'Phone Number is required'}).min(10, {phone: 'Phone Number must be at least 10 characters'}),
});

//dob and gender

const form3 = yup.object().shape({
    dateOfBirth: yup.string().required({dateOfBirth: 'Date of Birth is required'}),
    gender: yup.string ().required({gender:'Select one'})
});


export { form1, form2,form3 };