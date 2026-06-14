import { useState,useEffect, type ReactNode } from "react";
import { CartContext, type CartItem } from "./CartContext";

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    categoryId: number;
}

export const CartProvider = ({
            children
        }: {
            children: ReactNode;
        }) => {

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {

        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
        
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (
            product: Product,
            quantity: number
        ) => {

            setCartItems(prev => {

                const existingItem = prev.find(
                    item => item.id === product.id
                );

                if (existingItem) {
                    return prev.map(item =>
                        item.id === product.id
                            ? {
                                ...item,
                                cartQuantity:
                                    item.cartQuantity + quantity
                            }
                            : item
                    );
                }

                return [
                    ...prev,
                    {
                        ...product,
                        cartQuantity: quantity
                    }
                ];
            });
        };

    const removeFromCart = (productId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateCartQuantity = (productId: number, quantity: number) => {
        setCartItems(prev =>
            prev
                .map(item =>
                    item.id === productId
                        ? {
                            ...item,
                            cartQuantity: quantity
                        }
                        : item
                )
                .filter(item => item.cartQuantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};