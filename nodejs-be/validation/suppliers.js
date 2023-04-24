const yup = require("yup");
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

const getSupplierIdSchema = yup.object({
  params: yup.object({
    id: yup.string().test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
      return ObjectId.isValid(value);
    }),
  }),
});

const getSupplierBodySchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required(),
    address: yup.string().required()
  }),
});

module.exports = {
  validateSchema,
  getSupplierIdSchema,
  getSupplierBodySchema
};
