const Product = require("../models/product");

// query

const allProducts = async (parent, args) => {
  return await Product.find({}).exec();
};


const productById = async (parent, args) => {
  return await Product.findById({ _id: args.productId }).exec();
};

const productByName = async (parent, args) => {
  return await Product.find({ Name: args.productName }).exec();
};

// mutation


const productCreate = async (parent, args) => {

  // Create new Product
  let newProduct = await new Product({
    ...args.input,
  });
  
  // save product then return product data
  newProduct.save().then((product) => {
    console.log("product from server : ", product);
    return product;
  });

  return newProduct;
};

const productUpdate = async (parent, args, { req, pubsub }) => {
  // update product by id with values
  let updatedProduct = await Product.findByIdAndUpdate(
    args.input._id,
    { ...args.input },
    { new: true }
  )
    .exec()
    .then((product) => product);

  return updatedProduct;
};

const productDelete = async (parent, args) => {
  let deletedProduct = await Product.findByIdAndDelete({ _id: args.productId })
    .exec()
    .then((product) => product);

  return deletedProduct;
};

module.exports = {
  Query: {
    allProducts,
    productById,
    productByName,
  },
  Mutation: {
    productCreate,
    productUpdate,
    productDelete,
  },
};
