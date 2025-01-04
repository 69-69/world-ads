import React from 'react';
import Container from "@mui/material/Container";
import SignInForm from "@/app/components/SignInForm";

const SignInPage = () => (
    <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
        <SignInForm/>
    </Container>
);

export default SignInPage;