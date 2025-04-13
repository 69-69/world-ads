import {PUBLIC_BASE_URL} from "@/env_config";
import {AppLinks} from "@/app/models/AppLinks";

const APP_NAME = 'World Ads Center';
const APP_NAME_SHORT = 'iStoreZhona'; // WAC
const HOME_ROUTE = PUBLIC_BASE_URL;
const POLICY_ROUTE = '/terms-and-conditions';
const SIGNIN_ROUTE = '/signin';
const SIGNUP_ROUTE = '/signup';
const VERIFICATION_ROUTE = '/verify-contact';
const SETUP_STORE_ROUTE = '/setup-store';
const FORGOT_PASSWORD_ROUTE = '/forgot-password';
const RESET_PASSWORD_ROUTE = '/reset-password';
const POST_ADS_ROUTE = '/post';
const ADMIN_ROUTE = '/admin';
const ADMIN_PRODUCT_ROUTE = ADMIN_ROUTE + '/products';
const ADMIN_DASHBOARD_ROUTE = ADMIN_ROUTE + '/dashboard';
const ADMIN_PROMO_ROUTE = ADMIN_ROUTE + '/promo';
const ADMIN_PROMO_CREATE_ROUTE = ADMIN_PROMO_ROUTE + '/create';
// const CART_ROUTE = '/cart';
const SHOP_ROUTE = '/shop';
const CHECKOUT_ROUTE = '/checkout';
const ORDER_ROUTE = '/orders';
const CONTACT_ROUTE = '/contact';
const ABOUT_ROUTE = '/about';
const FAQ_ROUTE = '/faq';

const PROTECTED_RESOURCES_ROUTES = [
    POST_ADS_ROUTE + '/:path*',
    ORDER_ROUTE,
    CHECKOUT_ROUTE,
    ADMIN_ROUTE + '/:path*',
];

const PROTECTED_AUTH_ROUTES = [
    SIGNIN_ROUTE,
    SIGNUP_ROUTE,
    SETUP_STORE_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    RESET_PASSWORD_ROUTE,
];

const ACC_ROLE = ['buyer', 'seller'];

const HEADER_LINKS: AppLinks[] = [
    {title: 'Home', url: HOME_ROUTE},
    {title: 'Start Selling', url: POST_ADS_ROUTE},
    {title: 'My Account', url: SIGNIN_ROUTE},
];


const FOOTER_LINKS: AppLinks[] = [
    /* Left Section - Links (First Link Group) */
    {title: 'Home', url: HOME_ROUTE},
    {title: 'About Us', url: ABOUT_ROUTE},
    {title: 'Contact Us', url: CONTACT_ROUTE},
    {title: 'Shop', url: SHOP_ROUTE},

    /* Center Section - Links (Second Link Group) */
    {title: 'My Account', url: SIGNIN_ROUTE},
    {title: 'Sign Up', url: SIGNUP_ROUTE},
    {title: 'Start Selling', url: POST_ADS_ROUTE},

    /* Right Section - Links (Third Link Group) */
    {title: 'Terms & Conditions', url: POLICY_ROUTE},
    {title: 'Privacy Policy', url: POLICY_ROUTE},
    {title: 'FAQ', url: FAQ_ROUTE},
];

// Define the subcategories separately
const SUB_CATEGORIES = {
    'real-estate': [
        {name: 'For Sale', value: 'for-sale'},
        {name: 'For Rent', value: 'for-rent'},
        {name: 'Commercial', value: 'commercial'},
        {name: 'Land', value: 'land'},
    ],
    'jobs': [
        {name: 'Full-Time', value: 'full-time'},
        {name: 'Part-Time', value: 'part-time'},
        {name: 'Freelance', value: 'freelance'},
        {name: 'Internship', value: 'internship'},
    ],
    'services': [
        {name: 'Cleaning', value: 'cleaning'},
        {name: 'Tutoring', value: 'tutoring'},
        {name: 'Plumbing', value: 'plumbing'},
        {name: 'Consulting', value: 'consulting'},
    ],
    'vehicles': [
        {name: 'Cars', value: 'cars'},
        {name: 'Motorcycles', value: 'motorcycles'},
        {name: 'Bikes', value: 'bikes'},
        {name: 'Boats', value: 'boats'},
    ],
    'pets': [
        {name: 'Dogs', value: 'dogs'},
        {name: 'Cats', value: 'cats'},
        {name: 'Birds', value: 'birds'},
        {name: 'Reptiles', value: 'reptiles'},
    ],
    'electronics': [
        {name: 'Phones', value: 'phones'},
        {name: 'Laptops', value: 'laptops'},
        {name: 'TVs', value: 'tvs'},
        {name: 'Cameras', value: 'cameras'},
        {name: 'Projectors', value: 'projectors'},
        {name: 'Headphones', value: 'headphones'},
        {name: 'Smart Watches', value: 'smart-watches'},
        {name: 'Tablets', value: 'tablets'},
        {name: 'iPads', value: 'iPads'},
        {name: 'Game Consoles', value: 'game-consoles'},
        {name: 'Desktops', value: 'desktops'},
        {name: 'Monitors', value: 'monitors'},
        {name: 'Charges', value: 'charges'},
        {name: 'Printers', value: 'printers'},
        {name: 'Accessories', value: 'accessories'},
    ],
    'furniture': [
        {name: 'Living Room', value: 'living-room'},
        {name: 'Bedroom', value: 'bedroom'},
        {name: 'Office', value: 'office'},
        {name: 'Outdoor', value: 'outdoor'},
    ],
    'events': [
        {name: 'Concerts', value: 'concerts'},
        {name: 'Sports', value: 'sports'},
        {name: 'Theater', value: 'theater'},
        {name: 'Festivals', value: 'festivals'},
    ],
    'community': [
        {name: 'Meetups', value: 'meetups'},
        {name: 'Groups', value: 'groups'},
        {name: 'Volunteering', value: 'volunteering'},
        {name: 'Events', value: 'events'},
    ],
    'business-sale': [
        {name: 'Restaurants', value: 'restaurants'},
        {name: 'Retail Stores', value: 'retail-stores'},
        {name: 'Franchises', value: 'franchises'},
        {name: 'Offices', value: 'offices'},
    ],
};

// Define the POST_CATEGORIES, referring to SUB_CATEGORIES
const POST_CATEGORIES = [
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

// POSt Brands
const POST_BRANDS = [
    {name: 'Apple', value: 'apple'},
    {name: 'Samsung', value: 'samsung'},
    {name: 'Sony', value: 'sony'},
    {name: 'LG', value: 'lg'},
    {name: 'Dell', value: 'dell'},
    {name: 'HP', value: 'hp'},
    {name: 'Lenovo', value: 'lenovo'},
    {name: 'Asus', value: 'asus'},
];

// Store setup categories
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
    POST_CATEGORIES,
    SUB_CATEGORIES,
    POST_BRANDS,
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
    CHECKOUT_ROUTE,
    ORDER_ROUTE,
    ABOUT_ROUTE,
    CONTACT_ROUTE,
    FAQ_ROUTE,
    SETUP_STORE_ROUTE,
    ADMIN_PRODUCT_ROUTE,
    ADMIN_DASHBOARD_ROUTE,
    ADMIN_PROMO_ROUTE,
    ADMIN_PROMO_CREATE_ROUTE
};
