const yup = require("yup");
const ObjectId = require("mongodb").ObjectId;

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

const getDetailSchema = yup.object({
  params: yup.object({
    id: yup.string().test("validationID", "ID sai định dạng", (value) => {
      return ObjectId.isValid(value);
    }),
  }),
});

const removeSchema = yup.object({
  body: yup.object({
    customerId: yup
      .string()
      .test("validationID", "ID sai định dạng", (value) => {
        if (!value) return true;
        return ObjectId.isValid(value);
      }),
    productId: yup
      .string()
      .test("validationID", "ID sai định dạng", (value) => {
        if (!value) return true;
        return ObjectId.isValid(value);
      }),
  }),
});

const createSchema = yup.object({
  body: yup.object({
    body: yup.object({
      customerId: yup
        .string()
        // .required()
        .test("validationCustomerID", "ID sai định dạng", (value) => {
            if (!value) return true;
            return ObjectId.isValid(value);
        }),

      productId: yup
        .string()
        // .required()
        .test("validationProductID", "ID sai định dạng", (value) => {
            if (!value) return true;
            return ObjectId.isValid(value);
        }),

      quantity: yup.number().min(0),
    }),
  }),
});

module.exports = {
  validateSchema,
  getDetailSchema,
  createSchema,
  removeSchema,
};
