This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```markdown
/app
├── (auth)
│   ├── login.js
│   ├── register.js
│   └── reset-password.js
├── (account)
│   ├── index.js  (user dashboard)
│   ├── orders.js
│   ├── profile.js
│   └── wishlist.js
├── (cart)
│   ├── index.js  (cart overview)
│   ├── checkout.js
│   └── success.js
├── (admin)
│   ├── dashboard.js
│   ├── products.js
│   ├── orders.js
│   ├── customers.js
│   └── reports.js
├── products
│   ├── index.js  (all products listing)
│   ├── [category].js  (dynamic category-based route)
│   └── [productId].js  (dynamic product details route)
├── search
│   ├── index.js  (search page)
│   └── [query].js  (dynamic search results for a query)
├── sale.js
├── new-arrivals.js
├── about.js
├── contact.js
├── terms.js
└── privacy.js
```


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# world-ads
