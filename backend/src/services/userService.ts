import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import orderModel from "../models/orderModel";

interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const registerUser = async ({firstName,lastName,email,password}: RegisterParams) => {
    try {
    // Check if user already exists
    const findUser = await userModel.findOne({ email });
    if (findUser) {
        return { data : "User already exists" , statuscode: 400};
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new userModel({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    return {data:generateJWT({firstName,lastName,email}) , statuscode: 201};

} catch (error) {
    return { data:error , statuscode: 400  };
}   
}

interface LoginParams {
    email: string;
    password: string;
}

export const loginUser = async ({email,password}: LoginParams) => {
    try {
    // Check if user exists
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
        return { data : "User not found" , statuscode: 404};
    }
    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
        return { data : "Invalid password" , statuscode: 401};
    }
    return { data:generateJWT({email,firstName:findUser.firstName,lastName:findUser.lastName}) , statuscode: 200};
} catch (error) {
    return { data:error , statuscode: 400};
}
}

interface GetMyOrdersParams {
    userId: string;
   
}
export const getMyOrders = async ({userId}: GetMyOrdersParams) => {
    try {
        const orders= await orderModel.find({userId});
        return { data:orders , statuscode: 200};

    }
    catch (error) {
        return { data:error , statuscode: 400};
    }

}

const generateJWT = (data:any) => {
return jwt.sign(data, process.env.JWT_SECRET ||"", { expiresIn: '24h' } );
}


