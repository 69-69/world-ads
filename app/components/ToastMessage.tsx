import Typography from '@mui/material/Typography';
import Link from "next/link";

const ToastMessage = ({message, type, sx, href}: { message: string; type?: string; sx?: object; href?: string; }) => {
    return message ? (
        <Typography key={message} color={type || 'error'} variant="body2" sx={{my: 2, textAlign: "center", ...sx}}>
            {href ? (
                <Link href={href} target="_blank" rel="noopener noreferrer">
                    {message}
                </Link>
            ) : (
                message
            )}
        </Typography>
    ) : null;
};

export default ToastMessage;
