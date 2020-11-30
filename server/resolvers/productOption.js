const Product = require("../models/product");
const ProductOption = require("../models/productOption");

// query

const productOptionById = async (parent, args) => {
  return await ProductOption.findById({ _id: args.productOptionId }).exec();
};

const productOptionsByProductId = async (parent, args) => {

  return await ProductOption.find({ ProductId: args.productId }).exec();
};

// mutation

// ProductOption mutation
const productOptionCreate = async (parent, args) => {
  let newOptionProduct = await new ProductOption({
    ...args.input,
  });

  // create new productOption then return productOption data
  newOptionProduct.save().then((productOption) => {
    console.log("product from server : ", productOption);
    return productOption;
  });

  return newOptionProduct;
};

const productOptionDelete = async (parent, args) => {
  let deletedProductOption = await ProductOption.findByIdAndDelete({
    _id: args.productOptionId,
  })
    .exec()
    .then((productOption) => productOption);

  return deletedProductOption;
};

const productOptionUpdate = async (parent, args, { req, pubsub }) => {
  let updatedProductOption = await ProductOption.findByIdAndUpdate(
    args.input._id,
    { ...args.input },
    { new: true }
  )
    .exec()
    .then((product) => product);

  return updatedProductOption;
};

module.exports = {
  Query: {
    productOptionById,
    productOptionsByProductId,
  },
  Mutation: {
    productOptionUpdate,
    productOptionDelete,
    productOptionCreate,
  },
};
