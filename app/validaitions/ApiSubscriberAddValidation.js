import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields
    user_id: yup.string().required({user_id: 'UserId is required'})

});

export default schema;
