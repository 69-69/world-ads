// app/(root)/verify-contact/page.tsx
//
import React from 'react';
import VerifyContactForm from '@/app/components/auth/VerifyContactForm';
import Container from "@mui/material/Container";
import useVerifyContact from "@/app/hooks/useVerifyContact";
import {DEFAULT_POST_ADS_REDIRECT} from "@/app/hooks/useConstants";

const VerifyContactPage = () => {

    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <VerifyContactForm
                title="Verify Contacts"
                buttonText="Verify"
                fields={[
                    {name: 'email_code', label: 'Email Verification Code'},
                    {name: 'phone_code', label: 'Mobile Verification Code'},
                ]}
                redirectTo={DEFAULT_POST_ADS_REDIRECT}
                onSubmit={useVerifyContact}
            />
        </Container>
    );
};

export default VerifyContactPage;
