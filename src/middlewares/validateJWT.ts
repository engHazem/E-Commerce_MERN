import express, {  Response ,NextFunction} from "express";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";


const validateJWT = (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
 const authorizationHeader = req.get('authorization');
 if (!authorizationHeader) {
    return res.status(403).send('Authorization header missing');
 }
 const token = authorizationHeader.split(' ')[1];
 if (!token) {
    return res.status(403).send('Invalid or missing token');
 }
 jwt.verify(token, 'Pzz08iuY3dlIriNLGL29aY49JjoSMaJ0', async (err, payload) => {
   if(err) {
      return res.status(403).send('Invalid token');
   }

   if (!payload) {
      return res.status(403).send('Invalid token payload');
   }

   const userPayload = payload as { email: string,
    firstName: string,
    lastName: string
    };

    try{
   const user = await userModel.findOne({ email: userPayload.email });
    if (!user) {
        return res.status(403).send('User not found');
    }
    req.user = user;
    next();
    }
    catch(error){
      return res.status(500).send('Internal server error');
    }
 });
}

export default validateJWT;