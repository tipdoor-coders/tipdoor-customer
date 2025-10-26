"use client"
import { fetchWithAuth } from "@/lib/api"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { initiateFashnJob, getFashnJobStatus, toBase64 } from "@/lib/tryOnApi"

const ProductDetails = () => {
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const [userImage, setUserImage] = useState(null)
    const [tryOnResult, setTryOnResult] = useState(null)
    const [tryOnLoading, setTryOnLoading] = useState(false)


    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`)
                if (!response.ok) throw new Error("Failed to fetch product")
                const data = await response.json()
                setProduct(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = async () => {
        try {
            const response = await fetchWithAuth("cart/add/", {
                method: "POST",
                body: JSON.stringify({ product_id: product.id })
            })
            console.log("Added to cart:", response)
        } catch (err) {
            console.error(err)
            alert("Failed to add to cart.")
        }
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUserImage(e.target.files[0])
            setTryOnResult(null)
        }
    }

    const handleTryOn = async () => {
        if (!userImage || !product) {
            setError("Please upload an image")
            return
        }
        setTryOnLoading(true)
        setError(null)
        try {
            // Convert images to base64
            const modelImageBase64 = await toBase64(userImage)
            const garmentBase64 = await toBase64(product.image)

            // Initiate try-on job
            const jobParams = {
                modelImageBase64,
                garmentBase64,
                category: "auto", // Adjust based on product type if available
                mode: "balanced",
                segmentation_free: false,
                num_samples: 1,
            }
            const jobResult = await initiateFashnJob(jobParams)
            if (!jobResult.success) {
                throw new Error(jobResult.error)
            }

            // Poll job status
            let statusResult
            const maxAttempts = 30
            let attempts = 0
            while (attempts < maxAttempts) {
                statusResult = await getFashnJobStatus(jobResult.jobId)
                if (!statusResult.success) {
                    throw new Error(statusResult.error)
                }
                if (statusResult.status === "completed") {
                    setTryOnResult(statusResult.imageUrl)
                    break
                }
                if (statusResult.status === "failed") {
                    throw new Error(statusResult.error || "Try-on job failed")
                }
                await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds
                attempts++
            }
            if (attempts >= maxAttempts) {
                throw new Error("Try-on job timed out")
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setTryOnLoading(false)
        }
    }

    if (loading) return <div className="container mx-auto p-4">Loading...</div>
    if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>
    if (!product) return <div className="container mx-auto p-4">Product not found</div>

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-md mb-4"
                    />
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Upload Your Photo for Try-On</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e17eb]"
                        />
                        <button
                            onClick={handleTryOn}
                            disabled={tryOnLoading}
                            className={`px-6 py-3 bg-[#5e17eb] text-white rounded-md hover:bg-[#4b12c2] transition-colors duration-200 ${tryOnLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {tryOnLoading ? "Processing..." : "Try On"}
                        </button>
                    </div>
                    {tryOnResult && (
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold mb-2">Try-On Result</h2>
                            <img
                                src={tryOnResult}
                                alt="Try-on result"
                                className="w-full h-96 object-cover rounded-md"
                            />
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="mb-4">
                        {product.discounted_price ? (
                            <>
                                <p className="text-xl font-bold text-green-600">
                                    ₹{Number(product.discounted_price).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-400 line-through">
                                    ₹{Number(product.price).toFixed(2)}
                                </p>
                                {product.promotion && (
                                    <p className="text-sm text-yellow-400 mt-1">
                                        Use code <span className="font-semibold">{product.promotion.promo_code}</span> for{" "}
                                        {product.promotion.discount_type === "percentage"
                                            ? `${product.promotion.discount_value}% off`
                                            : `₹${product.promotion.discount_value} off`}
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className="text-xl font-bold text-[#5e17eb]">
                                ₹{Number(product.price).toFixed(2)}
                            </p>
                        )}
                    </div>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <button
                        onClick={handleAddToCart}
                        className="px-6 py-3 bg-[#5e17eb] text-white rounded-md hover:bg-[#4b12c2] transition-colors duration-200"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
