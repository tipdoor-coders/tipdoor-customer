"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Home = () => {
    // const { data: session } = useSession()

    // if (!session) {
    //     const router = useRouter()
    //     router.push('/login')
    // }

    return (
        <>
            <main className='max-w-[1200px] mx-auto p-5'>
                {/* <!-- 1. Big Picture as a Promotion Banner --> */}
                <section className='promotion-banner w-full md:h-[65vh] h-[200px] mb-10 overflow-hidden rounded-lg'>
                    <img className="banner-image w-full h-full object-cover hover:scale-105 duration-300 ease-in-out" src="/fashion.jpg" alt="Big Promotion Banner" />
                </section>

                {/* <!-- 2. Features with Several Graphics --> */}
                <section className="features flex justify-between max-md:items-center md:gap-5 gap-1.5 mb-10">
                    <h2 className='max-md:hidden text-3xl font-bold mb-5 text-center w-1/3'>Our Features</h2>
                    <div className="feature max-md:mb-5 max-md:min-h-48 text-center flex flex-col md:justify-center items-center flex-1 px-4 py-1.5 bg-white rounded-lg shadow-md">
                        <img className="feature-image md:w-24 w-7 h-12 object-contain mb-1.5" src="/hyperlocal.svg" alt="Feature 1" />
                        <p className='text-sm text-gray-700 pb-0.5'><strong>Hyperlocal Model</strong></p>
                        <p className='md:text-sm text-[11px] text-gray-700'>Authentically, Right from your nearest retailer</p>
                    </div>
                    <div className="feature max-md:mb-5 max-md:min-h-48 text-center flex flex-col md:justify-center items-center flex-1 px-4 py-1.5 bg-white rounded-lg shadow-md">
                        <img className="feature-image md:w-24 w-7 h-12 object-contain mb-1.5" src="/fast_deliver.svg" alt="Feature 2" />
                        <p className='text-sm text-gray-700 pb-0.5'><strong>30-60 Min. Delivery</strong></p>
                        <p className='md:text-sm text-[11px] text-gray-700'>From your finger tip to your doorstep within 10-15 min</p>
                    </div>
                    <div className="feature max-md:mb-5 max-md:min-h-48 text-center flex flex-col md:justify-center items-center flex-1 px-4 py-1.5 bg-white rounded-lg shadow-md">
                        <img className="feature-image md:w-24 w-7 h-12 object-contain mb-1.5" src="/return.svg" alt="Feature 3" />
                        <p className='text-sm text-gray-700 pb-0.5'><strong>10 min Quality Check</strong></p>
                        <p className='md:text-sm text-[11px] text-gray-700'>Quality check on arrival available</p>
                    </div>
                </section>

                {/* <!-- 3. A Section with Further Divisions (New Products, Latest Products, Recommended for You, etc.) --> */}
                <section className="product-sections mt-10">
                    <div className="product-category mb-10 new-products">
                        <h2 className='text-3xl font-bold mb-5 text-neutral-800'>New Products</h2>
                        <div className="product-list flex overflow-x-auto gap-5 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {/* <!-- Example of a product card --> */}
                            {
                                [
                                    { id: 1, name: "New Product 1", price: "100.00", image: "new-product1.jpg" },
                                    { id: 2, name: "New Product 2", price: "110.00", image: "new-product2.jpg" },
                                    { id: 3, name: "New Product 3", price: "120.00", image: "new-product3.jpg" },
                                    { id: 4, name: "New Product 4", price: "130.00", image: "new-product4.jpg" },
                                    { id: 5, name: "New Product 5", price: "140.00", image: "new-product5.jpg" },
                                    { id: 6, name: "New Product 6", price: "150.00", image: "new-product6.jpg" },
                                    { id: 7, name: "New Product 7", price: "160.00", image: "new-product7.jpg" },
                                    { id: 8, name: "New Product 8", price: "170.00", image: "new-product8.jpg" }
                                ].map((product) => (
                                    <article key={product.id} className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                        <img className='w-full h-auto rounded-lg mb-2.5' src={product.image} alt={product.name} />
                                        <h3 className='font-bold text-xl text-gray-800'>{product.name}</h3>
                                        <p className='text-gray-800 mb-5'>&#8377;{product.price}</p>
                                        <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                                    </article>
                                ))
                            }
                        </div >
                    </div >

                    <div className="product-category mb-10 latest-arrival">
                        <h2 className='text-3xl font-bold mb-5 text-neutral-800'>Latest Arrival</h2>
                        <div className="product-list flex overflow-x-auto gap-5 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="latest-product1.jpg" alt="Latest Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Latest Product 1</h3>
                                <p className='text-gray-800 mb-5'>&#8377;150.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="latest-product1.jpg" alt="Latest Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Latest Product 2</h3>
                                <p className='text-gray-800 mb-5'>&#8377;150.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="latest-product1.jpg" alt="Latest Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Latest Product 3</h3>
                                <p className='text-gray-800 mb-5'>&#8377;150.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="latest-product1.jpg" alt="Latest Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Latest Product 4</h3>
                                <p className='text-gray-800 mb-5'>&#8377;150.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="latest-product1.jpg" alt="Latest Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Latest Product 5</h3>
                                <p className='text-gray-800 mb-5'>&#8377;150.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="latest-product1.jpg" alt="Latest Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Latest Product 6</h3>
                                <p className='text-gray-800 mb-5'>&#8377;150.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="latest-product1.jpg" alt="Latest Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Latest Product 7</h3>
                                <p className='text-gray-800 mb-5'>&#8377;150.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="latest-product1.jpg" alt="Latest Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Latest Product 8</h3>
                                <p className='text-gray-800 mb-5'>&#8377;150.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Add more products as needed --> */}
                        </div>
                    </div>

                    <div className="product-category mb-10 recommended">
                        <h2 className='text-3xl font-bold mb-5 text-neutral-800'>Recommended for You</h2>
                        <div className="product-list flex overflow-x-auto gap-5 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="recommended-product1.jpg" alt="Recommended Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Recommended Product 1</h3>
                                <p className='text-gray-800 mb-5'>&#8377;120.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="recommended-product1.jpg" alt="Recommended Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Recommended Product 2</h3>
                                <p className='text-gray-800 mb-5'>&#8377;120.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="recommended-product1.jpg" alt="Recommended Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Recommended Product 3</h3>
                                <p className='text-gray-800 mb-5'>&#8377;120.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="recommended-product1.jpg" alt="Recommended Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Recommended Product 4</h3>
                                <p className='text-gray-800 mb-5'>&#8377;120.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="recommended-product1.jpg" alt="Recommended Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Recommended Product 5</h3>
                                <p className='text-gray-800 mb-5'>&#8377;120.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Example of a product card --> */}
                            <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                <img className='w-full h-auto rounded-lg mb-2.5' src="recommended-product1.jpg" alt="Recommended Product 1" />
                                <h3 className='font-bold text-xl text-gray-800'>Recommended Product 6</h3>
                                <p className='text-gray-800 mb-5'>&#8377;120.00</p>
                                <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300'>Add to Cart</button>
                            </article>
                            {/* <!-- Add more products as needed --> */}
                        </div>
                    </div>
                </section >
            </main >
        </>
    )
}

export default Home
