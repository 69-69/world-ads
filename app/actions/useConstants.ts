import {PUBLIC_BASE_URL} from "@/env_config";
import {AppLinks} from "@/app/models/AppLinks";

const APP_NAME = 'iStorezhona';
const HOME_ROUTE = PUBLIC_BASE_URL;
const POLICY_ROUTE = '/terms-and-conditions';
const SIGNIN_ROUTE = '/signin';
const SIGNUP_ROUTE = '/signup';
const VERIFICATION_ROUTE = '/verify-contact';
const SETUP_STORE_ROUTE = '/setup-store';
const FORGOT_PASSWORD_ROUTE = '/forgot-password';
const RESET_PASSWORD_ROUTE = '/reset-password';

const ADMIN_ROUTE = '/admin';
const ADMIN_DASHBOARD_ROUTE = ADMIN_ROUTE + '/dashboard';
const ADMIN_PRODUCT_ROUTE = ADMIN_ROUTE + '/products';
const ADMIN_PRODUCT_CREATE_ROUTE = ADMIN_PRODUCT_ROUTE + '/create';
const ADMIN_PRODUCT_REVIEW_ROUTE = ADMIN_PRODUCT_ROUTE + '/reviews';

const ADMIN_PROMO_ROUTE = ADMIN_ROUTE + '/deal-of-the-day';
const ADMIN_PROMO_CREATE_ROUTE = ADMIN_PROMO_ROUTE + '/create';
const ADMIN_PROMO_REVIEW_ROUTE = ADMIN_PROMO_ROUTE + '/reviews';

const ADMIN_CATEGORY_ROUTE = ADMIN_ROUTE + '/categories';
const ADMIN_CATEGORY_CREATE_ROUTE = ADMIN_CATEGORY_ROUTE + '/create';

const ADMIN_BRAND_ROUTE = ADMIN_ROUTE + '/brands';
const ADMIN_BRAND_CREATE_ROUTE = ADMIN_BRAND_ROUTE + '/create';

const ADMIN_PRO_CONDITION_ROUTE = ADMIN_ROUTE + '/conditions';
const ADMIN_PRO_CONDITION_CREATE_ROUTE = ADMIN_PRO_CONDITION_ROUTE + '/create';

const ADMIN_REFUND_ROUTE = ADMIN_ROUTE + '/refunds';

// const CART_ROUTE = '/cart';
const SHOP_ROUTE = '/shop';
const CHECKOUT_ROUTE = '/checkout';
const ORDER_ROUTE = '/orders';
const CONTACT_ROUTE = '/contact';
const ABOUT_ROUTE = '/about';
const FAQ_ROUTE = '/faq';

const PROTECTED_RESOURCES_ROUTES = [
    ORDER_ROUTE,
    CHECKOUT_ROUTE,
    ADMIN_ROUTE,
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
    {title: 'Start Selling', url: ADMIN_DASHBOARD_ROUTE},
    {title: 'My Account', url: SIGNIN_ROUTE},
    {title: 'Settings', url: ADMIN_DASHBOARD_ROUTE},
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
    {title: 'Start Selling', url: ADMIN_DASHBOARD_ROUTE},

    /* Right Section - Links (Third Link Group) */
    {title: 'Terms & Conditions', url: POLICY_ROUTE},
    {title: 'Privacy Policy', url: POLICY_ROUTE},
    {title: 'FAQ', url: FAQ_ROUTE},
];

// Product condition
const PRODUCT_CONDITIONS = [
    {name: 'New', value: 'new'},
    {name: 'Used', value: 'used'},
    {name: 'Refurbished', value: 'refurbished'},
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
const PARENT_CATEGORIES = [
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
    {name: 'Fashion', value: 'fashion'},
    {name: 'Sports', value: 'sports'},
    {name: 'Toys', value: 'toys'},
    {name: 'Education', value: 'education'},
    {name: 'Music', value: 'music'},
    {name: 'Movies', value: 'movies'},
    {name: 'Video Games', value: 'video-games'},
    {name: 'Collectibles', value: 'collectibles'},
    {name: 'Antiques', value: 'antiques'},
    {name: 'Art', value: 'art'},
    {name: 'Crafts', value: 'crafts'},
    {name: 'Hobbies', value: 'hobbies'},
    {name: 'DIY', value: 'diy'},
    {name: 'Gardening', value: 'gardening'},
    {name: 'Home Improvement', value: 'home-improvement'},
    {name: 'Health & Beauty', value: 'health-beauty'},
    {name: 'Baby & Kids', value: 'baby-kids'},
    {name: 'Food & Drink', value: 'food-drink'},
    {name: 'Travel', value: 'travel'},
    {name: 'Tickets', value: 'tickets'},
    {name: 'Music Instruments', value: 'music-instruments'},
    {name: 'Photography', value: 'photography'},
    {name: 'Others', value: 'others'},
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

const APP_COOKIE_KEYS = [
    'access_token',
    '__Secure-authjs.session-token',
    '__Secure-authjs.callback-url',
    '__Host-authjs.csrf-token',
    'authjs.session-token',
    'session_token',
    'refresh_token',
    'signin_method',
    'profile',
    'signup_token',
];

export {
    APP_COOKIE_KEYS,
    APP_NAME,
    ACC_ROLE,
    SELLER_TYPE,
    PARENT_CATEGORIES,
    SUB_CATEGORIES,
    POST_BRANDS,
    PRODUCT_CONDITIONS,
    STORE_CATEGORIES,
    PROTECTED_AUTH_ROUTES,
    PROTECTED_RESOURCES_ROUTES,
    ADMIN_PRODUCT_CREATE_ROUTE,
    ADMIN_PRODUCT_REVIEW_ROUTE,
    ADMIN_PROMO_REVIEW_ROUTE,
    ADMIN_CATEGORY_ROUTE,
    ADMIN_CATEGORY_CREATE_ROUTE,
    ADMIN_BRAND_ROUTE,
    ADMIN_BRAND_CREATE_ROUTE,
    ADMIN_REFUND_ROUTE,
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
    ADMIN_PRO_CONDITION_ROUTE,
    ADMIN_PRO_CONDITION_CREATE_ROUTE,
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
