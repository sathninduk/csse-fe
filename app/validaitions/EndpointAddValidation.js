import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    path: yup.string().required({path: 'Path is required'}).matches(/^\//, 'Path must start with a forward slash ("/")'),
    ratelimit: yup.string().required({ratelimit: 'RateLimit is required'})
});

export default schema;
