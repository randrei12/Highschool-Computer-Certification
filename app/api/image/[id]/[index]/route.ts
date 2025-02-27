import { productsCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
    request: Request, 
    {
        params
    }: {
        params: Promise<{
            id: string,
            index: string
        }>
    }
) {
    const { id, index } = await params;

    const project = await productsCollection.findOne({
        _id: new ObjectId(id)
    }, {
        projection: {
            images: {
                $slice: [+index, 1]
            },
            name: 0,
            price: 0,
            description: 0,
            _id: 0
        }
    });

    if (!project || project.images.length === 0) {
        return new NextResponse(null, {
            status: 404
        });
    }

    const [image] = project.images;
    let type = image.substring(image.indexOf(":") + 1, image.indexOf(";"));
    let base64 = image.substring(image.indexOf(",") + 1);
    let buffer = Buffer.from(base64, "base64");
    
    return new NextResponse(buffer, {
        headers: {
            "Content-Type": type
        }
    });
}