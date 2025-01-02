import React from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from "@/app/components/Footer";

const Layout = ({children}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main>
            <Navbar/>
            {children}
            <Footer/>
        </main>
    );
}

export default Layout
