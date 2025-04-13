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
    id?: number | string;
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

interface Promo {
    id?: number | string;
    hashed_id: string;
    post_id: string;
    title: string;
    promo_price: number;
    description: string;
    start_at: string;          // e.g., '2025-04-13 06:58:29'
    end_at: string;
    background_image: string;
}

interface PromoRowProps {
    promo: Promo;
    onAction: (id: number | string | undefined, action: 'edit' | 'delete') => void;
}

interface ProductRowProps {
    product: Product;
    onAction: (id: number | string | undefined, action: 'edit' | 'delete') => void;
}

export type {Product, Promo, PromoRowProps, ProductRowProps};

