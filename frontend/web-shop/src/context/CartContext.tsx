import {
    createContext,
} from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    categoryId: number;
}
export interface CartItem extends Product {
    cartQuantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (
        product: Product,
        quantity: number
    ) => void;
    removeFromCart: (productId: number) => void;
    updateCartQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);



