import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type alertInterface = {
    open: boolean;
    handleClose: () => void;
    title?: string;
    content: string;
    firstLabel: string;
    secLabel: string;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
};
export default function AlertDialog({
                                        open,
                                        handleClose,
                                        title,
                                        content,
                                        firstLabel,
                                        secLabel,
                                        maxWidth
                                    }: alertInterface) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={maxWidth || "sm"}
        >
            {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
            <DialogContent dividers>
                <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{firstLabel}</Button>
                <Button onClick={handleClose} autoFocus>
                    {secLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
