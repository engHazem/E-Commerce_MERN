import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


function OrderSuccessPage() {
    const navigator = useNavigate();
  return (
<Container sx={{ mt: 2 ,flexDirection:"column",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <CheckCircleOutline sx={{color:"green",fontSize:"80px"} }/>
    <Typography variant="h3">Order Success</Typography>
    <Typography variant="h5">Your order has been placed successfully!</Typography>
    <Button variant="contained" sx={{mt:2} } onClick={()=>navigator('/')}>Go to Home</Button>
</Container>
  );
}


export default OrderSuccessPage;