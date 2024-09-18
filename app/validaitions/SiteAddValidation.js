import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    name: yup.string().required({ name: 'Name is required' }).min(3, { name: 'Name must be at least 3 characters' }).max(30, { name: 'Name cannot exceed 30 characters' }),
    domain: yup.string().required({ domain: 'Repository is required' }),
    description: yup.string().required({ description: 'Description is required' }).min(10, { description: 'Description must be at least 10 characters' }).max(100, { description: 'Description cannot exceed 100 characters' }),
    category: yup.string().required({ category: 'Category is required' })

});

export default schema;
