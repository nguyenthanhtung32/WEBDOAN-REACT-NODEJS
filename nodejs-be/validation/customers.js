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

const getCustomerSchema = yup.object({
  body: yup.object({
    firstName : yup.string().required(),
    lastName : yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber : yup.string(),
    address : yup.string().required(),
    birthday : yup.string().required(),
  }),
  params: yup.object({}),
});

module.exports = {
  validateSchema,
  getCustomerSchema,
};