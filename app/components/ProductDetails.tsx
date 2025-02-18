"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "../contexts/CartContext"

interface Product {
  id: number
  name: string
  price: number
  description: string
  images: string[]
  sizes?: string[]
  colors?: string[]
}

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0])
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0])
  const [currentImage, setCurrentImage] = useState(0)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={product.images[currentImage] || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ${
                currentImage === index ? "ring-2 ring-indigo-500" : ""
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-full object-center object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-gray-600">{product.description}</p>
        {product.sizes && (
          <div>
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    selectedSize === size ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        {product.colors && (
          <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border ${selectedColor === color ? "ring-2 ring-indigo-500" : ""}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                >
                  <span className="sr-only">{color}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

