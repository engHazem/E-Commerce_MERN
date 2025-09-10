import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constans/baseUrl";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const {token } = useAuth();
    const [cartItems, setCartItem] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState("");
    const addToCart = async (productId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/cart/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ productId, quantity: 1 }),
            })
            if (!response.ok) {
                return setError("Failed to add item to cart");
            }
            const cart = await response.json();
            if(!cart) {
                return setError("Failed to fetch cart data");
                
            }
            const cartItemsMapped=cart.items.map(({product,quantity}:{product:any ;quantity:number }) => ({
                productId: product._id,
                title : product.title,
                productImage: product.image,
                quantity,
                unitPrice: product.price,
            }));
            setCartItem ([...cartItemsMapped]);
            setTotalAmount(cart.TotalAmount);
        } catch (error) {
            return setError("disconnected from server");
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
