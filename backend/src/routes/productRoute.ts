import express from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get('/', async(request, response) => {
  try{
    const {data,statuscode} = await getAllProducts();
    response.status(statuscode).send(data);
  }
    catch(error){
      response.status(500).send('Internal server error');
    }
}
);

export default router;