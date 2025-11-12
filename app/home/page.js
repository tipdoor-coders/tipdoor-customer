"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchWithAuth } from '@/lib/api';
import Image from 'next/image';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [productsError, setProductsError] = useState(null)
    const [latestProducts, setLatestProducts] = useState([]);
    const [latestError, setLatestError] = useState(null);
    const [index, setIndex] = useState(0);

    const handleAddToCart = async (e, product) => {
        e.preventDefault(); // prevents article's onClick
        try {
            const response = await fetchWithAuth('cart/add/', {
                method: 'POST',
                body: JSON.stringify({ product_id: product.id })
            })
            console.log('Added to cart:', response)
        } catch (err) {
            console.error(err);
            alert('Failed to add to cart.')
        }
    };

    // Fetch products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setProducts(data)
                setProductsError(null)
            } catch (err) {
                setProductsError(err.message || 'Failed to fetch data')
                console.error('Fetch error:', err)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/latest-arrivals/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setLatestProducts(data)
                setLatestError(null)
            } catch (err) {
                setLatestError(err.message || 'Failed to fetch data')
                console.error('Fetch error:', err)
            }
        }
        fetchData()
    }, [])

    // Moving images
    const images = [
        '/fashion.jpg',
        '/shopping.jpg',
        '/shopping3.jpg',
        '/shopping2.jpg',
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000); // 4 seconds per image
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <main className='max-w-[1200px] mx-auto p-5'>
                {/* <!-- 1. Big Picture as a Promotion Banner --> */}
                <section className='promotion-banner w-full md:h-[65vh] h-[200px] mb-10 overflow-hidden rounded-lg relative'>
                    {images.map((src, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <Image
                                src={src}
                                alt={`Promotion Banner ${i + 1}`}
                                fill
                                className="object-cover"
                                priority={i === 0} // preload the first one
                            />
                        </div>
                    ))}
                </section>

                {/* <!-- 2. Features with Several Graphics --> */}
                <section className="features flex justify-between max-md:items-center md:gap-5 gap-1.5 mb-10">
                    <h2 className='max-md:hidden text-3xl font-bold mb-5 text-center w-1/3'>Our Features</h2>
                    <div className="feature text-center flex flex-col md:justify-center items-center flex-1 px-4 py-2 bg-white rounded-lg shadow-md mb-4 md:mb-0 transition-transform hover:-translate-y-1 hover:shadow-lg">
                        <img className="feature-image md:w-24 w-10 h-12 object-contain mb-2" src="/woman.png" alt="AI Try-On" />
                        <p className='text-sm text-gray-800 font-semibold'>AI Try-On Available</p>
                        <p className='md:text-sm text-[11px] text-gray-600'>Virtually try outfits before you buy with our AI-powered fitting room</p>
                    </div>
                    {/* Personalized Recommendations */}
                    <div className="feature text-center flex flex-col md:justify-center items-center flex-1 px-4 py-3 bg-white rounded-xl shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            className="md:w-24 w-8 h-12 mb-2"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2"
                        >
                            <path d="M32 8v48M8 32h48" />
                            <circle cx="32" cy="32" r="18" stroke="#10B981" />
                            <path d="M32 18a14 14 0 0 1 0 28" />
                        </svg>
                        <p className="text-sm text-gray-800 font-semibold">Personalized Picks</p>
                        <p className="md:text-sm text-[11px] text-gray-600">
                            Curated styles based on your preferences and past choices
                        </p>
                    </div>
                    <div className="feature max-md:mb-5 max-md:min-h-48 text-center flex flex-col md:justify-center items-center flex-1 px-4 py-1.5 bg-white rounded-lg shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
                        <img className="feature-image md:w-24 w-7 h-12 object-contain mb-1.5" src="/fast_deliver.svg" alt="Feature 2" />
                        <p className='text-sm text-gray-700 pb-0.5'><strong>3-6 Days Delivery</strong></p>
                        <p className='md:text-sm text-[11px] text-gray-700'>From your finger tip to your doorstep within 3-6 days</p>
                    </div>
                </section>

                {/* <!-- 3. A Section with Further Divisions (New Products, Latest Products, Recommended for You, etc.) --> */}
                <section className="product-sections mt-10">
                    <div className="product-category mb-10 new-products">
                        <h2 className='text-3xl font-bold mb-5 text-neutral-800'>New Products</h2>
                        {productsError && <p className="text-red-500">{productsError}</p>}
                        <div className="product-list flex overflow-x-auto gap-5 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {products.length === 0 ? (<p>No products available</p>) : (
                                products.map((product) => (
                                    <Link key={product.id} href={`/products/${product.id}`} className="block no-underline text-inherit" target="_blank">
                                        <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                            <img className='w-full h-auto rounded-lg mb-2.5' src={product.image} alt={product.name} />
                                            <h3 className='font-bold text-xl text-gray-800'>{product.name}</h3>
                                            <p className='text-gray-800 mb-5'>&#8377;{product.price}</p>
                                            <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300' onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
                                        </article>
                                    </Link>
                                ))
                            )}
                        </div >
                    </div >

                    <div className="product-category mb-10 latest-arrival">
                        <h2 className='text-3xl font-bold mb-5 text-neutral-800'>Latest Arrival</h2>
                        {latestError && <p className="text-red-500">{latestError}</p>}
                        <div className="product-list flex overflow-x-auto gap-5 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {latestProducts.length === 0 ? (<p>No products available</p>) : (
                                latestProducts.map((product) => (
                                    <Link key={product.id} href={`/products/${product.id}`} className="block no-underline text-inherit" target="_blank">
                                        <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                            <img className='w-full h-auto rounded-lg mb-2.5' src={product.image} alt={product.name} />
                                            <h3 className='font-bold text-xl text-gray-800'>{product.name}</h3>
                                            <p className='text-gray-800 mb-5'>&#8377;{product.price}</p>
                                            <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300' onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
                                        </article>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="product-category mb-10 recommended">
                        <h2 className='text-3xl font-bold mb-5 text-neutral-800'>Recommended for You</h2>
                        {productsError && <p className="text-red-500">{productsError}</p>}
                        <div className="product-list flex overflow-x-auto gap-5 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {products.length === 0 ? (<p>No products available</p>) : (
                                products.map((product) => (
                                    <Link key={product.id} href={`/products/${product.id}`} className="block no-underline text-inherit" target="_blank">
                                        <article className="product-card max-md:w-full bg-white p-5 rounded-lg shadow-md min-w-3xs text-center snap-start transition-transform duration-300 ease-in-out hover:scale-105">
                                            <img className='w-full h-auto rounded-lg mb-2.5' src={product.image} alt={product.name} />
                                            <h3 className='font-bold text-xl text-gray-800'>{product.name}</h3>
                                            <p className='text-gray-800 mb-5'>&#8377;{product.price}</p>
                                            <button className='bg-[#007bff] hover:bg-[#0056b3] text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300' onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
                                        </article>
                                    </Link>
                                ))
                            )}
                        </div >
                    </div>
                </section >
            </main >
        </>
    )
}

export default Home
