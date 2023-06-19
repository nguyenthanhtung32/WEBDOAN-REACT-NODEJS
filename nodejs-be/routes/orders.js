const yup = require("yup");
const express = require("express");
const router = express.Router();
const { Order } = require("../models/index");
const ObjectId = require("mongodb").ObjectId;

// Methods: POST / PATCH / GET / DELETE / PUT
// Get all
router.get("/", async (req, res, next) => {
  try {
    let results = await Order.find()
      .populate("customer")
      .populate("employee")
      .lean({ virtuals: true });

    res.json(results);
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});

router.get("/:id", async function (req, res, next) {
  // Validate
  const validationSchema = yup.object().shape({
    params: yup.object({
      id: yup
        .string()
        .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
          return ObjectId.isValid(value);
        }),
    }),
  });

  validationSchema
    .validate({ params: req.params }, { abortEarly: false })
    .then(async () => {
      const id = req.params.id;

      let found = await Order.findById(id);

      if (found) {
        return res.send({ ok: true, result: found });
      }

      return res.send({ ok: false, message: "Object not found" });
    })
    .catch((err) => {
      return res.status(400).json({
        type: err.name,
        errors: err.errors,
        message: err.message,
        provider: "yup",
      });
    });
});
// router.post("/", function (req, res, next) {
//   // Validate
//   const validationSchema = yup.object({
//     body: yup.object({
//       orderDetails: yup.array().required(),
//       createdDate: yup.date().required(),
//       shippedDate: yup.date().required(),
//       paymentType: yup.string().max(20).required(),
//       shippingAddress: yup.string().max(500).required(),
//       status: yup.string().max(50).required(),
//       description: yup.string().required(),
//       customerId: yup
//         .string()
//         .required()
//         .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
//           return ObjectId.isValid(value);
//         }),
//     //   employeeId: yup
//     //     .string()
//     //     .required()
//     //     .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
//     //       return ObjectId.isValid(value);
//     //     }),
//     }),
//   });

//   validationSchema
//     .validate({ body: req.body }, { abortEarly: false })
//     .then(async () => {
//       const data = req.body;
//       let newItem = new Order(data);
//       await newItem.save();
//       res.send({ ok: true, message: "Created", result: newItem });
//     })
//     .catch((err) => {
//       return res.status(400).json({
//         type: err.name,
//         errors: err.errors,
//         message: err.message,
//         provider: "yup",
//       });
//     });
// });

router.post("/", function (req, res, next) {
  try {
    const data = req.body;
    console.log("req.body", req.body);

    const newItem = new Order(data);
    newItem
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.delete("/:id", function (req, res, next) {
  const validationSchema = yup.object().shape({
    params: yup.object({
      id: yup
        .string()
        .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
          return ObjectId.isValid(value);
        }),
    }),
  });

  validationSchema
    .validate({ params: req.params }, { abortEarly: false })
    .then(async () => {
      try {
        const id = req.params.id;

        let found = await Order.findByIdAndDelete(id);

        if (found) {
          return res.send({ ok: true, result: found });
        }

        return res.status(410).send({ ok: false, message: "Object not found" });
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        type: err.name,
        errors: err.errors,
        message: err.message,
        provider: "yup",
      });
    });
});

router.patch("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const patchData = req.body;
    await Order.findByIdAndUpdate(id, patchData);

    res.send({ ok: true, message: "Updated" });
  } catch (error) {
    res.status(500).send({ ok: false, error });
  }
});

module.exports = router;