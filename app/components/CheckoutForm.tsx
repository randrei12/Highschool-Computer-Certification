"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Product } from "@/lib/mongodb"

export default function CheckoutForm({
    total
}: {
    total: number
}) {
    const { emptyCart } = useCart();
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        country: "",
        zipCode: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const data = new FormData(e.target as any);

        const res = await fetch("/api/checkout", {
            method: "POST",
            body: data,
        });
        return;
        console.log(data);
        
        emptyCart()
        router.push("/") // Redirect to home page after order
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Prenume
                    </label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="rounded-lg border-gray-300 shadow-sm focus:ring-opacity-50 h-10 bg-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nume
                    </label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="rounded-lg border-gray-300 shadow-sm focus:ring-opacity-50 h-10 bg-white"
                        required
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-opacity-50 h-10 bg-white"
                    required
                />
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresă
                </label>
                <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-opacity-50 h-10 bg-white"
                    required
                />
            </div>
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Oraș
                </label>
                <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-opacity-50 h-10 bg-white"
                    required
                />
            </div>
            <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Cod Poștal
                </label>
                <Input
                    type="number"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-opacity-50 h-10 bg-white"
                    required
                />
            </div>
            <div className="font-bold text-xl mt-4">Total: {total.toFixed(2)} RON</div>
            <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition duration-300"
            >
                Plasează comanda
            </button>
        </form>
    )
}

