const APP_NAME = 'World Ads Center';
const APP_NAME_SHORT = 'WAC';
const HOME_ROUTE = 'http://localhost:3000';
const POLICY_ROUTE = '/terms-and-conditions';
const SIGNIN_ROUTE = '/signin';
const SIGNUP_ROUTE = '/signup';
const VERIFICATION_ROUTE = '/verify-contact';
const SETUP_STORE_ROUTE = '/setup-store';
const FORGOT_PASSWORD_ROUTE = '/forgot-password';
const RESET_PASSWORD_ROUTE = '/reset-password';
const POST_ADS_ROUTE = '/posts';
const CART_ROUTE = '/cart';
const SHOP_ROUTE = '/shop';
const CHECKOUT_ROUTE = '/checkout';
const ORDER_ROUTE = '/orders';
const CONTACT_ROUTE = '/contact';
const ABOUT_ROUTE = '/about';
const FAQ_ROUTE = '/faq';

const PROTECTED_RESOURCES_ROUTES = [
    POST_ADS_ROUTE,
    SETUP_STORE_ROUTE,
    ORDER_ROUTE,
    CHECKOUT_ROUTE,
];

const PROTECTED_AUTH_ROUTES = [
    SIGNIN_ROUTE,
    SIGNUP_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
];

const ACC_ROLE = ['buyer', 'seller'];

type LinkProps = {
    id?: number,
    title: string,
    url: string
};

const HEADER_LINKS: LinkProps[] = [
    {title: 'Home', url: HOME_ROUTE},
    {title: 'Post Ads', url: POST_ADS_ROUTE},
    {title: 'My Account', url: SIGNIN_ROUTE},
];

const FOOTER_LINKS: LinkProps[] = [
    /* Left Section - Links (First Link Group) */
    {title: 'Home', url: HOME_ROUTE},
    {title: 'About Us', url: ABOUT_ROUTE},
    {title: 'Contact Us', url: CONTACT_ROUTE},
    {title: 'Shop', url: SHOP_ROUTE},

    /* Center Section - Links (Second Link Group) */
    {title: 'My Account', url: SIGNIN_ROUTE},
    {title: 'Sign Up', url: SIGNUP_ROUTE},
    {title: 'Post Ads', url: POST_ADS_ROUTE},

    /* Right Section - Links (Third Link Group) */
    {title: 'Terms & Conditions', url: POLICY_ROUTE},
    {title: 'Privacy Policy', url: POLICY_ROUTE},
    {title: 'FAQ', url: FAQ_ROUTE},
];

const ADS_CATEGORIES = [
    {name: 'Real Estate', value: 'real-estate'},
    {name: 'Jobs', value: 'jobs'},
    {name: 'Services', value: 'services'},
    {name: 'Vehicles', value: 'vehicles'},
    {name: 'Pets', value: 'pets'},
    {name: 'Electronics', value: 'electronics'},
    {name: 'Furniture', value: 'furniture'},
    {name: 'Events', value: 'events'},
    {name: 'Community', value: 'community'},
    {name: 'Business for Sale', value: 'business-sale'},
];

const STORE_CATEGORIES = [
    {name: 'Grocery', value: 'grocery'},
    {name: 'Fashion', value: 'fashion'},
    {name: 'Electronics', value: 'electronics'},
    {name: 'Home & Kitchen', value: 'home-kitchen'},
    {name: 'Beauty & Health', value: 'beauty-health'},
    {name: 'Sports & Outdoors', value: 'sports-outdoors'},
    {name: 'Toys & Games', value: 'toys-games'},
    {name: 'Books', value: 'books'},
    {name: 'Automotive', value: 'automotive'},
    {name: 'Furniture', value: 'furniture'},
];

const SELLER_TYPE = [
    {label: 'Individual', value: 'individual', tooltip: ' Individual Seller (Person-to-Person or P2P)'},
    {label: 'Company', value: 'company', tooltip: 'Business Seller (Business-to-Consumer or B2C)'},
];

export {
    APP_NAME,
    APP_NAME_SHORT,
    ACC_ROLE,
    SELLER_TYPE,
    ADS_CATEGORIES,
    STORE_CATEGORIES,
    PROTECTED_AUTH_ROUTES,
    PROTECTED_RESOURCES_ROUTES,
    HEADER_LINKS,
    FOOTER_LINKS,
    HOME_ROUTE,
    POLICY_ROUTE,
    SHOP_ROUTE,
    SIGNIN_ROUTE,
    SIGNUP_ROUTE,
    VERIFICATION_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
    POST_ADS_ROUTE,
    CART_ROUTE,
    CHECKOUT_ROUTE,
    ORDER_ROUTE,
    ABOUT_ROUTE,
    CONTACT_ROUTE,
    FAQ_ROUTE,
    SETUP_STORE_ROUTE,
};

export type {LinkProps};