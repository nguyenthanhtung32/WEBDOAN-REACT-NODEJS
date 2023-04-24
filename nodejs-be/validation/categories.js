const yup = require('yup');
const ObjectId = require('mongodb').ObjectId;

const validateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err) {
        return res.status(400).json({ type: err.name, message: err.message });
    }
};

const getCategoryIdSchema = yup.object({
    params: yup.object({
        id: yup.string().test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
            return ObjectId.isValid(value);
        }),
    }),
});

const getCategoryBodySchema = yup.object({
    body: yup.object({
        name: yup.string().required(),
        description: yup.string(),
    }),
});

module.exports = {
    validateSchema,
    getCategoryIdSchema,
    getCategoryBodySchema
}