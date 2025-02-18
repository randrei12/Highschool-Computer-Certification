import CartContents from "../components/CartContents"
import Link from "next/link"

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <CartContents />
      <div className="mt-8 flex justify-end">
        <Link
          href="/checkout"
          className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Go to Checkout
        </Link>
      </div>
    </div>
  )
}

