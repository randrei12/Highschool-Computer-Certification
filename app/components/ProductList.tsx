"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Trash } from "lucide-react"

interface Product {
    id: number
    name: string
    price: number
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        // Fetch products from API
        // This is a placeholder. Replace with actual API call.
        const fetchProducts = async () => {
            const res = await fetch("/api/products")
            const data = await res.json()
            setProducts(data)
        }
        fetchProducts()
    }, [])

    const handleDeleteProduct = async (id: number) => {
        // Delete product from API
        // This is a placeholder. Replace with actual API call.
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
        if (res.ok) {
            setProducts(products.filter((p) => p.id !== id))
        }
    }

    return (
        <ul className="space-y-4">
            {products.map((product) => (
                <li key={product.id} className="flex items-center justify-between bg-white p-4 rounded-md shadow">
                    <span>
                        {product.name} - ${product.price.toFixed(2)}
                    </span>
                    <div>
                        <Link href={`/dashboard/product/${product.id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                            <Edit size={20} />
                        </Link>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                            <Trash size={20} />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

