import {Button, Link, Typography} from "@mui/material";

type noItemParams = {
    route: string;
    message: string;
    label: string;
}

const NoItemFound = ({route, message, label}: noItemParams) => {
    return (
        <Typography variant="h6" gutterBottom sx={{textAlign: 'center', p: 5, justifyContent: 'center'}}>
            {message}
            <Link href={route}>
                <Button variant="outlined" size="small" fullWidth sx={{ml: 1}}>
                    {label}
                </Button>
            </Link>
        </Typography>
    );
};

export default NoItemFound;