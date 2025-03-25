// Routes Handlers are used to handle the incoming requests from the client. The handleRequest function is used to make the actual request depending on whether it's a third-party API or your own backend API.
// The handleSignup function is used to make the actual request depending on whether it's a third-party API or your own backend API.
// The GET, POST, PUT, DELETE functions are used to handle the incoming requests from the client.
//
const apiHandler = '/api/external';
const signupHandler = '/api/register';
const marketplaceHandler = '/api/market-place';
const reviewHandler = '/api/user-review';
const verifyHandler = '/api/verify';
const setupStoreHandler = '/api/setup-store';

// Endpoints for the backend API
const signinEndpoint = 'signin';
// const signupEndpoint = 'signup';
const signOutEndpoint = 'sign-out';
// const autoSigninEndpoint = 'auto-signin';
// const postAdEndpoint = 'market-place';
const adsEndpoint = 'ads';
const sendVerifyEmail = 'send-verify-email';
const sendVerifyPhone = 'send-verify-phone';
const verifyEmailEndpoint = 'verify-email';
const verifyPhoneEndpoint = 'verify-sms';

// External API endpoint
const restCountriesAPI = 'https://restcountries.com/v3.1/all?fields=name,tld,cca2,ccn3,cca3,currencies,idd,capital,region,subregion,languages,flags';

export {
    apiHandler,
    signupHandler,
    verifyHandler,
    reviewHandler,
    marketplaceHandler,
    setupStoreHandler,
    signinEndpoint,
    // signupEndpoint,
    signOutEndpoint,
    // autoSigninEndpoint,
    // postAdEndpoint,
    adsEndpoint,
    sendVerifyEmail,
    sendVerifyPhone,
    verifyEmailEndpoint,
    verifyPhoneEndpoint,
    restCountriesAPI,
}