'use client'
import { registerUser } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

const Register = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password != formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }
        setLoading(true)
        setError(null)
        try {
            await registerUser(formData.username, formData.password, formData.email, formData.name)
            router.push(`/home`)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Create an Account</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e17eb]"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e17eb]"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e17eb]"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e17eb]"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e17eb]"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`p-2 bg-[#5e17eb] text-white rounded-md hover:bg-[#4b12c2] transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className="mt-4 text-center">
                Already have an account?{' '}
                <Link href="/login" className="text-[#5e17eb] hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    )
}

export default Register
