import mongoose, { Document, Schema } from 'mongoose';

// Define the User interface 
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Define the User schema
const UserSchema: Schema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true},
    password:{type: String, required: true }
}
);

// Create and export the User model
const userModel= mongoose.model<IUser>("User", UserSchema);
export default userModel;