import { productsCollection } from "@/lib/mongodb";
import ProductCard from "./components/ProductCard";

const getProducts = async () => {
    const products = await productsCollection.find({}).toArray();
    return products;

    // Replace this with an actual API call
    // return [
    //     { id: 1, name: "Classic White T-Shirt", price: 29.99, image: "/placeholder.svg?height=300&width=300" },
    //     { id: 2, name: "Product 2", price: 39.99, image: "/placeholder.svg?height=300&width=300" },
    //     { id: 3, name: "Product 3", price: 49.99, image: "/placeholder.svg?height=300&width=300" },
    //     { id: 3, name: "Product 3", price: 49.99, image: "/placeholder.svg?height=300&width=300" },
    //     { id: 4, name: "Product 4", price: 59.99, image: "/placeholder.svg?height=300&width=300" },
    // ]
}

export default async function Home() {
    const products = await getProducts();

    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard
                            key={product._id.toString()}
                            product={product}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

