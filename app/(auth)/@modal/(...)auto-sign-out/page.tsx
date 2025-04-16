import {useRouter, usePathname } from "next/navigation";
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

    // Calculate minutes and seconds
    const minutes = Math.floor(remainingTime / 60000); // Convert milliseconds to minutes
    const seconds = Math.floor((remainingTime % 60000) / 1000); // Convert the remainder into seconds

    // Format the time to always show two digits for minutes and seconds
    const time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const currentUrl = usePathname(); // The current path
    if (currentUrl.includes(SIGNIN_ROUTE)) {
        return null; // Don't show the modal if on the sign-in page
    }
    const handleRedirect = async () => {
        await handleAutoSignOut();
        handleClose(); // Close the modal
        router.push(SIGNIN_ROUTE);
    };

    return (
        <AlertDialog
            open={open}
            handleClose={handleRedirect}
            handleAction={handleRedirect}
            title='Session Expired'
            content={`Your session has expired. Please sign in again to continue: ${time} minutes.`}
            firstLabel="Sign in again"
            secLabel="Done"
        />
    );
};

export default SessionTimeoutModal;
