import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    //name: yup.string().required({name: 'Name is required'}).min(3, {name: 'Name must be at least 3 characters'}).max(30, {name: 'Name cannot exceed 30 characters'}),
    description: yup.string().max(200, {description: 'Description cannot exceed 200 characters'}),
    // dmessage: yup.string().max(200, {dmessage: 'Developer Message cannot exceed 200 characters'}),
    // price: yup.number().required({price: 'Price is required'}).min(1, {price: 'Price must be at least 1$'}).max(50, {price: 'Name cannot exceed 50$'}),

});

export default schema;