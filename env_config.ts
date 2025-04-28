// My customized environment configuration file for a Next.js application.

// const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
// const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';

const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://istorezhona.vercel.app';
const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://istorezhona.shop/world_ad_api';
const BACKEND_API_ENDPOINT = `${BACKEND_API_BASE_URL}/api/v1`;

const BACKEND_IMAGE_DIR = process.env.NEXT_PUBLIC_BACKEND_IMAGE_PATH || '/static/uploads';
const BACKEND_IMAGE_PATH = BACKEND_API_BASE_URL + BACKEND_IMAGE_DIR;
const BACKEND_MARKETPLACE_IMAGE_PATH = BACKEND_IMAGE_PATH + (process.env.NEXT_PUBLIC_BACKEND_MARKETPLACE_IMAGE_PATH || '/marketplace_images');
const BACKEND_PROMO_IMAGE_PATH = BACKEND_IMAGE_PATH + (process.env.NEXT_PUBLIC_BACKEND_PROMO_IMAGE_PATH || '/promo_bg_images');
const BACKEND_STORE_SETUP_LOGO_PATH = BACKEND_IMAGE_PATH + (process.env.NEXT_PUBLIC_BACKEND_STORE_SETUP_LOGO_PATH || '/store_setup_logo');

export {
    PUBLIC_BASE_URL,
    BACKEND_API_BASE_URL,
    BACKEND_API_ENDPOINT,
    BACKEND_IMAGE_DIR,
    BACKEND_IMAGE_PATH,
    BACKEND_MARKETPLACE_IMAGE_PATH,
    BACKEND_STORE_SETUP_LOGO_PATH,
    BACKEND_PROMO_IMAGE_PATH,
};
