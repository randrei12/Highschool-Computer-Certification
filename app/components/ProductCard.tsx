"use client"

import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/lib/mongodb"
import { useRef, MouseEvent, useState, useEffect } from "react"
import { Camera } from "lucide-react"

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [imageLoaded, setImageLoaded] = useState(false);
    const ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (ref.current?.complete) {
            setImageLoaded(true);
        }
    }, [ref.current]);

    const handleAddToCart = (e: MouseEvent) => {
        e.preventDefault();
        addToCart(product._id.toString());
    }

    return (
        <Link href={`/product/${product._id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                    src={`/api/image/${product._id}/preview`}
                    onLoad={() => setImageLoaded(true)}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                    ref={ref}
                    style={{ display: imageLoaded ? "block" : "none" }}
                />
                {!imageLoaded && (
                    <div role="status" className="w-full h-64 object-cover space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                        <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
                            <Camera className="w-10 h-10 text-gray-200 dark:text-gray-600" />
                        </div>
                    </div>
                )}
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600">{product.price.toFixed(2)} RON</p>
                    <button
                        onClick={handleAddToCart}
                        className="mt-4 w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
                    >
                        Adaugă în coș
                    </button>
                </div>
            </div>
        </Link>
    )
}

