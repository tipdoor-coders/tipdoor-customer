import React from 'react'

const MyCart = () => {
    return (
        <main className='min-h-[80vh] p-2.5'>
            <section className="cart-container bg-linear-200 from-[#5e17eb] to-[#5f18eb66] md:w-4/5 w-[95vw] mx-auto md:p-5 p-2.5 rounded-lg shadow-xl">
                <h2 className='text-white text-center md:text-3xl text-2xl font-bold mb-5'>My Cart</h2>
                <div className="cart-items mb-5">
                    <div className="cart-item flex md:flex-row flex-col max-md:items-start justify-between mb-4 p-2.5 bg-[#fff] rounded-lg shadow-xl">
                        <img className='md:w-20 w-24 md:h-20 h-24 object-cover rounded-lg' src="product-image.jpg" alt="Product 1" />
                        <div className="item-details flex-1 md:ml-3.5 ml-0 max-md:mt-2">
                            <p className="item-name md:text-lg text-base font-bold">Product 1</p>
                            <p>
                                &#8377; <span className="item-price text-slate-500 md:text-base text-sm">20.00</span>
                            </p>
                        </div>
                        <div className="item-quantity flex items-center">
                            <input type="number" value="1" min="1" className="quantity md:w-12 w-10 md:mr-2.5 mr-2 p-1 text-center" />
                            <button className="remove-item max-md:mt2.5 max-md:w-full max-md:p-2 max-md:text-center px-2.5 py-1 bg-[#ff5e5e] hover:bg-[#ff4d4d] text-white border-none cursor-pointer rounded-sm">Remove</button>
                        </div>
                    </div>
                    {/* <!-- Repeat the above .cart-item for each product --> */}
                    <div className="cart-item flex md:flex-row flex-col max-md:items-start justify-between mb-4 p-2.5 bg-[#fff] rounded-lg shadow-xl">
                        <img className='md:w-20 w-24 md:h-20 h-24 object-cover rounded-lg' src="product-image.jpg" alt="Product 2" />
                        <div className="item-details flex-1 md:ml-3.5 ml-0 max-md:mt-2">
                            <p className="item-name md:text-lg text-base font-bold">Product 2</p>
                            <p>
                                &#8377; <span className="item-price text-slate-500 md:text-base text-sm">40.00</span>
                            </p>
                        </div>
                        <div className="item-quantity flex items-center">
                            <input type="number" value="1" min="1" className="quantity md:w-12 w-10 md:mr-2.5 mr-2 p-1 text-center" />
                            <button className="remove-item max-md:mt2.5 max-md:w-full max-md:p-2 max-md:text-center px-2.5 py-1 bg-[#ff5e5e] hover:bg-[#ff4d4d] text-white border-none cursor-pointer rounded-sm">Remove</button>
                        </div>
                    </div>
                    {/* <!-- Repeat the above .cart-item for each product --> */}
                    <div className="cart-item flex md:flex-row flex-col max-md:items-start justify-between mb-4 p-2.5 bg-[#fff] rounded-lg shadow-xl">
                        <img className='md:w-20 w-24 md:h-20 h-24 object-cover rounded-lg' src="product-image.jpg" alt="Product 3" />
                        <div className="item-details flex-1 md:ml-3.5 ml-0 max-md:mt-2">
                            <p className="item-name md:text-lg text-base font-bold">Product 3</p>
                            <p>
                                &#8377; <span className="item-price text-slate-500 md:text-base text-sm">10.00</span>
                            </p>
                        </div>
                        <div className="item-quantity flex items-center">
                            <input type="number" value="1" min="1" className="quantity md:w-12 w-10 md:mr-2.5 mr-2 p-1 text-center" />
                            <button className="remove-item max-md:mt2.5 max-md:w-full max-md:p-2 max-md:text-center px-2.5 py-1 bg-[#ff5e5e] hover:bg-[#ff4d4d] text-white border-none cursor-pointer rounded-sm">Remove</button>
                        </div>
                    </div>
                    {/* <!-- Repeat the above .cart-item for each product --> */}
                </div>

                <div className="cart-summary flex justify-between items-center pt-5 text-base">
                    <p>Total: &#8377;<span id="total-price">20.00</span></p>
                    <button className="checkout-btn bg-[#5cb85c] hover:bg-[#4cae4c] px-5 py-2.5 text-white md:text-base text-lg max-md:w-full border-none rounded-sm cursor-pointer">Proceed to Checkout</button>
                </div>
            </section>
        </main>
    )
}

export default myCart
