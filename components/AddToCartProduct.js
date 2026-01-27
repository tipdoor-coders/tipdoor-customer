'use client';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/api';
import CartQuantityControl from './CartQuantityControl';

export default function AddToCartProduct({ product }) {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCartItem = async () => {
            try {
                const cart = await fetchWithAuth('cart/');
                const found = cart.items.find(
                    (i) => i.product.id === product.id
                );
                if (found) setItem(found);
            } catch {
                // guest or unauthenticated is fine
            } finally {
                setLoading(false);
            }
        };

        loadCartItem();
    }, [product.id]);

    const add = async () => {
        const cart = await fetchWithAuth('cart/add/', {
            method: 'POST',
            body: JSON.stringify({
                product_id: product.id,
                quantity: 1,
            }),
        });

        setItem(
            cart.items.find((i) => i.product.id === product.id)
        );
    };

    if (loading) {
        return <div className="h-12 w-40 bg-gray-200 animate-pulse rounded-md" />;
    }

    // Product NOT in cart yet
    if (!item) {
        return (
            <button
                onClick={add}
                disabled={product.stock < 1}
                className="px-6 py-3 bg-[#5e17eb] text-white rounded-md disabled:opacity-50"
            >
                {product.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
            </button>
        );
    }

    // Product ALREADY in cart
    return (
        <CartQuantityControl
            itemId={item.id}
            quantity={item.quantity}
            max={product.stock}
            onChange={(items) =>
                setItem(items.find((i) => i.product.id === product.id))
            }
        />
    );
}
