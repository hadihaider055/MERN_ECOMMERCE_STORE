const Product = require("../Models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { product_id, title, price, description, images, category } =
      req.body;

    const newProduct = new Product({
      product_id,
      title,
      price,
      description,
      images,
      category,
    });

    await newProduct.save();
    return res.status(201).json({
      message: "Product created successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      await Product.findByIdAndDelete({ _id: id });
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Please provide a valid Product ID" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const product = await Product.findById({ _id: id });
      return res.status(200).json({ product });
    } else {
      return res
        .status(400)
        .json({ message: "Please provide a valid Product ID" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, title, price, description, images, category } =
      req.body;

    if (!id)
      return res
        .status(400)
        .json({ message: "Please provide a valid Product ID" });

    const product = await Product.findByIdAndUpdate(
      { _id: id },
      {
        product_id,
        title,
        price,
        description,
        images,
        category,
      }
    );
    await product.save();
    return res.status(200).json({ message: "Product updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
};
