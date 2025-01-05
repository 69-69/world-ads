import React from 'react';
import {confirmSignup} from '@/app/api/auth/backend';
import VerifyContactForm from '@/app/components/VerifyContactForm';
import Container from "@mui/material/Container";
import {useRouter} from 'next/navigation';

const VerifyContactPage = () => {
    const navigate = useRouter();

    // Form submission handler
    const handleVerification = async (formData: FormData) => {
        const verificationCode = formData.get('verificationCode');

        console.log('Form Data:', formData);

        if (!verificationCode) {
            throw new Error('Verification code is required');
        }

        try {

            const response = await confirmSignup(verificationCode.toString());
            console.log('Sign up successful', response);

            if (response.status === 200) {
                console.log('SignUp was successful:', response.data);

                navigate.push('/post');
            }
        } catch (error) {
            console.log('Error:', error);
            throw new Error(error instanceof Error ? error.message : 'Something went wrong');
        }
    };


    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
            <VerifyContactForm
                title="Verify Contacts"
                buttonText="Verify"
                fields={[
                    {name: 'email', label: 'Email Verification Code'},
                    {name: 'phone', label: 'Mobile Verification Code'},
                ]}
                onSubmit={handleVerification}
            />
        </Container>
    );
};

export default VerifyContactPage;
