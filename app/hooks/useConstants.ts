const APP_NAME = 'World Ads Center';
const APP_NAME_SHORT = 'WAC';
const DEFAULT_HOME_REDIRECT = 'http://localhost:3000';
const DEFAULT_POLICY_REDIRECT = DEFAULT_HOME_REDIRECT + '/terms-and-conditions';
const DEFAULT_SIGNIN_REDIRECT = DEFAULT_HOME_REDIRECT + '/signin';
const DEFAULT_SIGNUP_REDIRECT = DEFAULT_HOME_REDIRECT + '/signup';
const DEFAULT_VERIFICATION_REDIRECT = DEFAULT_HOME_REDIRECT + '/verify-contact';
const DEFAULT_SETUP_STORE_REDIRECT = DEFAULT_HOME_REDIRECT + '/setup-store';
const DEFAULT_FORGOT_PASSWORD_REDIRECT = DEFAULT_HOME_REDIRECT + '/forgot-password';
const DEFAULT_RESET_PASSWORD_REDIRECT = DEFAULT_HOME_REDIRECT + '/reset-password';
const DEFAULT_POST_ADS_REDIRECT = DEFAULT_HOME_REDIRECT + '/posts';
const DEFAULT_CART_REDIRECT = DEFAULT_HOME_REDIRECT + '/cart';
const DEFAULT_SHOP_REDIRECT = DEFAULT_HOME_REDIRECT + '/shop';
const DEFAULT_CHECKOUT_REDIRECT = DEFAULT_HOME_REDIRECT + '/checkout';
const DEFAULT_ORDER_REDIRECT = DEFAULT_HOME_REDIRECT + '/orders';
const DEFAULT_CONTACT_REDIRECT = DEFAULT_HOME_REDIRECT + '/contact';
const DEFAULT_ABOUT_REDIRECT = DEFAULT_HOME_REDIRECT + '/about';
const DEFAULT_FAQ_REDIRECT = DEFAULT_HOME_REDIRECT + '/faq';

const ACC_ROLE = ['buyer','seller'];

type LinkProps = {
    id?: number,
    title: string,
    url: string
};

const PAGE_LINKS: LinkProps[] = [
    {title: 'Home', url: DEFAULT_HOME_REDIRECT},
    {title: 'Post Ads', url: DEFAULT_POST_ADS_REDIRECT},
    {title: 'My Account', url: DEFAULT_SIGNIN_REDIRECT},
];

const FOOTER_LINKS: LinkProps[] = [
    /* Left Section - Links (First Link Group) */
    {title: 'Home', url: DEFAULT_HOME_REDIRECT},
    {title: 'About Us', url: DEFAULT_ABOUT_REDIRECT},
    {title: 'Contact Us', url: DEFAULT_CONTACT_REDIRECT},
    {title: 'Shop', url: DEFAULT_SHOP_REDIRECT},

    /* Center Section - Links (Second Link Group) */
    {title: 'My Account', url: DEFAULT_SIGNIN_REDIRECT},
    {title: 'Sign Up', url: DEFAULT_SIGNUP_REDIRECT},
    {title: 'Post Ads', url: DEFAULT_POST_ADS_REDIRECT},

    /* Right Section - Links (Third Link Group) */
    {title: 'Terms & Conditions', url: DEFAULT_POLICY_REDIRECT},
    {title: 'Privacy Policy', url: DEFAULT_POLICY_REDIRECT},
    {title: 'FAQ', url: DEFAULT_FAQ_REDIRECT},
];

const adsCategories = [
    { name: 'Real Estate', value: 'real-estate' },
    { name: 'Jobs', value: 'jobs' },
    { name: 'Services', value: 'services' },
    { name: 'Vehicles', value: 'vehicles' },
    { name: 'Pets', value: 'pets' },
    { name: 'Electronics', value: 'electronics' },
    { name: 'Furniture', value: 'furniture' },
    { name: 'Events', value: 'events' },
    { name: 'Community', value: 'community' },
    { name: 'Business for Sale', value: 'business-sale' },
];

const storeCategories = [
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

const sellerTypes = [
    {label: 'Individual', value: 'individual', tooltip: ' Individual Seller (Person-to-Person or P2P)'},
    {label: 'Company', value: 'company', tooltip: 'Business Seller (Business-to-Consumer or B2C)'},
];

export {
    APP_NAME,
    APP_NAME_SHORT,
    ACC_ROLE,
    sellerTypes,
    adsCategories,
    storeCategories,
    PAGE_LINKS,
    FOOTER_LINKS,
    DEFAULT_HOME_REDIRECT,
    DEFAULT_POLICY_REDIRECT,
    DEFAULT_SHOP_REDIRECT,
    DEFAULT_SIGNIN_REDIRECT,
    DEFAULT_SIGNUP_REDIRECT,
    DEFAULT_VERIFICATION_REDIRECT,
    DEFAULT_FORGOT_PASSWORD_REDIRECT,
    DEFAULT_RESET_PASSWORD_REDIRECT,
    DEFAULT_POST_ADS_REDIRECT,
    DEFAULT_CART_REDIRECT,
    DEFAULT_CHECKOUT_REDIRECT,
    DEFAULT_ORDER_REDIRECT,
    DEFAULT_ABOUT_REDIRECT,
    DEFAULT_CONTACT_REDIRECT,
    DEFAULT_FAQ_REDIRECT,
    DEFAULT_SETUP_STORE_REDIRECT,
};

export type {LinkProps};