// app/(root)/verify-contact/page.tsx
//
import React from 'react';
import VerifyContactForm from '@/app/components/VerifyContactForm';
import Container from "@mui/material/Container";
import useVerifyContact from "@/app/hooks/useVerifyContact";

const VerifyContactPage = () => {

    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <VerifyContactForm
                title="Verify Contacts"
                buttonText="Verify"
                fields={[
                    {name: 'email', label: 'Email Verification Code'},
                    {name: 'phone', label: 'Mobile Verification Code'},
                ]}
                onSubmit={useVerifyContact}
            />
        </Container>
    );
};

export default VerifyContactPage;
