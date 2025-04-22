// components/common/StatusAlert.tsx
import Alert from '@mui/material/Alert';

interface StatusAlertProps {
    severity: 'success' | 'error' | 'info' | 'warning';
    message: string;
    onClose: () => void;
}

const StatusAlert = ({severity, message, onClose}: StatusAlertProps) => (
    <Alert onClose={() => onClose()}
           severity={severity}
           variant="filled"
           sx={{width: '100%', py: 0, mx: 10, bgcolor: 'background.card'}}>
        {message}
    </Alert>
);
export default StatusAlert;
