'use client';
import React, {Suspense} from 'react';
import Container from "@mui/material/Container";
import SignInForm from "@/app/components/auth/SignInForm";
import SessionStatusSnackbar from "@/app/components/SessionStatusSnackbar";
import {useSearchParams} from 'next/navigation';

const SignInPage = () => {
    const searchParams = useSearchParams();

    const getLogout = searchParams.get('logout') || '';
    const isLoggingOut = getLogout === 'true';

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
                {/* Show snackbar only if the user is logging out */}
                {
                    isLoggingOut && <SessionStatusSnackbar
                        isOpen={isLoggingOut}
                        message="You've been logged out"/>
                }
                <SignInForm/>
            </Container>
        </Suspense>
    );
};

export default SignInPage;
