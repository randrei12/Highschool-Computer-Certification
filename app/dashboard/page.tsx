import { Product as ProductType, productsCollection } from "@/lib/mongodb";
import { Edit } from "lucide-react";
import Link from "next/link";
import OrderList from "../components/OrderList";
import { Delete } from "./delete";

export default async function DashboardPage() {
    // const products: any[] = [];
    const products = await productsCollection.find({}, {
        projection: {
            name: 1,
            price: 1
        }
    }).toArray();

    

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Produse</h2>
                        <Link
                            href="/dashboard/product/new"
                            className="bg-gray-900 text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition duration-300"

                        >
                            Adaugă Produs
                        </Link>
                    </div>
                    <ul className="space-y-4">
                        {products.map(product => <Product key={product._id.toString()} product={product} />)}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Comenzi</h2>
                    <OrderList />
                </div>
            </div>
        </div>
    );
}

function Product({
    product
}: {
    product: ProductType
}) {
    const id = product._id.toString();

    return (
        <li
            className="flex items-center justify-between bg-white p-4 rounded-md shadow"
        >
            <span>
                {product.name} - {product.price.toFixed(2)} RON
            </span>
            <div className="flex">
                <Link href={`/dashboard/product/${id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                    <Edit size={20} />
                </Link>
                <Delete id={id} />
            </div>
        </li>
    );
}