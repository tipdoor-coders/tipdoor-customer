'use client';
import { fetchWithAuth } from '@/lib/api'
import React, { useEffect, useState } from 'react'

const MyCart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetchWithAuth('cart/');
                setCartItems(response.items);
            } catch (err) {
                console.error('Failed to fetch cart:', err);
            }
        };

        fetchCart();
    }, []);

    // Update quantity
    const handleQuantityChange = async (id, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const response = await fetchWithAuth(`cart/update/${id}/`, {
                method: 'PATCH',
                body: JSON.stringify({ quantity: newQuantity })
            })
            setCartItems(response.items)
        } catch (err) {
            console.log(err)
        }
    };

    // Remove item
    const handleRemove = async (id) => {
        try {
            const response = await fetchWithAuth(`cart/remove/${id}/`, { method: 'DELETE' })
            setCartItems(response.items)
        } catch (err) {
            console.log(err)
        }
    };

    // Calculate total
    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <main className='min-h-[80vh] p-2.5'>
            <section className="cart-container bg-linear-200 from-[#5e17eb] to-[#5f18eb66] md:w-4/5 w-[95vw] mx-auto md:p-5 p-2.5 rounded-lg shadow-xl">
                <h2 className='text-white text-center md:text-3xl text-2xl font-bold mb-5'>My Cart</h2>

                {/* Products added to cart */}
                <div className="cart-items mb-5">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="cart-item flex md:flex-row flex-col max-md:items-start justify-between mb-4 p-2.5 bg-white rounded-lg shadow-xl"
                            >
                                <img
                                    className="md:w-20 w-24 md:h-20 h-24 object-cover rounded-lg"
                                    src={item.product.image}
                                    alt={item.product.name}
                                />
                                <div className="item-details flex-1 md:ml-3.5 ml-0 max-md:mt-2">
                                    <p className="item-name md:text-lg text-base font-bold">{item.product.name}</p>
                                    <p>
                                        &#8377;
                                        <span className="item-price text-slate-500 md:text-base text-sm">
                                            {Number(item.product.price).toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                                <div className="item-quantity flex items-center">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className={"px-2 py-1 text-white bg-[#5e17eb] rounded-md hover:bg-[#4b12c2] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                            className="quantity md:w-12 w-10 md:mr-2.5 mr-2 p-1 text-center border border-gray-300 rounded"
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className={"px-2 py-1 text-white bg-[#5e17eb] rounded-md hover:bg-[#4b12c2] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="remove-item px-2.5 py-1 bg-[#ff5e5e] hover:bg-[#ff4d4d] text-white border-none cursor-pointer rounded-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )
                        )
                    ) : (
                        <p className="text-center text-white">Your cart is empty.</p>
                    )
                    }
                </div>

                {/* Total amount part */}
                {cartItems.length > 0 && (
                    <div className="cart-summary flex justify-between items-center pt-5 text-base text-white">
                        <p>
                            Total: &#8377;<span id="total-price">{total.toFixed(2)}</span>
                        </p>
                        <button className="checkout-btn bg-[#5cb85c] hover:bg-[#4cae4c] px-5 py-2.5 text-white md:text-base text-lg max-md:w-full border-none rounded-sm cursor-pointer">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </section>
        </main>
    )
}

export default MyCart
