"use client"

import { useCart } from "../contexts/CartContext"
import Image from "next/image"
import { Plus, Minus, X } from "lucide-react"

export default function CartContents() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty</p>
  }

  return (
    <div>
      <div className="space-y-8">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-md"
            />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Minus size={16} />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 mt-2">
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  )
}

