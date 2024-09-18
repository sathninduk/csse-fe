import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    email: yup.string().email({email: 'Invalid email format'}).required({email: 'Email is required'}),
    password: yup.string().required({password: 'Password is required'})
});

export default schema;