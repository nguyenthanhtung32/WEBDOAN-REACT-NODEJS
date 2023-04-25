const yup = require('yup');
const express = require('express');
const router = express.Router();
const { Supplier } = require('../models');
const ObjectId = require('mongodb').ObjectId;
const {
  validateSchema,
  getSupplierSchema,
  getSupplierBodySchema
} = require("../validation/suppliers");
const { getIdSchema } = require("../validation/getId");

// Methods: POST / PATCH / GET / DELETE / PUT
// Get all
router.get("/", validateSchema(getSupplierSchema), async (req, res, next) => {
    try {
      const { limit, skip } = req.query;
  
      const conditionFind = {};
  
      let results = await Supplier.find(conditionFind)
        .skip(skip)
        .limit(limit)
        .lean({ virtuals: true });
  
      const totalResults = await Supplier.countDocuments(conditionFind);
  
      res.json({
        payload: results,
        total: totalResults,
      });
  
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ ok: false, error });
    }
  });

router.get("/:id", validateSchema( getIdSchema), async (req, res, next) => {
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
});

// ------------------------------------------------------------------------------------------------
// Delete data
router.delete("/:id", validateSchema(getIdSchema), async function (req, res, next) {
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

router.patch('/:id', validateSchema(getIdSchema), async function (req, res, next) {
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
