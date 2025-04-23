'use client';

import VerifyContactForm from '@/app/components/auth/VerifyContactForm';
import Container from "@mui/material/Container";
import {useVerifyContact} from "@/app/actions/auth/useVerifyContact";
import {ADMIN_DASHBOARD_ROUTE} from "@/app/actions/useConstants";


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
                redirectTo={ADMIN_DASHBOARD_ROUTE}
                onSubmit={useVerifyContact}
            />
        </Container>
    );
};

export default VerifyContactPage;
