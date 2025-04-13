import {useRouter} from "next/navigation";
import {SIGNIN_ROUTE} from "@/app/hooks/useConstants";
import AlertDialog from "@/app/components/AlertDialog";
import {handleAutoSignOut} from "@/app/hooks/useAutoSignOut";

type modelInterface = {
    open: boolean,
    remainingTime: number,
    handleClose: () => void
};

const SessionTimeoutModal = ({open, remainingTime, handleClose}: modelInterface) => {
    const router = useRouter();

    const handleRedirect = () => {
        handleClose(); // Close the modal
        handleAutoSignOut();
        router.push(SIGNIN_ROUTE);
    };

    // Calculate minutes and seconds
    const minutes = Math.floor(remainingTime / 60000); // Convert milliseconds to minutes
    const seconds = Math.floor((remainingTime % 60000) / 1000); // Convert the remainder into seconds

    // Format the time to always show two digits for minutes and seconds
    const time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <AlertDialog
            open={open}
            handleClose={handleRedirect}
            handleAction={handleRedirect}
            title='Session Expired'
            content={`Your session has expired. Please sign in again to continue: ${time} minutes.`}
            firstLabel="Sign in again"
        />
    );
};

export default SessionTimeoutModal;
