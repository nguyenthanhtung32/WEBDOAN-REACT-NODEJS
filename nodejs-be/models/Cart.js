const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartDetailSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, min: 0, max: 75, default: 0 },
    img: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Virtual with Populate
cartDetailSchema.virtual("product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

// Virtuals in console.log()
cartDetailSchema.set("toObject", { virtuals: true });
// Virtuals in JSON
cartDetailSchema.set("toJSON", { virtuals: true });

// ------------------------------------------------------------------------------------------------

const cartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    // Array
    products: [
      {
        product: cartDetailSchema,
        quantity: { type: Number },
      },
    ],
  },
  {
    versionKey: false,
  }
);

// Virtual with Populate
cartSchema.virtual("customer", {
  ref: "Customer",
  localField: "customerId",
  foreignField: "_id",
  justOne: true,
});

// Virtuals in console.log()
cartSchema.set("toObject", { virtuals: true });
// Virtuals in JSON
cartSchema.set("toJSON", { virtuals: true });

const Cart = model("Cart", cartSchema);
module.exports = Cart;
