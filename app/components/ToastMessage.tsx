import Typography from '@mui/material/Typography';
import Link from "next/link";

const ToastMessage = (param: { message: string; type?: string; sx?: object; href?: string; }) => {
    return param.message ? (
        <Typography key={param.message} color={param.type || 'error'} variant="body2" sx={{my: 2, textAlign: "center", ...(param.sx)}}>
            {param.href ? (
                <Link href={param.href} target="_blank" rel="noopener noreferrer">
                    {param.message} {'->>'}
                </Link>
            ) : (
                param.message
            )}
        </Typography>
    ) : null;
};

export default ToastMessage;
