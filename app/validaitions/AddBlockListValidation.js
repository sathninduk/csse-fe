import * as yup from 'yup';

const schema = yup.object().shape({
    url: yup
        .string()
        .url({url: 'Must be a valid URL'})
        .required({url: 'Website Url is required'}),
});

export default schema;