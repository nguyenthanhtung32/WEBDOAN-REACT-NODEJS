// const yup = require("yup");
// const express = require("express");
// const router = express.Router();

// const { default: mongoose } = require("mongoose");
// const { Product, Customer, Cart } = require("../models");

// const { CONNECTION_STRING } = require("../constants/dbSettings");
// const {
//     validateSchema,
//     getDetailSchema,
//     removeSchema,
//     createSchema,
//   } = require('../validation/carts');
// mongoose.connect(CONNECTION_STRING);
// mongoose.set("strictQuery", false);



// // Thêm sản phẩm vào giỏ hàng
// router.post("/",validateSchema(createSchema),async (req, res, next) => {
//     try {
//         const { customerId, productId, quantity } = req.body;
  
//         const getCustomer = Customer.findById(customerId);
//         const getProduct = Product.findById(productId);
  
//         const [customer, foundProduct] = await Promise.all([
//           getCustomer,
//           getProduct,
//         ]);
//         console.log('getProduct',getProduct);
//         const errors = [];
//         if (!customer || customer.isDelete)
//           errors.push('Khách hàng không tồn tại');
//         if (!foundProduct || foundProduct.isDelete)
//           errors.push('Sản phẩm không tồn tại');
  
//         if (foundProduct && quantity > foundProduct.stock)
//           errors.push('Sản phảm vượt quá số lượng cho phép');
  
//         if (errors.length > 0) {
//           return res.status(404).json({
//             code: 404,
//             message: 'Lỗi',
//             errors,
//           });
//         }
  
//         const cart = await Cart.findOne({ customerId })
  
//         const result = {};
  
//         if (cart) { // GIỏ hàng đã tồn tại
//           newProductCart = cart.products.map((item) => {
//             if (productId === item.productId) {
//               const nextQuantity = quantity + item.quantity;
  
//               if (nextQuantity > foundProduct.stock) {
//                 return res.send({
//                   code: 404,
//                   message: `Số lượng sản phẩm ${product._id} không khả dụng`,
//                 });
//               } else {
//                 item.quantity = nextQuantity;
//               }
//             }
    
//             return item;
//           })
  
//           result = await Cart.findOneAndUpdate(cart._id, {
//             customerId,
//             products: newProductCart,
//           });
//         } else { // Chưa có giỏ hàng
//           const newItem = new Cart({
//             customerId,
//             products: [
//               {
//                 productId,
//                 quantity,
//               }
//             ]
//           });
    
//           result = await newItem.save();
//         }
  
//         return res.send({
//           code: 200,
//           message: 'Thêm sản phẩm thành công',
//           payload: result,
//         });
//       } catch (err) {
//         console.log('««««« err »»»»»', err);
//         return res.status(500).json({ code: 500, error: err });
//       }
// });

// // Lấy danh sách sản phẩm trong giỏ hàng
// router.get("/"/* ,validateSchema(getDetailSchema) */, async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log('id',id)

//     let found = await Cart.find({ customerId: id });

//     if (found) {
//       return res.send({ code: 200, payload: found });
//     }

//     return res.status(410).send({ code: 404, message: "Không tìm thấy" });
//   } catch (err) {
//     res.status(404).json({
//       message: "Get detail fail!!",
//       payload: err,
//     });
//   }
// });

// // Xóa sản phẩm khỏi giỏ hàng
// router.delete("/:id",validateSchema(removeSchema), async (req, res) => {
//   try {
//     const { customerId, productId } = req.body;

//     let cart = await Cart.findOne({ customerId });

//     if (!cart) {
//       return res.status(404).json({
//         code: 404,
//         message: "Giỏ hàng không tồn tại",
//       });
//     }

//     if (
//       cart.products.length === 1 &&
//       cart.products[0].productId === productId
//     ) {
//       await Cart.deleteOne({ _id: cart._id });
//     } else {
//       await Cart.findOneAndUpdate(cart._id, {
//         customerId,
//         products: cart.products.filter((item) => item.productId !== productId),
//       });
//     }

//     return res.send({
//       code: 200,
//       message: "Xóa thành công",
//     });
//   } catch (err) {
//     return res.status(500).json({ code: 500, error: err });
//   }
// });

// module.exports = router;


const yup = require("yup");
const express = require("express");
const router = express.Router();
const { Cart } = require("../models");
const ObjectId = require("mongodb").ObjectId;

// Methods: POST / PATCH / GET / DELETE / PUT
// Get all
router.get("/", async (req, res, next) => {
  try {
    let results = await Cart.find().populate("products").lean({ virtuals: true });

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

router.post("/", function (req, res, next) {
  // Validate
  const validationSchema = yup.object({
    body: yup.object({
      customerId: yup.string().required()
        .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
          return ObjectId.isValid(value);
        }),
      products: [{
        productId: yup.string().required()
          .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
            return ObjectId.isValid(value);
          }),
          quantity: yup.number().positive().min(1).required(),
      }],
    }),
  });
  validationSchema
    .validate({ body: req.body }, { abortEarly: false })
    .then(async () => {
      const data = req.body;
      console.log('req.body',req.body)
      let newItem = new Cart(data);
      await newItem.save();
      res.send({ ok: true, message: "Created", result: newItem });
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