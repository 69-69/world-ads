// app/components/ToastMessage.tsx
//
import Typography from '@mui/material/Typography';

const ToastMessage = ({message, type, sx}: { message: string; type?: string; sx?: object; }) => {
    return message ? (
        <Typography key={message} color={type || 'error'} variant="body2" sx={{my: 2, textAlign: "center", ...sx}}>
            {message}
        </Typography>
    ) : null;
};

export default ToastMessage;
