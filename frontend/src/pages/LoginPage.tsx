import { Box, Container, Typography ,TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constans/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const emailRef= useRef<HTMLInputElement>(null);
    const passwordRef= useRef<HTMLInputElement>(null);
    const [customError, setError] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();
    
    const onsubmit = async () => {

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // validate inputs
        if(!email||!password)
              return setError("All fields are required");

        // call register api
        const response = await fetch(`${BASE_URL}/user/login`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
        });
        // check response
        if(!response.ok){
           setError("Unable to login user");
        }
        // get token from response
        const token = await response.json();
        if(!token)
              return setError("Unable to login user");
        login(email,token);    
        navigate("/");
    }
    return (
        <Container>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent: "center" ,alignItems: "center",mt:4}}>
            <Typography variant="h4">Login</Typography>
            <Box sx={{display:"flex" ,flexDirection:"column",gap:2,mt:4}}>
            <TextField inputRef = {emailRef} label="Email" name="email" />
            <TextField inputRef = {passwordRef} label="Password" name="password" type="password" />
            <Button variant="contained" onClick={onsubmit}>Login</Button>
            {customError&&<Typography color="red">{customError}</Typography>}
            </Box>
            </Box>
            
        </Container>
    );
}

export default LoginPage;
