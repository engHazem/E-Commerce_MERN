import mongoose,{Document ,ObjectId, Schema} from "mongoose";


export interface IOrderItem {
    productTitle: string;
    prductImage: string;
    unitprice:number;
    quantity: number;
}

export interface IOrder extends Document{
    orderItems: IOrderItem[];
    total: number;
    address: string;
    userId: ObjectId | string;
}
const OrderItemSchema: Schema = new Schema<IOrderItem>({
    productTitle: { type: String, required: true },
    prductImage: { type: String, required: true },
    unitprice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const OrderSchema: Schema = new Schema<IOrder>({
    orderItems: [OrderItemSchema],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId,ref :"User", required: true }
   
}
);

const orderModel = mongoose.model<IOrder>("Order", OrderSchema);
export default orderModel;
