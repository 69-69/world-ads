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

interface ids {
    id?: number | string;
    hashed_id: string;
}

interface Product extends ids {
    slug: string;
    store_id: number | string;
    is_promo: boolean;
    name: string;
    images: string[];
    category: string;
    sub_category: string;
    brand: string;
    condition: string;
    regular_price: string | number;
    sales_price: number | string;
    stock_level: number | string;
    product_colors: string;
    published: boolean;
    description: string;
}

interface Promo extends ids {
    post_id: string;
    title: string;
    promo_price: number;
    description: string;
    start_at: string;          // e.g., '2025-04-13 06:58:29'
    end_at: string;
    background_image: string;
}

interface OnActionProps {
    onAction: (id: number | string | undefined, action: 'edit' | 'delete') => void;
}

interface Brand extends ids {
    brand: string;
    store_id: string;
}

interface Condition extends ids {
    condition: string;
    store_id: string;
}

interface Category extends ids {
    store_id: string;
    category: string;
    parent_category: string;
}


interface BrandProps extends OnActionProps {
    brand: Brand;
}

interface ConditionProps extends OnActionProps {
    condition: Condition;
}

interface CategoryProps extends OnActionProps {
    category: Category;
}

interface PromoRowProps extends OnActionProps {
    promo: Promo;
}

interface ProductRowProps extends OnActionProps {
    product: Product;
}

export type {
    Product,
    Promo,
    Brand,
    Condition,
    Category,
    PromoRowProps,
    ProductRowProps,
    BrandProps,
    ConditionProps,
    CategoryProps
};

