import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "./contexts/CartContext"
import CartSidebar from "./components/CartSidebar"
import Header from "./components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Modern Online Store",
    description: "Shop the latest trends in our modern online store",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <CartProvider>
                    <Header />
                    <main>{children}</main>
                    <CartSidebar />
                </CartProvider>
            </body>
        </html>
    )
}

