import * as yup from 'yup';

const schema = yup.object().shape({

    // TODO: Add validation for the following fields

    street_no: yup.string().required({streetNo: 'StreetNo is required'}),
    city: yup.string().required({City: 'City is required'}),
    postal_code: yup.string().required({PostalCode: 'PostalCode is required'}),
    country: yup.string().required({Country: 'Country is required'}),
    email: yup.string().required({Email: 'Email is required'}),
    given_name: yup.string().required({GivenName: 'GivenName is required'}),
    month: yup.number().integer().required({Month: 'Month is required'}),
    year: yup.number().integer().required({Year: 'Year is required'}),
    card_number: yup.number().integer().required({CardNumber: 'CardNumber is required'}),
    // cvc: yup.number().integer().required({SecurityCode: 'CVC is required'}),
    //terms: yup.string().required({Terms: 'Expiry is required'}),

});

export default schema;