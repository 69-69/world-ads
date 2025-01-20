import React from "react";
import {IconButton, Badge} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";


const MailButton = ({count}: { count: number }) => {

    const handleClick = () => {
    }

    return (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleClick}>
            <Badge badgeContent={count} color="error">
                <MailIcon/>
            </Badge>
        </IconButton>
    );
}

export default MailButton;