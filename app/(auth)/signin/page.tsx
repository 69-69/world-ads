import {Suspense} from 'react';
import Container from "@mui/material/Container";
import SignInForm from "@/app/components/auth/SignInForm";
import ShowLogoutStatus from "@/app/(auth)/signin/showLogoutStatus";

const SignInPage = () => (
    <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
        <Suspense fallback={<>Loading...</>}>
            <ShowLogoutStatus/>
        </Suspense>
        <SignInForm/>
    </Container>
);

export default SignInPage;
