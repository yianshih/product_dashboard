const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productOptionSchema = new mongoose.Schema(
  {
    ProductId: {
      type: ObjectId,
      ref: "Product",
    },
    Name: {
      type: String,
      required: "ProductOption name is required",
      text: true,
    },
    Description: {
      type: String,
      required: "ProductOption description is required",
      text: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductOption", productOptionSchema);
