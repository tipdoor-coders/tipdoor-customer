'use client';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/api';
import CartQuantityControl from './CartQuantityControl';

export default function AddToCartInline({ product }) {
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetchWithAuth('cart/')
            .then((cart) => {
                const found = cart.items.find(
                    (i) => i.product.id === product.id
                );
                if (found) setItem(found);
            })
            .catch(() => { });
    }, [product.id]);

    const add = async () => {
        const cart = await fetchWithAuth('cart/add/', {
            method: 'POST',
            body: JSON.stringify({ product_id: product.id, quantity: 1 }),
        });
        setItem(
            cart.items.find((i) => i.product.id === product.id)
        );
    };

    const stop = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    if (!item) {
        return (
            <button
                onClick={(e) => {
                    stop(e);
                    add();
                }}
                className="mx-auto block bg-[#007bff] hover:bg-[#0056b3] text-white px-5 py-2 rounded-md"
            >
                Add to Cart
            </button>
        );
    }

    return (
        <div
            onClick={stop}
            onMouseDown={stop}
            className="flex justify-center items-center mt-3"
        >
            <CartQuantityControl
                itemId={item.id}
                quantity={item.quantity}
                max={product.stock}
                onChange={(items) =>
                    setItem(items.find((i) => i.product.id === product.id))
                }
            />
        </div>
    );
}
