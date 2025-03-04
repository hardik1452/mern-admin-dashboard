import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productwithStat = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: products._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productwithStat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customer = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
