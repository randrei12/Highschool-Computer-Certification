import { cookies } from "next/headers";
import CartContents from "../components/CartContents"
import Link from "next/link"
import { Product, productsCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function CartPage() {
    const products = await (async () => {
        const cookie = await cookies();
        const cartCookie = cookie.get("cart");

        if (cartCookie) {
            const entries = Object.keys(JSON.parse(cartCookie.value)).map(key => new ObjectId(key));
            const products = await productsCollection.find({ _id: { $in: entries } }).toArray();
    
            const productsObj: Record<string, Product> = {};
            
            for (const product of products) {
                productsObj[product._id.toString()] = product;
            }
    
            return productsObj;
        }
    })();
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <CartContents products={products} />
            <div className="mt-8 flex justify-end">
                <Link
                    href="/checkout"
                    className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                >
                    Go to Checkout
                </Link>
            </div>
        </div>
    );
}