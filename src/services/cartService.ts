import cartModel, { ICart } from "../models/cartModel";
import productModel from "../models/productModel";

interface createCartForUser {
    userId: string;
}

const createCartForUser = async ({userId}: createCartForUser) => {
    
    const cart = await cartModel.create({ userId });
    await cart.save();
    return cart;
    
  
}

interface getActiveCartForUser {
    userId: string;
    
}

export const getActiveCartForUser = async ({userId,
}:getActiveCartForUser )  => {
    
        let cart = await cartModel.findOne({ userId, status: 'active' });
        if (!cart) {
            const newcart = await createCartForUser({userId});
        }
        return cart;
    
}

interface addItemToCartParams {
    userId: string;
    productId: any;
    quantity: number;
}

export const addItemToCart = async ({userId, productId, quantity}: addItemToCartParams) => {
    try {
        const cart  = await getActiveCartForUser({userId});
        const existsInCart = cart?.items.find((item) => item.product.toString() === productId);
        if (existsInCart) {
            existsInCart.quantity += quantity;
            cart!.totalAmount += existsInCart.unitprice * quantity;
            const updatedCart = await cart?.save();
            return { data:updatedCart , statuscode: 200};
        } 
        const product = await productModel.findById(productId);
        if (!product) {
            return { data : "Product not found" , statuscode: 404};
        }
        if(product.stock < quantity){
            return { data : "Insufficient stock" , statuscode: 400};
        }
        cart?.items.push({ product: productId, unitprice: product.price , quantity });
        cart!.totalAmount += product.price * quantity;
        const updatedCart = await cart?.save();
        return { data:updatedCart , statuscode: 200};
    } catch (error) {
        return { data:error , statuscode: 400};
    }
}

interface updateItemInCartParams {
    userId: string;
    productId: any;
    quantity: number;
}

export const updateItemInCart= async ({userId, productId, quantity}: updateItemInCartParams) => {
    try {
        const cart  = await getActiveCartForUser({userId});
        const existsInCart = cart?.items.find((item) => item.product.toString() === productId);
        if (!existsInCart) {
            return { data : "Item not found in cart" , statuscode: 404};
        } 
        const product = await productModel.findById(productId);
        if (!product) {
            return { data : "Product not found" , statuscode: 404};
        }
        if(product.stock < quantity){
            return { data : "Insufficient stock" , statuscode: 400};
        }
        // Recalculate total amount
        const otherCartItems = cart?.items.filter((item) => item.product.toString() !== productId);
        
        let total = otherCartItems?.reduce((acc, item) => acc + item.unitprice * item.quantity, 0) || 0;
        existsInCart.quantity = quantity;

        total += existsInCart.unitprice * quantity;
        cart!.totalAmount = total;
        const updatedCart = await cart?.save();
        return { data:updatedCart , statuscode: 200};
    } catch (error) {
        return { data:error , statuscode: 400};
    }
}