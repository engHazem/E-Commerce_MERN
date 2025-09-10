import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constans/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

function CartPage() {
  const [error, setError] = useState("");
  const {cartItems,totalAmount} = useCart();
  const { token } = useAuth();


  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       if (!token) {
  //         return setError("User is not authenticated");
  //       }
  //       const response = await fetch(`${BASE_URL}/cart`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (!response.ok) {
  //         return setError("Failed to fetch cart");
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       return setError("An error occurred while fetching the cart");
  //     }
  //   };

  //   fetchCart();
  // }, [token]);

 
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.map((item) => (
        <Typography key={item.productId} variant="body1">
          {item.title} - {item.quantity} x {item.unitPrice} EGP
        </Typography>
      ))}
    </Container>
  );
}

export default CartPage;
