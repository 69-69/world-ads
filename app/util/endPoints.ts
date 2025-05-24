// Defining API route handlers for different services
// Each handler corresponds to Next.js Route-Handlers that processes specific client requests.
/*```
app/
├── api/
│   ├── register/
│   │   └── route.js         // Handles /api/register
│   ├── verify/
│   │   └── route.js         // Handles /api/verify
│   ├── user-review/
│   │   └── route.js         // Handles /api/user-review
│   ├── marketplace/
│   │   └── route.js         // Handles /api/marketplace
│   └── setup-store/
│       └── route.js         // Handles /api/setup-store
└── project/
```*/
// Third-party API Handler - Handles requests to an external service for country information
const restCountriesHandler = '/api/third-party';

// User Registration Handler - Handles user signup requests (could be for internal or third-party registration)
const signupHandler = '/api/register';

// Marketplace Handler - Manages requests related to the marketplace (e.g., viewing products, orders)
const marketplaceHandler = '/api/marketplace';

// Brand Handler - Handles requests related to brands, such as fetching brand details or updating brand information
const brandHandler = '/api/brand';

// Condition Handler - Deals with requests related to product conditions (e.g., new, used, refurbished)
const conditionHandler = '/api/condition';

// Category Handler - Handles requests related to product categories (e.g., fetching category details)
const categoryHandler = '/api/category';

// Promo Handler - Manages requests related to promotional activities (e.g., fetching active promos or applying discounts)
const promoHandler = '/api/promo';

// Review Handler - Handles user review submission or fetching product/service reviews
const reviewHandler = '/api/user-review';

// Verification Handler - Handles account or action verification requests (e.g., email verification, two-factor authentication)
const verifyHandler = '/api/verify';

// Setup Store Handler - Manages requests related to setting up a store (e.g., creating a store, updating settings)
const setupStoreHandler = '/api/setup-store';

export {
    signupHandler,
    verifyHandler,
    reviewHandler,
    marketplaceHandler,
    setupStoreHandler,
    promoHandler,
    brandHandler,
    conditionHandler,
    categoryHandler,
    restCountriesHandler,
}
