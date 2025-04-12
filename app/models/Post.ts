// models/Post.ts
//
/*interface Post {
    id: number | string;
    slug: string;
    hashed_id: string;
    store_id: number | string;
    published: boolean;
    title: string;
    category: string;
    description: string;
    price: number | string;
    discount_price: number;
    product_color: string;
    images: string[];
}*/

interface Product {
    slug: string;
    hashed_id: string;
    store_id: number | string;
    is_promo: boolean;
    title: string;
    images: string[];
    category: string;
    sub_category: string;
    brand: string;
    condition: string;
    regular_price: number;
    sales_price: number;
    product_colors: string;
    published: boolean;
    description: string;
}

export type {Product};

