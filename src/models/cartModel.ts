import e from "express";
import mongoose,{Document ,ObjectId, Schema} from "mongoose";
import { IProduct } from "./productModel";

const cartStatusEnum = ['active', 'completed'] ;

export interface ICartItem {
    product:IProduct;
    unitprice:number;
    quantity: number;
}

export interface ICart extends Document{
    userId: ObjectId | string;
    items: ICartItem[];
    totalAmount: number;
    status: 'active' | 'completed' ;
}

const CartItemSchema: Schema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    unitprice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const CartSchema: Schema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId,ref :"User", required: true },
    items: [CartItemSchema],
    totalAmount: { type: Number, required: true, default: 0 },
    status: { type: String, enum: cartStatusEnum, default: 'active' }
   
}
);

const cartModel = mongoose.model<ICart>("Cart", CartSchema);
export default cartModel;