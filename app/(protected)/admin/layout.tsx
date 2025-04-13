import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import {authOptions} from '@/auth';
import {AppLinks} from "@/app/models/AppLinks";
import {ADMIN_DASHBOARD_ROUTE, ADMIN_PRODUCT_ROUTE, ADMIN_PROMO_ROUTE} from "@/app/hooks/useConstants";

interface LayoutProps {
    children: React.ReactNode;
    // userSession: { user?: unknown } | undefined;
}

const SidebarMenu: AppLinks[] = [
    {id: 1, title: 'Dashboard', url: ADMIN_DASHBOARD_ROUTE},
    {
        id: 2, title: 'Products', url: ADMIN_PRODUCT_ROUTE,
        dropdown: [
            {id: 1, title: 'Product List', url: ADMIN_PRODUCT_ROUTE},
            {id: 2, title: 'Create Product', url: ADMIN_PRODUCT_ROUTE+'/create'},
            {id: 3, title: 'Product Review', url: ADMIN_PRODUCT_ROUTE+'/review'},
        ],
    },
    {
        id: 2, title: 'Promo', url: ADMIN_PROMO_ROUTE,
        dropdown: [
            {id: 1, title: 'Promo List', url: ADMIN_PROMO_ROUTE},
            {id: 3, title: 'Promo Review', url: ADMIN_PROMO_ROUTE+'/review'},
        ],
    },
    {
        id: 4, title: 'Categories', url: '/categories',
        dropdown: [
            {id: 1, title: 'Category List', url: '/category-list'},
            {id: 2, title: 'Create Category', url: '/create-category'},
        ],
    },

    {
        id: 3, title: 'Brands', url: '/brands',
        dropdown: [
            {id: 1, title: 'Brand List', url: '/brand-list'},
            {id: 2, title: 'Create Brand', url: '/create-brand'},
        ],
    },
    {
        id: 6, title: 'Refund', url: '/refund',
        dropdown: [
            {id: 1, title: 'Refund List', url: '/refund-list'},
        ]
    },

    {id: 7, title: 'Customers', url: '/customers'},
    {
        id: 8, title: 'Orders', url: '/orders',
        dropdown: [
            {id: 1, title: 'Order List', url: '/order-list'},
        ]
    },
    {id: 5, title: 'Settings', url: '/settings'},

];

const Layout: React.FC<LayoutProps> = async ({children}) => {
    const session = await authOptions.auth();

    return (
        <main>
            <Navbar userSession={session && session} sideMenuLinks={SidebarMenu}/>
            <section style={{
                display: 'flex',
                justifyContent: 'center',
                minHeight: '100vh',
                margin: '70px auto',
            }}>
                {children}
            </section>
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
