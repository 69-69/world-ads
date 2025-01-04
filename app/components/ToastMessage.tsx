// app/components/ToastMessage.tsx
//
import Typography from '@mui/material/Typography';

const ToastMessage = ({message, type}: { message: string; type?: string; }) => {
    return message ? (
        <Typography key={message} color={type || 'error'} variant="body2" sx={{my: 2, textAlign: "center"}}>
            {message}
        </Typography>
    ) : null;
};

export default ToastMessage;
