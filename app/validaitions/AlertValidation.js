import * as yup from 'yup';

const alertValidation = yup.object().shape({

    //Threshold can only have numbers and required number should be less than 10000 and can only be postive values
    Threshold: yup.number().required({ Threshold: 'Threshold is required' }).positive({ Threshold: 'Threshold must be a positive number' }).max(10000, { Threshold: 'Threshold must be less than 10000' }),

    //Subject can only have 100 letters can be letters only
    Subject: yup.string().required({ Subject: 'Subject is required' }).max(100, { Subject: 'Subject must be less than 100 characters' }),
    
    //Content can only have 250 letters can be letters only
    Content: yup.string().required({ Content: 'Content is required' }).max(250, { Content: 'Content must be less than 250 characters' }),

    //AlertOn can only have Immediate or Before
    AlertOn: yup.string().required({ AlertOn: 'AlertOn is required' }),

});

export default alertValidation;
