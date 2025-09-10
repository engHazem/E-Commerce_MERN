import express from "express";
import { getMyOrders, loginUser, registerUser } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

const router = express.Router();

// User register route
router.post('/register', async (request, response) => {
  try {
    const {firstName,lastName,email,password} = request.body;
    const {statuscode,data} = await registerUser({firstName,lastName,email,password});
    response.status(statuscode).json(data);  
  }
    catch (error) {
        response.status(500).send('Internal server error');
    }
}
);

// User login route
router.post('/login', async (request, response) => {
   try{
    const {email,password} = request.body;
    const {data,statuscode} = await loginUser({email,password});
    response.status(statuscode).json(data);
   }
    catch(error){
      response.status(500).send('Internal server error');
    }
}
);

router.get('/my-orders',validateJWT, async (request:AuthenticatedRequest, response) => {
  try{
    const userId = request.user._id;
    const {statuscode,data} = await getMyOrders({userId});
    response.status(statuscode).send(data);
  }
    catch(error){
        response.status(500).send('Internal server error');
    }
});
export default router;