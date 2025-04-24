import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {UserSession} from "@/app/models/UserSession";
import {signOut} from "@/app/actions/auth/handleSignOut";

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

        const timer = setInterval(async () => {
            const currentTime = Date.now(); // Get the current time
            const remainingTime = expiry - currentTime; // Calculate remaining time until session expires

            if (remainingTime <= 0) {
                clearInterval(timer); // Stop the timer when session expires
                await signOut();
            }

            setTimeRemaining(remainingTime); // Update the remaining time
        }, 1000); // Update every second

        // Cleanup function to clear the timer when the component unmounts or dependencies change
        return () => clearInterval(timer);
    }, [router, userSession, timeoutDuration]);

    return timeRemaining;
};

export default useSessionTimeout;
