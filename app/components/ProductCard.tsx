"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "../contexts/CartContext"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({ ...product, quantity: 1 })
  }

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

