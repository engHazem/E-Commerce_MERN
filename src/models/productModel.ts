import mongoose, { Schema , Document } from "mongoose";

export interface IProduct extends Document {
    title: string;
    stock: number;
    price: number;
    image: string;
}

export const ProductSchema: Schema = new Schema<IProduct>({
    title: { type: String, required: true },
    stock: { type: Number, required: true ,default:0},
    price: { type: Number, required: true },
    image: { type: String, required: true }
}
);

const productModel = mongoose.model<IProduct>("Product", ProductSchema);
export default productModel;

