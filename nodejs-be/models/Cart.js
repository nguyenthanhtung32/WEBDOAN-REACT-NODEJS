const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const cartSchema = new Schema(
  {

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0, default: 0 },
        discount: { type: Number, min: 0, max: 75, default: 0 },
        stock: { type: Number, min: 0, default: 0 },
        description: { type: String, required: true },
        img: { type: String, required: true },
        quantity: { type: Number, required: true },
      }
    ],
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

cartSchema.plugin(mongooseLeanVirtuals);

const Cart = model("Cart", cartSchema);
module.exports = Cart;
