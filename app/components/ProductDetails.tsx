"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/lib/mongodb"

export default function ProductDetails({ product }: { product: Product }) {
    const [currentImage, setCurrentImage] = useState(0);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
        });
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                        src={product.images[currentImage] || "/placeholder.svg"}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="w-full aspect-square object-center object-cover"
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ${currentImage === index ? "ring-2 ring-indigo-500" : ""
                                }`}
                        >
                            <Image
                                src={image || "/placeholder.svg"}
                                alt={`${product.name} ${index + 1}`}
                                width={150}
                                height={150}
                                className="w-full aspect-square object-center object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-xl font-semibold">{product.price.toFixed(2)} RON</p>
                <p className="text-gray-600">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                >
                    Adaugă în coș
                </button>
            </div>
        </div>
    )
}

