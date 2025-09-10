import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";


function MyOrdersPage() {
  const {getMyOrders,myOrders} = useAuth();

  useEffect(() => {
    
    getMyOrders();
  }, []);

  console.log(myOrders);
  return (
<Container sx={{ mt: 2 ,flexDirection:"column",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <Typography variant="h3">My Orders</Typography>
    {
      myOrders.map(({total,address,orderItems})=>(
        <Box sx={{border:"1px solid gray",p:2,m:2,width:"100%"}}>
        <Typography  variant="h5"> - Total Amount: {total} EGP <br /> - Address: {address} <br /> items: {orderItems.length}</Typography>
        </Box>
      ))
    }
</Container>
  );
}


export default MyOrdersPage;