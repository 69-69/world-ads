'use client';
// app/components/SignInForm.tsx
//
export default function AuthForm() {

    return (
        <div>
            <h1 style={{ margin: "0 auto", textAlign: 'center' }}>
                Sign In Page
            </h1>
        </div>
    );
}


/* 'use client';
import React from 'react';
import { useSignIn } from '@/app/hooks/useSignIn';

// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

const SignInPage = () => {
  const { handleSignIn } = useSignIn();

  return (
    <Container maxWidth='sm' disableGutters sx={{ flexGrow: 1, mt: 10 }}>
      <AuthForm
        title="Sign In"
        buttonText="Sign In"
        isSignUp={false}
        auxButton={[{ link: '/signup', title: 'Sign Up' }]}
        fields={[
          { name: 'email_address', label: 'Email' },
          { name: 'pass_word', label: 'Password', type: 'password' },
        ]}
        onSubmit={handleSignIn}
      />
    </Container>
  );
};

export default SignInPage; */