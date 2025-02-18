import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { productsCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { Input } from "@/components/ui/input"
import { ImageUpload } from "./imageUpload"

interface Product {
    id: number
    name: string
    price: number
    description: string
    images: string[]
}

async function productAction(formData: FormData, id: string) {
    console.log((new Date()).toString());
    const formDataArray = Array.from(formData.entries()).map(([key, value]) => ({ key, value: value.toString() }));
    console.log(formDataArray);

    return new Response(undefined, { status: 204 });

}

export default async function ProductForm({ params: { id } }: { params: { id: string } }) {
    const product = id !== "new" ? await productsCollection.findOne({ _id: new ObjectId(id) }) : null;
    if (!product && id !== "new") return <h1>Produsul nu a fost găsit.</h1>;

    // const router = useRouter()
    // const [product, setProduct] = useState<Product>({
    //     id: 0,
    //     name: "",
    //     price: 0,
    //     description: "",
    //     images: [],
    // })

    // useEffect(() => {
    //     if (params.id !== "new") {
    //         // Fetch product data from API
    //         // This is a placeholder. Replace with actual API call.
    //         const fetchProduct = async () => {
    //             const res = await fetch(`/api/products/${params.id}`)
    //             const data = await res.json()
    //             setProduct(data)
    //         }
    //         fetchProduct()
    //     }
    // }, [params.id])

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = e.target
    //     setProduct((prev) => ({ ...prev, [name]: value }))
    // }

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files
    //     if (files) {
    //         const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    //         setProduct((prev) => ({ ...prev, images: [...prev.images, ...newImages] }))
    //     }
    // }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">{id === "new" ? "Adaugă Produs" : "Modifică Produs"}</h1>
            <form
                action={async formData => {
                    "use server";
                    await productAction(formData, id)
                }}
                className="space-y-4"
            >
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nume Produs
                    </label>
                    <Input
                        id="name"
                        name="name"
                        className="rounded-lg border-gray-300 shadow-sm focus:ring-opacity-50 h-10 bg-white"
                        defaultValue={product?.name}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Preț
                    </label>
                    <Input
                        type="number"
                        id="price"
                        name="price"
                        className="rounded-lg border-gray-300 shadow-sm focus:ring-opacity-50 h-10 bg-white"
                        defaultValue={product?.price}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Descriere
                    </label>
                    <Input
                        id="description"
                        name="description"
                        className="rounded-lg border-gray-300 shadow-sm focus:ring-opacity-50 h-10 bg-white"
                        defaultValue={product?.description}
                        required
                    />
                </div>
                {/* <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                        Imagini
                    </label>
                    <Input
                        type="file"
                        id="description"
                        name="description"
                        className="rounded-lg border-gray-300 shadow-sm focus:ring-opacity-50 h-10 bg-white"
                        accept="image/*"
                        multiple
                        required
                    />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {product?.images.map((image, index) => (
                        <Image
                            key={index}
                            src={`data:image/png;base64,${image}`}
                            alt={`Imaginea ${index + 1}`}
                            width={100}
                            height={100}
                            className="object-cover rounded"
                        />
                    ))}
                </div> */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Imagini
                    </label>
                    <ImageUpload images={product?.images} />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                >
                    {id === "new" ? "Adaugă Produs" : "Modifică Produs"}
                </button>
            </form>
        </div>
    )
}

