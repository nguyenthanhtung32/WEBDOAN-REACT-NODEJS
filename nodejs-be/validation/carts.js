// const yup = require('yup');
// const ObjectId = require('mongodb').ObjectId;

// const validateSchema = (schema) => async (req, res, next) => {
//     try {
//         await schema.validate({
//             body: req.body,
//             query: req.query,
//             params: req.params,
//         });
//         return next();
//     } catch (err) {
//         return res.status(400).json({ type: err.name, message: err.message });
//     }
// };

// const getCartSchema = yup.object({
//     query: yup.object({
//         customerId: yup.string().required().test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
//             if (!value) return true;
//             return ObjectId.isValid(value);
//         }),
//         products: [{
//             productId: yup.string().required().test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
//                 if (!value) return true;
//                 return ObjectId.isValid(value);
//             }),
//             quantity: yup.number().required().min(0),
//         }]
//     })
// });

// module.exports = {
//     validateSchema,
//     getCartSchema,
// }

const yup = require('yup');
const ObjectId = require('mongodb').ObjectId;

module.exports = {

    getDetailSchema: yup.object({
        params: yup.object({
            id: yup.string().test('validationID', 'ID sai định dạng', (value) => {
                return ObjectId.isValid(value);
            }),
        }),
    }),

    removeSchema: yup.object({
        params: yup.object({
            customerId: yup.string().test('validationID', 'ID sai định dạng', (value) => {
                return ObjectId.isValid(value);
            }),
            productId: yup.string().test('validationID', 'ID sai định dạng', (value) => {
                return ObjectId.isValid(value);
            }),
        }),
    }),

    createSchema: yup.object({
        body: yup.object({
            customerId: yup
                .string()
                .required()
                .test('validationCustomerID', 'ID sai định dạng', (value) => {
                    return ObjectId.isValid(value);
                }),

            productId: yup
                .string()
                .required()
                .test('validationProductID', 'ID sai định dạng', (value) => {
                    return ObjectId.isValid(value);
                }),

            quantity: yup.number().required().min(0),
        }),
    }),
};