import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constans/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();


  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!token) {
          return setError("User is not authenticated");
        }
        const response = await fetch(`${BASE_URL}/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          return setError("Failed to fetch cart");
        }
        const data = await response.json();
        setCart(data);
      } catch (error) {
        return setError("An error occurred while fetching the cart");
      }
    };

    fetchCart();
  }, [token]);

  console.log({cart});
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
    </Container>
  );
}

export default CartPage;
