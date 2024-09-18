import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    name: yup.string().required({name: 'Name is required'}).min(3, {name: 'Name must be at least 3 characters'}).max(30, {name: 'Name cannot exceed 30 characters'}),
    phone: yup.string().required({phone: 'Phone is required'}).min(10, {phone: 'Phone must be at least 10 characters'}),
    email: yup.string().required({email: 'Email ID is required'}).email({email: 'Email must be a valid email'}),
    password: yup.string().required({password: 'Password is required'}).min(8, {password: 'Password must be at least 8 characters'}),

});

export default schema;
