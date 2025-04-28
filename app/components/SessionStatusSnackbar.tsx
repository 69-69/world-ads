'use client';
import {useEffect, useState} from "react";
import StatusSnackbar from "@/app/components/StatusSnackbar";
import StatusAlert from "@/app/components/StatusAlert";


interface StatusSnackbarProps {
    isOpen: boolean;
    message: string;
}

const SessionStatusSnackbar = ({isOpen, message}: StatusSnackbarProps) => {
    const [open, setOpen] = useState(true);

    // Open or close the Snackbar based on `isSignIn`
    useEffect(() => setOpen(isOpen), [isOpen]);

    const handleClose = () => setOpen(false);
    return (
        <StatusSnackbar
            open={open}
            onClose={handleClose}
        >
            {
                StatusAlert({
                    message: message,
                    onClose: handleClose,
                    severity: isOpen ? "success" : "error",
                })
            }
        </StatusSnackbar>
    );
};

export default SessionStatusSnackbar


/*
import * as React from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";
import {useEffect} from "react";


interface StatusSnackbarProps {
    isSignIn: boolean;
    message: string;
}

const SessionStatusSnackbar: React.FC<StatusSnackbarProps> = ({isSignIn, message}) => {
    const [open, setOpen] = React.useState(true);

    // Whenever the `isSignIn` prop changes, set the local `open` state accordingly
    useEffect(() => setOpen(isSignIn), [isSignIn]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {

        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            sx={{width: '100%', mt: 5.2,}}
        >
            <Alert onClose={() => setOpen(false)}
                   severity={isSignIn ? "success" : "error"}
                   variant="filled"
                   sx={{width: '100%', py: 0, mx: 10,bgcolor: 'background.card'}}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SessionStatusSnackbar
*/
