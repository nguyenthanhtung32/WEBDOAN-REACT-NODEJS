const yup = require('yup');
const express = require('express');
const router = express.Router();
const { Supplier } = require('../models');
const ObjectId = require('mongodb').ObjectId;
const {
  validateSchema,
  getSupplierIdSchema,
  getSupplierBodySchema
} = require("../validation/suppliers");

// Methods: POST / PATCH / GET / DELETE / PUT
// Get all
router.get('/', async (req, res, next) => {
  try {
    let results = await Supplier.find();
    res.send(results);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/:id", validateSchema(getSupplierIdSchema), async (req, res, next) => {
  // Validate
  try {
    const { id } = req.params.id;

    let found = await Supplier.findById(id);

    if (found) {
      return res.send({ ok: true, result: found });
    }

    return res.send({ ok: false, message: "Object not found" });
  } catch (err) {
    res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
});

// Create new data
router.post("/", validateSchema(getSupplierBodySchema), async function (req, res, next) {
  try {
    const newItem = req.body;
    const data = new Supplier(newItem);
    let result = await data.save();
    return res.send({ oke: true, message: "Created", result });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
);

// ------------------------------------------------------------------------------------------------
// Delete data
router.delete("/:id", validateSchema(getSupplierIdSchema), async function (req, res, next) {
  try {
    const itemId = req.params.id;

    let found = await Supplier.findByIdAndDelete(itemId);

    if (found) {
      return res.send({ message: "Deleted successfully!!", result: found });
    }
    return res.status(410).send({ oke: false, message: "Object not found" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
);

router.patch('/:id', validateSchema(getSupplierIdSchema), async function (req, res, next) {
  try {
    const id = req.params.id;
    const patchData = req.body;
    await Supplier.findByIdAndUpdate(id, patchData);

    res.send({ ok: true, message: 'Updated' });
  } catch (error) {
    res.status(500).send({ ok: false, error });
  }
});

module.exports = router;
