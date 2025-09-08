import express from "express";
import { loginUser, registerUser } from "../services/userService";

const router = express.Router();

// User register route
router.post('/register', async (request, response) => {
    const {firstName,lastName,email,password} = request.body;
    const {statuscode,data} = await registerUser({firstName,lastName,email,password});
    response.status(statuscode || 500).send(data);  
}
);

// User login route
router.post('/login', async (request, response) => {
    const {email,password} = request.body;
    const {data,statuscode} = await loginUser({email,password});
    response.status(statuscode || 500).send(data);
}
);


export default router;