import { Box, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import PaidIcon from '@mui/icons-material/Paid';
import Button from '@mui/material/Button';
import { useRef } from "react";

function CheckoutPage() {
    const { cartItems, totalAmount } = useCart();

    const addressRef = useRef<HTMLInputElement | null>(null);

    const renderCartItems = () => {
        return <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} >
            {cartItems.map((item) => (
                <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #ccc', width: '100%' }} key={item.productId}>
                    <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center', gap: 2, width: '100%' }}>
                        <img src={item.productImage} alt="product image" width={150} />
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="body1">{item.quantity} x {item.unitPrice} EGP</Typography>
                            <Typography variant="body1">{item.quantity * item.unitPrice} EGP</Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
            <TextField inputRef={addressRef} fullWidth label="Shipping Address" name="address" variant="outlined" sx={{ mt: 4 }}>
            </TextField>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Typography variant="h4">Total Amount: {totalAmount}</Typography>  <Button variant="contained" size="large">
                    <PaidIcon />Pay Now
                </Button>
            </Box>
        </Box>
    }


    return (

        <Container sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Checkout</Typography>
            </Box>
            {renderCartItems()}

        </Container>


    );
}

export default CheckoutPage;
