import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
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

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: {"field": "userId", "sort":"desc"} from material UI
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    console.log(page, pageSize, sort, search);
    //formatted sort should look this {userId: -1}
    const generatedSort = () => {
      if (!sort) return {};
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };
    const searchQuery = {
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    };
    const sortFormatted = generatedSort();
    const transactions = await Transaction.find(searchQuery)
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(Number(pageSize));

    const total = await Transaction.countDocuments(searchQuery);

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const data = await User.find();
    const mappedLocations = data.reduce((acc, { country }) => {
      const countryIso3 = getCountryIso3(country);
      if (!acc[countryIso3]) {
        acc[countryIso3] = 0;
      }
      acc[countryIso3]++;
      return acc;
    }, {});

    const formatedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formatedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
