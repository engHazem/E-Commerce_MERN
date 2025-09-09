import { Box, Container, Typography ,TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constans/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

function RegisterPage() {
    
    const firstNameRef= useRef<HTMLInputElement>(null);
    const lastNameRef= useRef<HTMLInputElement>(null);
    const emailRef= useRef<HTMLInputElement>(null);
    const passwordRef= useRef<HTMLInputElement>(null);
    const [customError, setError] = useState("");
    const {login} = useAuth();

    
    const onsubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // validate inputs
        if(!firstName||!lastName||!email||!password)
              return setError("All fields are required");

        // call register api
        const response = await fetch(`${BASE_URL}/user/register`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({firstName,lastName,email,password})
        });
        // check response
        if(!response.ok){
           setError("Unable to register user");
        }
        // get token from response
        const token = await response.json();
        if(!token)
              return setError("Unable to register user");
        login(email,token);    
    }
    return (
        <Container>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent: "center" ,alignItems: "center",mt:4}}>
            <Typography variant="h4">Register New Account</Typography>
            <Box sx={{display:"flex" ,flexDirection:"column",gap:2,mt:4}}>
            <TextField inputRef = {firstNameRef} label="First Name" name="firstName" />
            <TextField inputRef = {lastNameRef} label="Last Name" name="lastName" />
            <TextField inputRef = {emailRef} label="Email" name="email" />
            <TextField inputRef = {passwordRef} label="Password" name="password" type="password" />
            <Button variant="contained" onClick={onsubmit}>Register</Button>
            {customError&&<Typography color="red">{customError}</Typography>}
            </Box>
            </Box>
            
        </Container>
    );
}

export default RegisterPage;
