'use client';
import {usePathname } from "next/navigation";
import {SIGNIN_ROUTE} from "@/app/util/constants";
import AlertDialog from "@/app/components/AlertDialog";
import {signOut} from "@/app/actions/auth/handleSignOut";
import { useEffect, useState} from "react";

type logoutModalProps = {
    params: Promise<{
        open: boolean;
        remainingTime: number;
        handleClose: () => void;
    }>
};

export default function LogoutModal({ params }: logoutModalProps ) {

    const currentUrl = usePathname(); // The current path
    const [modalData, setModalData] = useState<{
        open: boolean;
        remainingTime: number;
        handleClose: () => void;
    } | null>(null);

    // Handle the resolved data from the promise
    useEffect(() => {
        params
            .then((data) => setModalData(data))
            .catch((error) => {
                console.error('Failed to resolve params:', error);
                setModalData(null); // Handle failure case
            });
    }, [params]);

    // If modalData is not yet resolved or in an error state, return null (don't render)
    if (!modalData) return null;

    const { open, remainingTime, handleClose } = modalData;

    // Calculate minutes and seconds
    const minutes = Math.floor(remainingTime / 60000); // Convert milliseconds to minutes
    const seconds = Math.floor((remainingTime % 60000) / 1000); // Convert the remainder into seconds

    // Format the time to always show two digits for minutes and seconds
    const time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (currentUrl.includes(SIGNIN_ROUTE)) {
        return null; // Don't show the modal if on the sign-in page
    }
    const handleRedirect = async () => {
        await signOut();
        handleClose(); // Close the modal
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

