import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import authOptions from '@/auth';
import {AppLinks} from "@/app/models/AppLinks";
import {
    ADMIN_BRAND_CREATE_ROUTE,
    ADMIN_BRAND_ROUTE,
    ADMIN_CATEGORY_CREATE_ROUTE,
    ADMIN_CATEGORY_ROUTE,
    ADMIN_DASHBOARD_ROUTE, ADMIN_PRO_CONDITION_CREATE_ROUTE, ADMIN_PRO_CONDITION_ROUTE,
    ADMIN_PRODUCT_CREATE_ROUTE, ADMIN_PRODUCT_REVIEW_ROUTE,
    ADMIN_PRODUCT_ROUTE, ADMIN_PROMO_REVIEW_ROUTE,
    ADMIN_PROMO_ROUTE, ADMIN_REFUND_ROUTE
} from "@/app/actions/useConstants";
import {generateRandomHash} from "@/app/actions/useHelper";

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
            {id: 2, title: 'Create Product', url: `${ADMIN_PRODUCT_CREATE_ROUTE}?session=${generateRandomHash()}`},
            {id: 3, title: 'Product Review', url: ADMIN_PRODUCT_REVIEW_ROUTE},
        ],
    },
    {
        id: 2, title: 'Deal of the Day', url: ADMIN_PROMO_ROUTE,
        dropdown: [
            {id: 1, title: 'All Deals', url: `${ADMIN_PROMO_ROUTE}?session=${generateRandomHash()}`},
            {id: 3, title: 'Deal Review', url: ADMIN_PROMO_REVIEW_ROUTE},
        ],
    },
    {
        id: 4, title: 'Categories', url: ADMIN_CATEGORY_ROUTE,
        dropdown: [
            {id: 1, title: 'Category List', url: ADMIN_CATEGORY_ROUTE},
            {id: 2, title: 'Create Category', url: ADMIN_CATEGORY_CREATE_ROUTE},
        ],
    },

    {
        id: 3, title: 'Brands', url: ADMIN_BRAND_ROUTE,
        dropdown: [
            {id: 1, title: 'Brand List', url: ADMIN_BRAND_ROUTE},
            {id: 2, title: 'Create Brand', url: ADMIN_BRAND_CREATE_ROUTE},
        ],
    },

    {
        id: 3, title: 'Conditions', url: ADMIN_PRO_CONDITION_ROUTE,
        dropdown: [
            {id: 1, title: 'Condition List', url: ADMIN_PRO_CONDITION_ROUTE},
            {id: 2, title: 'Create Condition', url: ADMIN_PRO_CONDITION_CREATE_ROUTE},
        ],
    },
    {
        id: 6, title: 'Refund', url: ADMIN_REFUND_ROUTE,
        dropdown: [
            {id: 1, title: 'Refund List', url: ADMIN_REFUND_ROUTE},
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

    // console.log('Session-steve:', session?.user.access_token);

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
