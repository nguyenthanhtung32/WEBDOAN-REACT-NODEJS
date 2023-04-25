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

const getEmployeeSchema = yup.object({
  body: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string(),
    address: yup.string().required(),
    password: yup.string().min(3).max(31).required(),
    birthday: yup.string().required(),
    skip: yup.number(),
    limit: yup.number(),
  }),
  params: yup.object({}),
});

module.exports = {
  validateSchema,
  getEmployeeSchema,
};