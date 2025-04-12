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
                   sx={{width: '100%', py: 0, mx: 10,bgcolor: 'background.paper'}}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SessionStatusSnackbar
