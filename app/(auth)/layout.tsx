import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

interface LayoutProps {
    children: React.ReactNode;
    // userSession: { user?: unknown } | undefined;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <main>
            <Navbar userSession={null}/>
            {children}
            <Footer/>
        </main>
    );
};

export default Layout;

