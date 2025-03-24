// models/Post.ts
//
interface Post {
    id: number; // Assuming `id` is a number
    slug: string;
    hashed_id: string;
    store_id: number; // Assuming `store_id` is a number
    is_verified: boolean;
    title: string;
    category: string;
    description: string;
    price: number;
    discount_price: number;
    product_color: string;
    images: string[]; // Array of strings representing image URLs or file paths
}

export type {Post};

