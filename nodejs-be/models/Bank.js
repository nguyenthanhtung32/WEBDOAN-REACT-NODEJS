const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bankSchema = new Schema(
  {
    name: { type: String, required: true },
    code: String,
    img: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Bank = model("Bank", bankSchema);

module.exports = Bank;
