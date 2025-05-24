import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type alertInterface = {
    open: boolean;
    handleClose: () => void;
    handleAction: () => void;
    title?: string;
    content: string;
    firstLabel: string;
    secLabel?: string;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
};
export default function AlertDialog(props: alertInterface) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={props.maxWidth || "sm"}
        >
            {props.title && <DialogTitle id="alert-dialog-title" align={'center'}>{props.title}</DialogTitle>}
            <DialogContent dividers>
                <DialogContentText id="alert-dialog-description">{props.content}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'space-around'}}>
                <Button variant={"contained"} size={'small'} onClick={props.handleAction}>{props.firstLabel}</Button>
                {props.secLabel && <Button variant={"outlined"} size={'small'} onClick={props.handleClose} autoFocus>{props.secLabel}</Button>}
            </DialogActions>
        </Dialog>
    );
}
