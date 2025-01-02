// app/components/NotificationButton.tsx
//
import {IconButton, Badge} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationButton = ({count}: { count: number }) => {
    return (
        <IconButton size="large" aria-label={`show ${count} new notifications`} color="inherit">
            <Badge badgeContent={count} color="error">
                <NotificationsIcon/>
            </Badge>
        </IconButton>
    );
}

export default NotificationButton;