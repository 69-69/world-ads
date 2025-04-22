// components/common/StatusSnackbar.tsx
import React, {ReactElement} from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import {Button} from "@mui/material";

interface StatusSnackbarProps {
    message?: string;
    open: boolean;
    origin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
    onClose: () => void;
    children?: ReactElement;
    sx?: object;
}

const StatusSnackbar: React.FC<StatusSnackbarProps> = ({message, open, onClose, children, origin, sx}) => {

    const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {

        if (reason === 'clickaway') {
            return;
        }

        onClose();
    };
    if (children === undefined) {
        return <Snackbar
            anchorOrigin={origin || {vertical: 'top', horizontal: 'center'}}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message || ''}
            sx={sx || {width: '100%', mt: 5.2}}
        />;
    }
    const child = React.isValidElement(children) ? children : <div>{children}</div>;

    return (
        <Snackbar
            anchorOrigin={origin || {vertical: 'top', horizontal: 'center'}}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message || ''}
            sx={sx || {width: '100%', mt: 5.2}}
            action={
                <Button color="inherit" size="small" onClick={handleClose}>Close</Button>
            }
        >
            {React.cloneElement(child as React.ReactElement<{ elevation: number }>, {elevation: 0})}
        </Snackbar>
    );
};
export default StatusSnackbar;
