'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Search = () => {
    const [results, setResults] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return
            setLoading(true)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`)
                if (!response.ok) throw new Error('Failed to fetch search results')
                const data = await response.json()
                setResults(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchResults()
    }, [query])

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Search Results for &apos;{query}&apos;</h1>
            {loading && <p>Loading...</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {results.length === 0 && !loading && !error && <p>No products found.</p>}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {results.map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id} target='_blank'>
                        <div key={product.id} className='border p-4 rounded-md'>
                            <img src={product.image} alt={product.name} className='w-full h-48 object-cover mb-2' />
                            <h2 className='text-lg font-semibold'>{product.name}</h2>
                            <p>₹{Number(product.price).toFixed(2)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Search
