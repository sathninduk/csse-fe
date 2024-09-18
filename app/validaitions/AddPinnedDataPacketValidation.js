import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    folder: yup.string().required({folder: 'Folder is required'}).min(3, {folder: 'Folder must be at least 3 characters'}).max(30, {folder: 'Folder cannot exceed 30 characters'}),
    name: yup.string().required({name: 'Name is required'}),
    data: yup.string().required({data: 'Data is required'})

});

export default schema;