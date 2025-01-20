import SignUpForm from "@/app/components/auth/SignUpForm";
import Container from "@mui/material/Container";

const SignUpPage = () => (
    <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
        <SignUpForm/>
    </Container>
);

export default SignUpPage;

