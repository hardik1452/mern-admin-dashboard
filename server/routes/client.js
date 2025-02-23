import express from "express";
import {getProducts} from '../controlllers/client.js';

const router = express.Router();
router.get("/products", getProducts);
export default router;
