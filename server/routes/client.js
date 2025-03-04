import express from "express";
import {getProducts, getCustomers} from '../controlllers/client.js';
const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
export default router;
