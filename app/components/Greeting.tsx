import {Typography} from "@mui/material";

const Greeting = ({username}:{username?: string}) => {
    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth(); // 0-indexed: January is 0
    const date = now.getDate();

    let greeting = '';

    const dailyGreetings = () => {
        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }
    }

// Time-based greeting
    dailyGreetings();

    const seasonalGreeting = () => {
        if (month === 0 && date === 1) {
            greeting = 'Happy New Year!';
        } else if (month === 11 && date === 25) {
            greeting = 'Merry Christmas!';
        } else if (month === 10 && date === 31) {
            greeting = 'Happy Halloween!';
        }
    };

    // Date-based greetings
    seasonalGreeting();

    return (<Typography variant="h6" color="primary">{greeting}, {username || 'User'}</Typography>);
};

export default Greeting;