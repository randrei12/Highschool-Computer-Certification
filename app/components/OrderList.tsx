"use client"

import { useState } from "react"

// This would typically come from your API
const initialOrders = [
  { id: 1, customerName: "John Doe", total: 59.98, status: "Pending" },
  { id: 2, customerName: "Jane Smith", total: 129.97, status: "Shipped" },
  { id: 3, customerName: "Bob Johnson", total: 89.99, status: "Delivered" },
]

export default function OrderList() {
  const [orders] = useState(initialOrders)

  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.id} className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Order #{order.id}</span>
            <span
              className={`px-2 py-1 rounded ${
                order.status === "Pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : order.status === "Shipped"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-green-200 text-green-800"
              }`}
            >
              {order.status}
            </span>
          </div>
          <p className="text-gray-600">{order.customerName}</p>
          <p className="text-gray-800 font-medium">Total: ${order.total.toFixed(2)}</p>
        </li>
      ))}
    </ul>
  )
}

