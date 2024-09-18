
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string()
        .test('capitalized-and-limited-words', {name: 'Template Name should start with a capital letter and have no more than 5 words'}, value => {
            if (!value) return true; // allow empty values to be handled by required validation
            return /^[A-Z][\w\s]*(\s+\w+){0,4}$/.test(value);
        })
        .required('Template Name is required').min(3, {name: 'Name must be at least 3 characters'}).max(30, {name: 'Name cannot exceed 30 characters'}),
    description: yup.string()
        .required({description: 'Template Description is required'}).min(10, {description: 'Description must be at least 10 characters'}).max(300, {description: 'Description cannot exceed 300 characters'}),
    category: yup.string().required({category: 'Category is required'}),
    dmessage: yup.string()
        .required({dmessage:'Developer Message is required'}).min(10, {dmessage: 'Message must be at least 10 characters'}).max(300, {dmessage: 'Message cannot exceed 300 characters'}),
    price: yup.number()
        .typeError({price:'Price must be a number'})
        .max(100, {price:'Price should not exceed $100'})
        .min(0, {price:'Price should be at least $0'})
});

export default schema;
