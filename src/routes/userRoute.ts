import express from "express";
import { loginUser, registerUser } from "../services/userService";

const router = express.Router();

// User register route
router.post('/register', async (request, response) => {
  try {
    const {firstName,lastName,email,password} = request.body;
    const {statuscode,data} = await registerUser({firstName,lastName,email,password});
    response.status(statuscode).send(data);  
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
    response.status(statuscode).send(data);
   }
    catch(error){
      response.status(500).send('Internal server error');
    }
}
);


export default router;