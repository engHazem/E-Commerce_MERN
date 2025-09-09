import e from "express";
import cartModel, { ICart, ICartItem } from "../models/cartModel";
import productModel from "../models/productModel";
import orderModel, { IOrderItem } from "../models/orderModel";

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
        
        let total = calculateTotal(otherCartItems || []);
        existsInCart.quantity = quantity;

        total += existsInCart.unitprice * quantity;
        cart!.totalAmount = total;
        const updatedCart = await cart?.save();
        return { data:updatedCart , statuscode: 200};
    } catch (error) {
        return { data:error , statuscode: 400};
    }
}

interface DeleteItemInCartParams {
    userId: string;
    productId: any;
}
export const DeleteItemInCart= async ({userId, productId}: DeleteItemInCartParams) => {
    try {
        const cart  = await getActiveCartForUser({userId});
        const existsInCart = cart?.items.find((item) => item.product.toString() === productId);
        if (!existsInCart) {
            return { data : "Item not found in cart" , statuscode: 404};
        } 
        // Recalculate total amount
        const otherCartItems = cart?.items.filter((item) => item.product.toString() !== productId);
        let total = calculateTotal(otherCartItems || []);
        cart!.totalAmount = total;
        cart!.items = otherCartItems || [];
        const updatedCart = await cart?.save();
        return { data:updatedCart , statuscode: 200};
    } catch (error) {
        return { data:error , statuscode: 400};
    }
}

interface DeleteAllItemsInCartParams {
    userId: string;
}
export const DeleteAllItemsInCart= async ({userId}: DeleteAllItemsInCartParams) => {
    try {
        const cart  = await getActiveCartForUser({userId});
        cart!.items = [];
        cart!.totalAmount = 0;
        const updatedCart = await cart?.save();
        return { data:updatedCart , statuscode: 200};
    } catch (error) {
        return { data:error , statuscode: 400};
    }
}


const calculateTotal = (cart: ICartItem[]) => {
    return cart?.reduce((acc, item) => acc + item.unitprice * item.quantity, 0) || 0;;
}


interface checkoutParams {
    userId: string;
    address: string;
}

export const checkout = async ({userId,address}: checkoutParams) => {   
    try {
        if (!address || address.trim() === ""){
            return { data : "Address is required" , statuscode: 400};
        }
        const cart  = await getActiveCartForUser({userId});
        if(!cart || cart.items.length === 0){
            return { data : "Cart is empty" , statuscode: 400};
        }
        
        const orderItems:IOrderItem[] = [];
        
        for(const item of cart.items){
            const product = await productModel.findById(item.product);
            if(!product){
                return { data : `Product ${item.product} not found` , statuscode: 404};
            }
            const orderItem:IOrderItem=
            {
                productTitle: product.title,
                prductImage: product.image,
                unitprice: item.unitprice,
                quantity: item.quantity
            };
            orderItems.push(orderItem);
        }
        const order = await orderModel.create({
            orderItems,
            total: cart.totalAmount,
            address,
            userId
        });
        await order.save();
        cart.status = 'completed';
        await cart.save();
        return { data:order , statuscode: 200};
    } catch (error) {
        return { data:error , statuscode: 400};
    }
}
