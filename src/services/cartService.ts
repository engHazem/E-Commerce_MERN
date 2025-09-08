import cartModel from "../models/cartModel";

interface createCartForUser {
    userId: string;
}

const createCartForUser = async ({userId}: createCartForUser) => {
    try{
    const cart = await cartModel.create({ userId });
    await cart.save();
    return {data:cart , statuscode: 201};
    }
    catch (error) {
        return { data:error , statuscode: 400};
    }
}

interface getActiveCartForUser {
    userId: string;
    
}

export const getActiveCartForUser= async ({userId,
}:getActiveCartForUser ) => {
    try {
        let cart = await cartModel.findOne({ userId, status: 'active' });
        if (!cart) {
            const {data,statuscode} = await createCartForUser({userId});
            return {data,statuscode};
        }
        return {data:cart , statuscode: 200};
    } catch (error) {
        return { data:error , statuscode: 400};
    }
}