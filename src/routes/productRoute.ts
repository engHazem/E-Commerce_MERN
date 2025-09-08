import express from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get('/', async(request, response) => {
    const {data,statuscode} = await getAllProducts();
    response.status(statuscode || 500).send(data);
}
);

export default router;