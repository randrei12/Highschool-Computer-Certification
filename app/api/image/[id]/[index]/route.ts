import { productsCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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
            ...(index !== "preview" ? {
                images: {
                    $slice: [+index, 1]
                },
                preview: 0
            } : {
                images: 0
            }),
            name: 0,
            price: 0,
            description: 0,
            _id: 0
        }
    });

    if (!project || (index === "preview" && !project.preview) || (index !== "preview" && project.images.length === 0)) {
        const buffer = await fs.readFile(path.join(process.cwd(), "public/placeholder.svg"));
        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "image/svg+xml"
            }
        });
    }

    const image = project.images?.[0] || project.preview;
    let type = image.substring(image.indexOf(":") + 1, image.indexOf(";"));
    let base64 = image.substring(image.indexOf(",") + 1);
    let buffer = Buffer.from(base64, "base64");
    
    return new NextResponse(buffer, {
        headers: {
            "Content-Type": type
        }
    });
}