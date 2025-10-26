"use client"
import { fetchWithAuth } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Checkout = () => {
    const [cartItems, setCartItems] = useState({ items: [] })
    const [promoCode, setPromoCode] = useState("")
    const [totals, setTotals] = useState({ total: 0, discounted_total: 0 })
    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        city: "",
        postal_code: "",
        country: ""
    })
    const [paymentInfo, setPaymentInfo] = useState({
        card_number: "",
        expiry: "",
        cvv: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetchWithAuth(`cart/`)
                setCartItems(response)
                const total = response.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                setTotals({ total, discounted_total: total })
            } catch (err) {
                setError(err)
                console.log(err)
            }
        }
        fetchCart()
    }, [])

    const handleShippingChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
    }

    const handlePaymentChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value })
    }

    const handleSubmitOrder = async () => {
        try {
            setLoading(true)
            setError(null)
            const payload = {
                cart_items: cartItems.items.map(item => ({
                    product: item.product.id,
                    quantity: item.quantity
                })),
                promo_code: promoCode,
                shippingAddress,
                paymentInfo
            }
            const response = await fetchWithAuth(`orders/create/`, {
                method: "POST",
                body: JSON.stringify(payload)
            })
            if (response && response.order_id) {
                setSuccess(`Order placed successfully! Order ID: ${response.order_id}`)
                router.push("/myAccount")
            } else {
                setError("Failed to place order. Please try again.")
                setSuccess(null)
            }
        } catch (err) {
            setError(err)
            setSuccess(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="the-container flex bg-[linear-gradient(120deg,_#5e17eb,_#5f18eb66)]">
            <main className="flex-grow p-8 text-gray-800">
                <h2 className="text-2xl font-semibold mb-6 text-white">Checkout</h2>
                {error && <p className="text-red-500 mb-4">{JSON.stringify(error)}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cart Items */}
                    <div className="card bg-white p-5 rounded-md shadow-xl">
                        <h3 className="mb-2.5 font-bold text-lg text-slate-700">Cart Items</h3>
                        {cartItems.items.length != 0 ? (
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-3 px-4 text-center font-semibold">Product</th>
                                        <th className="py-3 px-4 text-center font-semibold">Quantity</th>
                                        <th className="py-3 px-4 text-center font-semibold">Price</th>
                                        <th className="py-3 px-4 text-center font-semibold">Discounted Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.items.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="backdrop-blur-sm"
                                        >
                                            <td className="py-2 px-4 flex items-center">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover mr-4"
                                                />
                                                {item.product.name}
                                            </td>
                                            <td className="py-2 px-4 text-center">{item.quantity}</td>
                                            <td className="py-2 px-4 text-center">₹{(item.product.price * item.quantity).toFixed(2)}</td>
                                            <td className="py-2 px-4 text-center">
                                                {item.product.discounted_price
                                                    ? `₹${(item.product.discounted_price * item.quantity).toFixed(2)}`
                                                    : "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-700">Cart is empty.</p>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="card bg-white p-5 rounded-md shadow-xl">
                        <h3 className="mb-2.5 font-bold text-lg text-slate-700">Order Summary</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Promo Code</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        placeholder="Enter promo code"
                                        className="border p-2 w-full rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={shippingAddress.address}
                                    onChange={handleShippingChange}
                                    placeholder="Address"
                                    className="border p-2 w-full rounded-md mb-2"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleShippingChange}
                                    placeholder="City"
                                    className="border p-2 w-full rounded-md mb-2"
                                />
                                <input
                                    type="text"
                                    name="postal_code"
                                    value={shippingAddress.postal_code}
                                    onChange={handleShippingChange}
                                    placeholder="Postal Code"
                                    className="border p-2 w-full rounded-md mb-2"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={shippingAddress.country}
                                    onChange={handleShippingChange}
                                    placeholder="Country"
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Payment Info</label>
                                <input
                                    type="text"
                                    name="card_number"
                                    value={paymentInfo.card_number}
                                    onChange={handlePaymentChange}
                                    placeholder="Card Number"
                                    className="border p-2 w-full rounded-md mb-2"
                                />
                                <input
                                    type="text"
                                    name="expiry"
                                    value={paymentInfo.expiry}
                                    onChange={handlePaymentChange}
                                    placeholder="MM/YY"
                                    className="border p-2 w-full rounded-md mb-2"
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    value={paymentInfo.cvv}
                                    onChange={handlePaymentChange}
                                    placeholder="CVV"
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-700">Original Total: <span className="font-bold">₹{Number(totals.total).toFixed(2)}</span></p>
                                <p className="text-sm text-gray-700">Discounted Total: <span className="font-bold text-green-600">₹{Number(totals.discounted_total).toFixed(2)}</span></p>
                            </div>
                            <button
                                onClick={handleSubmitOrder}
                                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                disabled={cartItems.length === 0 || loading}
                            >
                                {loading ? "Placing Order..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Checkout
