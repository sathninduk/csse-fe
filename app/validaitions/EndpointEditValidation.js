import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    ratelimit: yup.string().required({ratelimit: 'RateLimit is required'})
});

export default schema;
