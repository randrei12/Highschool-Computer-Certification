import { cookies } from "next/headers";
import CheckoutForm from "../components/CheckoutForm"
import { getProductsByIds, Product, productsCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
    const total = await (async () => {
        const cookie = await cookies();
        const cartCookie = cookie.get("cart");

        let total = 0;

        if (cartCookie) {
            const cartItems: Record<string, number> = JSON.parse(cartCookie.value)[0];
            const entries = Object.keys(cartItems).map(key => new ObjectId(key));
            const products = await getProductsByIds(entries, {
                price: 1
            });

            for (const product of products) {
                const id = product._id.toString();
                total += cartItems[id] * product.price; 
            }
        }

        return total;
    })();

    if (total === 0) {
        redirect("/cart");
        return;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Finalizează Comanda</h1>
            <CheckoutForm total={total} />
        </div>
    );
}