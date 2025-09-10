import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";


const CartProvider:FC<PropsWithChildren> = ({children}) => {
    const [cartItems, setcartItem] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const addToCart = (productId:string) => {
        console.log("Add to cart", productId);
    }

    
    return (
        <CartContext.Provider value={{cartItems, totalAmount, addToCart}}>
            {children}
        </CartContext.Provider>
    );
    };

export default CartProvider;