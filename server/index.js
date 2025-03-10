import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//Data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import { dataUser, dataProduct, dataProductStat, dataTransaction } from "./data/index.js";

//Configuration
dotenv.config(); //loads the environment variable
const app = express(); //loads the express object to build the web server
app.use(express.json()); //parse the incoming url in json
app.use(helmet()); //used for securing the headers of express application
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //Blocks others from loading your resources cross-origin
app.use(morgan("common")); //generates the logs of incoming requests.
app.use(bodyParser.json()); // parse the incoming requests to json, url-encoded, text or etc.
app.use(bodyParser.urlencoded({ extended: false })); //prases bodies from URL.
app.use(cors()); //prevents from unauthorize access from different domains

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

//MongoDB setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
    // ADD ONE TIME ONLY
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
    // Transaction.insertMany(dataTransaction);
  })
  .catch((error) => console.log(error));
