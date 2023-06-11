// const mongoose = require("mongoose");
// const { Schema, model } = mongoose;

// const cartSchema = new Schema(
//   {
//     customerId: {
//       type: Schema.Types.ObjectId,
//       ref: "Customer",
//       required: true,
//     },
//     products: [
//       {
//         productId: {
//           type: Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: { type: Number, required: true },
//       }
//     ]
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// cartSchema.virtual("total").get(function () {
//   return (this.price * this.quantity * (100 - this.discount)) / 100;
// });

// cartSchema.virtual("customer", {
//   ref: "Customer",
//   localField: "customerId",
//   foreignField: "_id",
//   justOne: true,
// });

// cartSchema.virtual("product", {
//   ref: "Product",
//   localField: "products.productId",
//   foreignField: "_id",
//   justOne: true,
// });

// // Virtuals in console.log()
// cartSchema.set("toObject", { virtuals: true });
// // Virtuals in JSON
// cartSchema.set("toJSON", { virtuals: true });


// const Cart = model("Cart", cartSchema);
// module.exports = Cart;

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cartDetailSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, require: true, min: 0 },
  },
  {
    versionKey: false,
  },
);

// Virtual with Populate
cartDetailSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
});

// Virtuals in console.log()
cartDetailSchema.set('toObject', { virtuals: true });
// Virtuals in JSON
cartDetailSchema.set('toJSON', { virtuals: true });

// ------------------------------------------------------------------------------------------------

const cartSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },

    // Array
    products: [cartDetailSchema],
  },
  {
    versionKey: false,
  },
);

// Virtual with Populate
cartSchema.virtual('customer', {
  ref: 'Customer',
  localField: 'customerId',
  foreignField: '_id',
  justOne: true,
});

// Virtuals in console.log()
cartSchema.set('toObject', { virtuals: true });
// Virtuals in JSON
cartSchema.set('toJSON', { virtuals: true });

const Cart = model('Cart', cartSchema);
module.exports = Cart;