import React from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

// Action type that can be a string or a function
type ActionInterface = string | ((formData: FormData) => void | Promise<void>) | undefined;

// Define valid values for the ButtonProps
interface ButtonProps {
    text: string;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    variant?: 'text' | 'outlined' | 'contained';
    sx?: object;
    onSubmit: ActionInterface;
}

const getIcon = (label: string) => {
    return label.toLowerCase().endsWith('google') ? <GoogleIcon sx={{mr: 1}}/> : <GitHubIcon sx={{mr: 1}}/>;
};


const SocialAuthButton = ({
                              size = 'medium',
                              color = 'primary',
                              variant = 'outlined',
                              sx,
                              onSubmit,
                              text
                          }: ButtonProps) => {
    return (
        <form onSubmit={onSubmit instanceof Function ? (e) => {
            e.preventDefault();
            onSubmit(new FormData(e.target as HTMLFormElement));
        } : undefined}>
            <Button variant={variant} fullWidth size={size} color={color} type="submit"
                    sx={{...sx}}>
                {!text.toLowerCase().endsWith('out') && getIcon(text)}
                {text}
            </Button>
        </form>
    );
};

// Component usage
const GoogleSignInButton = (props: Omit<ButtonProps, ''>) => (
    <SocialAuthButton {...props} />
);

// Component usage
const GitHubSignInButton = (props: Omit<ButtonProps, ''>) => (
    <SocialAuthButton {...props} />
);

// Component usage: Omit<ButtonProps, 'text'> removes the 'text' property from the ButtonProps type
const SignOutButton = (props: Omit<ButtonProps, 'text'>) => (
    <SocialAuthButton {...props} text="Sign Out"/>
);

export {GoogleSignInButton, GitHubSignInButton, SignOutButton};

/*
<GoogleSignInButton size="medium" color="primary" variant="contained" onSubmit={handleSignIn} />
<SignOutButton size="medium" color="secondary" variant="outlined" onSubmit={handleSignOut} />
*/
