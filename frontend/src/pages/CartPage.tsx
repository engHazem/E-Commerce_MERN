import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constans/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

function CartPage() {
  const [error, setError] = useState("");
  const {cartItems,totalAmount} = useCart();
  const { token } = useAuth();


 
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
