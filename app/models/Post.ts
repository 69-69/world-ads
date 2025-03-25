// models/Post.ts
//
interface Post {
    id: number | string;
    slug: string;
    hashed_id: string;
    store_id: number | string;
    is_verified: boolean;
    title: string;
    category: string;
    description: string;
    price: number | string;
    discount_price: number;
    product_color: string;
    images: string[];
}

export type {Post};

