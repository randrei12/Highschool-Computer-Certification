import { getProductsByIds, Product } from "@/lib/mongodb";
import { cookies } from "next/headers";
import Link from "next/link";
import CartContents from "../components/CartContents";

export default async function CartPage() {
    const productsObj = await (async () => {
        const cookie = await cookies();
        const cartCookie = cookie.get("cart");

        if (cartCookie) {
            const entries = Object.keys(JSON.parse(cartCookie.value)[0]);
            const products = await getProductsByIds(entries, {
                name: 1,
                price: 1
            });
    
            const productsObj: Record<string, Product> = {};
            
            for (const product of products) {
                product._id = product._id.toString() as any;
                productsObj[product._id as any] = product;
            }
    
            return productsObj;
        }
    })();
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Coșul meu</h1>
            <CartContents products={productsObj} />
            {productsObj && Object.keys(productsObj).length > 0 && (
                <div className="mt-8 flex justify-end">
                    <Link
                        href="/checkout"
                        className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                    >
                        Finalizează comanda
                    </Link>
                </div>
            )}
        </div>
    );
}