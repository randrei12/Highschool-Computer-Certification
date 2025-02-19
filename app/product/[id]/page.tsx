import { notFound } from "next/navigation"
import ProductDetails from "../../components/ProductDetails"
import { productsCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const _id = new ObjectId(id);
    const product = await productsCollection.findOne({ _id });
    // @ts-ignore
    product._id = id;

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <ProductDetails product={product} />
        </div>
    );
}