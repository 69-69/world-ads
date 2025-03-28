import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {SIGNIN_ROUTE} from "@/app/hooks/useConstants";
import {UserSession} from "@/app/models/UserSession";
import {handleAutoSignOut} from "@/app/hooks/useAutoSignOut";

interface sessionStatusInter {
    userSession: UserSession | null;
    timeoutDuration?: number;
}

const useSessionTimeout = ({userSession, timeoutDuration = 60 * 60 * 1000}: sessionStatusInter) => {
    const router = useRouter();
    const [timeRemaining, setTimeRemaining] = useState(timeoutDuration);

    useEffect(() => {
        if (!userSession || !userSession.expires) return; // Ensure there's a valid session and expiry

        const expiry = new Date(userSession.expires).getTime(); // Get expiry timestamp
        if (isNaN(expiry)) return; // Check if expiry is a valid timestamp
        // console.log('expiry', expiry);

        const timer = setInterval(() => {
            const currentTime = Date.now(); // Get the current time
            const remainingTime = expiry - currentTime; // Calculate remaining time until session expires

            if (remainingTime <= 0) {
                clearInterval(timer); // Stop the timer when session expires
                handleAutoSignOut(); // Call the server-side action to clear the cookies
                router.push(SIGNIN_ROUTE); // Redirect to sign-in page
                return;
            }

            setTimeRemaining(remainingTime); // Update the remaining time
        }, 1000); // Update every second

        // Cleanup function to clear the timer when the component unmounts or dependencies change
        return () => clearInterval(timer);
    }, [router, userSession, timeoutDuration]);

    return timeRemaining;
};

export default useSessionTimeout;
