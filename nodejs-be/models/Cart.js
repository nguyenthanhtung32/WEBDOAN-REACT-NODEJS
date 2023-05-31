const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartDetailSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, min: 0, max: 75, default: 0 },
    stock: { type: Number, min: 0, default: 0 },
    description: { type: String, required: true },
    img: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Virtual with Populate
cartDetailSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

cartDetailSchema.virtual("supplier", {
  ref: "Supplier",
  localField: "supplierId",
  foreignField: "_id",
  justOne: true,
});

// Virtuals in console.log()
cartDetailSchema.set("toObject", { virtuals: true });
// Virtuals in JSON
cartDetailSchema.set("toJSON", { virtuals: true });

const cartSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    img: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    cartDetails: [cartDetailSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

cartSchema.virtual("total").get(function () {
  return (this.price * this.quantity * (100 - this.discount)) / 100;
});

cartSchema.virtual("product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

// Virtuals in console.log()
cartSchema.set("toObject", { virtuals: true });
// Virtuals in JSON
cartSchema.set("toJSON", { virtuals: true });

cartSchema.pre("save", async function (next) {
  const product = await this.model("Product").findById(this.productId);
  if (product.stock < this.quantity) {
    const error = new Error(
      `Quantity (${this.quantity}) exceeds stock for product ${product.name}`
    );
    error.name = "ValidationError";
    next(error);
  } else {
    next();
  }
});

const Cart = model("Cart", cartSchema);
module.exports = Cart;
