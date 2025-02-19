import { productsCollection } from "@/lib/mongodb";
import ProductCard from "./components/ProductCard";

const getProducts = async () => {
    const products = (await productsCollection.find({}).toArray()).map(product => ({ ...product, _id: product._id.toString() }));
    return products;
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
                            product={product as any}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

