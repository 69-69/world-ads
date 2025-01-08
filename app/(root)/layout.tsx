import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import {auth} from '@/auth';

interface LayoutProps {
    children: React.ReactNode;
    // userSession: { user?: unknown } | undefined;
}

const Layout: React.FC<LayoutProps> = async ({children}) => {
    const session = await auth();

    return (
        <main>
            <Navbar user={session && session?.user}/>
            {children}
            <Footer/>
        </main>
    );
};

export default Layout;

/* export async function getServerSideProps() {
    const session = await auth(); // Wait for the session asynchronously
    // If no session, set to undefined or { user: undefined } as per your design
    const userSession = session ? {user: session.user} : undefined;

    return {
        props: {
            userSession, // Pass user session as a prop to the Layout component
        },
    };
} */
