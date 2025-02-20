"use client"

import Image from "next/image"
import { Plus, Minus, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useMemo, useRef } from "react"
import { Product } from "@/lib/mongodb"

export default function CartContents({
    products
}: {
    products: Record<string, Product> | undefined
}) {
    const { total, cart, removeFromCart, deleteFromCart, addToCart } = useCart();
    const prices = useMemo(() => {
        const prices: Record<string, number> = {};
        Object.keys(cart).forEach(id => {
            prices[id] = products![ id].price * cart[id];
        }, [cart])
        return prices;
    }, [cart]);
    const totalPrice = useMemo(() => Object.values(prices).reduce((a, b) => a + b, 0), [prices]);

    if (cart.length === 0) {
        return <p className="text-center text-gray-500">Your cart is empty</p>
    }

    return (
        <div>
            <div className="space-y-8">
                {products && Object.keys(cart).map(id => (
                    <div key={id} className="flex items-center space-x-4 border-b pb-4">
                        <Image
                            src={products[id].images[0] || "/placeholder.svg"}
                            alt={products[id].name}
                            width={80}
                            height={80}
                            className="rounded-md"
                        />
                        <div className="flex-grow">
                            <h3 className="font-semibold">{products[id].name}</h3>
                            <p className="text-gray-600">{products[id].price.toFixed(2)} RON</p>
                            <div className="flex items-center mt-2">
                                <button
                                    onClick={() => removeFromCart(id)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="mx-2">{cart[id]}</span>
                                <button
                                    onClick={() => addToCart(id)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">{prices[id].toFixed(2)} RON</p>
                            <button onClick={() => deleteFromCart(id)} className="text-red-500 hover:text-red-700 mt-2">
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-right">
                <p className="text-xl font-bold">Total: {totalPrice.toFixed(2)} RON</p>
            </div>
        </div>
    )
}