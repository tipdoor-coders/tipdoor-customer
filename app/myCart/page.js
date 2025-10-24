'use client';
import React, { useState } from 'react'

const MyCart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Product 1", price: 20.055, quantity: 1, image: "product-image.jpg" },
        { id: 2, name: "Product 2", price: 40.0, quantity: 1, image: "product-image.jpg" },
        { id: 3, name: "Product 3", price: 115.0, quantity: 1, image: "product-image.jpg" },
    ]);

    // Update quantity
    const handleQuantityChange = (id, newQuantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
            )
        );
    };

    // Remove item
    const handleRemove = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Calculate total
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div className="item-details flex-1 md:ml-3.5 ml-0 max-md:mt-2">
                                    <p className="item-name md:text-lg text-base font-bold">{item.name}</p>
                                    <p>
                                        &#8377;
                                        <span className="item-price text-slate-500 md:text-base text-sm">
                                            {item.price.toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                                <div className="item-quantity flex items-center">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                        className="quantity md:w-12 w-10 md:mr-2.5 mr-2 p-1 text-center border border-gray-300 rounded"
                                    />
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
