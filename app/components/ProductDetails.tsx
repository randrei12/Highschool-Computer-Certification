"use client"

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/lib/mongodb";

export default function ProductDetails({
    product,
    imagesLength
}: {
    product: Product,
    imagesLength: number
}) {
    const [currentImage, setCurrentImage] = useState(0);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product._id.toString())
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                        src={`/api/image/${product._id.toString()}/${currentImage}`}
                        width={600}
                        height={600}
                        className="w-full aspect-square object-center object-cover"
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: imagesLength }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ${currentImage === index ? "ring-2 ring-indigo-500" : ""
                                }`}
                        >
                            <img
                                src={`/api/image/${product._id.toString()}/${index}`}
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

