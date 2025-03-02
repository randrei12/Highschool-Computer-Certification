import { Input } from "@/components/ui/input"
import { productsCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"
import { ImageUpload } from "./imageUpload"
import { revalidatePath } from "next/cache"
import sharp from "sharp";

async function generatePreview(imgBase64: string) {
    const base64 = imgBase64.substring(imgBase64.indexOf(",") + 1);
    const buffer = Buffer.from(base64, "base64");

    const resBuffer = await sharp(buffer).resize(300, null).toBuffer();
    return `data:image/png;base64,${resBuffer.toString("base64")}`;
}

async function productAction(formData: FormData, id: string) {
    const name = formData.get("name")!.toString();
    const price = +formData.get("price")!.toString();
    const description = formData.get("description")!.toString();
    const images: string[] = JSON.parse(formData.get("images")!.toString());

    if (id === "new") await productsCollection.insertOne({
        name,
        price,
        description,
        images,
        preview: await generatePreview(images[0]),
        _id: new ObjectId()
    });
    else {
        const dbImages = await productsCollection.findOne({ _id: new ObjectId(id) })?.then(product => product?.images);
        if (!dbImages) return new Response(null, { status: 404 });

        let setImages = [];
        for (const image of images) {
            if (image.startsWith("/api/image")) {
                const index = image.substring(image.lastIndexOf("/") + 1);
                setImages.push(dbImages[+index]);
            } else {
                setImages.push(image);
            }
        }

        const preview = await generatePreview(setImages[0]);
        
        await productsCollection.updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                name,
                price,
                description,
                preview,
                images: setImages,
            }
        });
        revalidatePath(`/api/image/${id}/[index]`);
    }

    redirect("/dashboard");
}

export default async function ProductForm({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let product: { imagesLength: number, name: string, price: number, description: string } | null = null;
    if (id !== "new") {
        product = await productsCollection.aggregate([
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $project: {
                    imagesLength: {
                        $size: "$images"
                    },
                    name: 1,
                    price: 1,
                    description: 1
                }
            }
        ]).next() as any;
    }
    
    if (!product && id !== "new") return <h1>Produsul nu a fost găsit.</h1>;

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
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Imagini
                    </label>
                    <ImageUpload id={id} imagesLength={product?.imagesLength} />
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

