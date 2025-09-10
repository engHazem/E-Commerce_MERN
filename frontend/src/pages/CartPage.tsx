import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, totalAmount, updateItemInCart, removeItemFromcart, clearCart } = useCart();

  const navigate = useNavigate();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return handleRemoveItem(productId);
    updateItemInCart(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItemFromcart(productId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  }

  const renderCartItems = () => {
    return <Box>
    {cartItems.map((item) => (
      <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #ccc' }} key={item.productId}>
        <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center', gap: 2 }}>
          <img src={item.productImage} alt="product image" width={150} />
          <Box>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body1">{item.quantity} x {item.unitPrice} EGP</Typography>
            <Button onClick={() => handleRemoveItem(item.productId)}><DeleteIcon /> Remove</Button>
          </Box>
        </Box>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
          <Button disabled color="primary" >{item.quantity}</Button>
          <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
        </ButtonGroup>
      </Box>
    ))}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
      <Typography variant="h4">Total Amount: {totalAmount}</Typography>
    <Button onClick={handleCheckout}><PaymentIcon/> Go To Checkout</Button>
    </Box>
  </Box>
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">My Cart</Typography>
        <Button onClick={() => clearCart()}><DeleteIcon />Clear Cart</Button>
      </Box>
      {
        cartItems.length ?
        renderCartItems()
          : <Typography variant="h6">Your cart is empty</Typography>
      }
    </Container>
  );
}

export default CartPage;
