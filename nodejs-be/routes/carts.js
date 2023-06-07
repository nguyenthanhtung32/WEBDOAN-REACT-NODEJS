const yup = require("yup");
const express = require("express");
const router = express.Router();
const { Cart, Customer, Product } = require("../models");
const ObjectId = require("mongodb").ObjectId;
const { validateSchema, getCartSchema, } = require('../validation/cart');

// Methods: POST / PATCH / GET / DELETE / PUT
// Get all
router.get("/", validateSchema(getCartSchema), async (req, res, next) => {
  try {
    const { id } = req.params;

    let found = await Cart.findOne({ customerId: id });

    if (found) {
      return res.send({ ok: true, result: found });
    }

    return res.send({ ok: false, message: "Object not found" });
  } catch (err) {
    res.status(500).json({ ok: false, err });
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
      let found = await Cart.findById(id);
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

router.post("/", async function (req, res, next) {
  try {
    const { customerId, productId, quantity } = req.body;

    const getCustomer = Customer.findById(customerId);
    const getProduct = Product.findById(productId);

    const [customer, product] = await Promise.all([
      getCustomer,
      getProduct,
    ]);

    const errors = [];
    if (!customer || customer.isDelete)
      errors.push('Khách hàng không tồn tại');
    if (!product || product.isDelete)
      errors.push('Sản phảm không tồn tại');

    if (product && quantity > product.stock)
      errors.push('Sản phảm vượt quá số lượng cho phép');

    if (errors.length > 0) {
      return res.status(404).json({
        code: 404,
        message: 'Lỗi',
        errors,
      });
    }

    const cart = await Cart.findOne({ customerId })

    const result = {};

    if (cart) { // GIỏ hàng đã tồn tại
      newProductCart = cart.products.map((item) => {
        if (productId === item.productId) {
          const nextQuantity = quantity + item.quantity;

          if (nextQuantity > product.stock) {
            return res.send({
              code: 404,
              message: `Số lượng sản phẩm ${product._id} không khả dụng`,
            });
          } else {
            item.quantity = nextQuantity;
          }
        }

        return item;
      })

      result = await Cart.findOneAndUpdate(cart._id, {
        customerId,
        products: newProductCart,
      });
    } else { // Chưa có giỏ hàng
      const newItem = new Cart({
        customerId,
        products: [
          {
            productId,
            quantity,
          }
        ]
      });

      result = await newItem.save();
    }

    return res.send({
      code: 200,
      message: 'Thêm sản phẩm thành công',
      payload: result,
    });
  } catch (err) {
    return res.status(500).json({ code: 500, error: err });
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
        let found = await Cart.findByIdAndDelete(id);
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
    await Cart.findByIdAndUpdate(id, patchData);

    res.send({ ok: true, message: "Updated" });
  } catch (error) {
    res.status(500).send({ ok: false, error });
  }
});

module.exports = router;
