import { createContext , useContext } from "react";
import type { CartItem } from "../../types/CartItem";

interface CartContextType {
    cartItems:CartItem[];
    totalAmount: number;
    addToCart: (productId:string) => void;
    updateItemInCart: (productId:string,quantity:number) => void;
    removeItemFromcart: (productId:string) => void;
    clearCart: () => void;

}
export const CartContext = createContext<CartContextType>({cartItems: [], totalAmount: 0, addToCart: () => {}, updateItemInCart: () => {} , removeItemFromcart: () => {} , clearCart: () => {} });

export const useCart = () => {
    return useContext(CartContext);
}