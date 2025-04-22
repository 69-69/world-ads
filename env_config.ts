const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || 'https://arizona.istorezhona.shop';  // Access this URL in your browser to see the app
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || 'https://api.istorezhona.shop';
const BACKEND_API_ENDPOINT = `${BACKEND_BASE_URL}/api/v1`;

const BACKEND_IMAGE_DIR = process.env.BACKEND_IMAGE_PATH || '/static/uploads';
const BACKEND_IMAGE_PATH = BACKEND_BASE_URL + BACKEND_IMAGE_DIR;
const BACKEND_MARKETPLACE_IMAGE_PATH = BACKEND_IMAGE_PATH + (process.env.BACKEND_MARKETPLACE_IMAGE_PATH || '/marketplace_images');
const BACKEND_PROMO_IMAGE_PATH = BACKEND_IMAGE_PATH + (process.env.BACKEND_PROMO_IMAGE_PATH || '/promo_bg_images');
const BACKEND_STORE_SETUP_LOGO_PATH = BACKEND_IMAGE_PATH + (process.env.BACKEND_STORE_SETUP_LOGO_PATH || '/store_setup_logo');

export {
    PUBLIC_BASE_URL,
    BACKEND_BASE_URL,
    BACKEND_API_ENDPOINT,
    BACKEND_IMAGE_DIR,
    BACKEND_IMAGE_PATH,
    BACKEND_MARKETPLACE_IMAGE_PATH,
    BACKEND_STORE_SETUP_LOGO_PATH,
    BACKEND_PROMO_IMAGE_PATH,
};
