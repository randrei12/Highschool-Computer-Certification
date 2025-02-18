"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import Link from "next/link"

export default function Header() {
    const { cart } = useCart();

    const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm">
            <nav className="mx-auto px-4 md:px-6 lg:px-10 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-10">
                    <Link href="/" className="text-gray-600 hover:text-gray-900">
                        Acasă
                    </Link>
                    <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                        Dashboard
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/cart" className="text-gray-600 hover:text-gray-900 relative">
                        <ShoppingCart size={24} />
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
}