import { cookies } from "next/headers";
import CheckoutForm from "../components/CheckoutForm"
import { Product, productsCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function CheckoutPage() {
    const products = await (async () => {
        const cookie = await cookies();
        const cartCookie = cookie.get("cart");

        if (cartCookie) {
            const entries = Object.keys(JSON.parse(cartCookie.value)[0]).map(key => new ObjectId(key));
            const products = await productsCollection.find({ _id: { $in: entries } }).toArray();

            const productsObj: Record<string, Product> = {};

            for (const product of products) {
                product._id = product._id.toString() as any;
                productsObj[product._id as any] = product;
            }

            return productsObj;
        } else return {};
    })();

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <CheckoutForm products={products} />
        </div>
    );
}

