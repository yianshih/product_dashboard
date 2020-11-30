const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: "Product name is required",
      text: true,
    },
    Description: {
      type: String,
      required: "Product description is required",
      text: true,
    },
    Price: {
      type: Number,
      required: "Product Price is required",
    },
    DeliveryPrice: {
      type: Number,
      required: "Product DeliveryPrice is required",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
