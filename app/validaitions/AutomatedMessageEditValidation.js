import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    message: yup.string().required({message: 'message is required'}).min(3, {name: 'Name must be at least 3 characters'}).max(30, {name: 'Name cannot exceed 30 characters'}),
    trigger: yup.string().required({trigger: 'trigger is required'}),


});

export default schema;
