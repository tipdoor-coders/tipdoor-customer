'use client';
import { fetchWithAuth } from '@/lib/api';
import { useState } from 'react';

export default function CartQuantityControl({
    itemId,
    quantity,
    max,
    onChange,
}) {
    const [loading, setLoading] = useState(false);

    const update = async (newQty) => {
        if (loading) return;
        setLoading(true);

        try {
            let cart;
            if (newQty < 1) {
                cart = await fetchWithAuth(
                    `cart/remove/${itemId}/`,
                    { method: 'DELETE' }
                );
            } else {
                cart = await fetchWithAuth(
                    `cart/update/${itemId}/`,
                    {
                        method: 'PATCH',
                        body: JSON.stringify({ quantity: newQty }),
                    }
                );
            }
            onChange(cart.items);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <button onClick={() => update(quantity - 1)} disabled={loading}>
                −
            </button>

            <span>{quantity}</span>

            <button
                onClick={() => update(quantity + 1)}
                disabled={loading || (max && quantity >= max)}
            >
                +
            </button>

            <button
                onClick={() => update(0)}
                disabled={loading}
                className="text-red-500"
            >
                Remove
            </button>
        </div>
    );
}
