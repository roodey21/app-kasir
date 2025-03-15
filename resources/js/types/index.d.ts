import { Product } from './index.d';
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
    category: Category;
    created_at: string;
    updated_at: string;
}

export interface CartItem extends Product {
    qty: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        success?: string
        error?: string
    };
};
