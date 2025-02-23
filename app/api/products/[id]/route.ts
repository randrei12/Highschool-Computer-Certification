import { productsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const cookie = await cookies();
    if (cookie.get("cart")) {
        let [productsIds, total] = JSON.parse(cookie.get("cart")!.value) as [Record<string, number>, number];
        for (const products of Object.keys(productsIds)) {
            if (products === id) {
                total -= productsIds[products];
                delete productsIds[products];
                break;
            }
        }

        console.log(productsIds, total);

        cookie.set("cart", JSON.stringify([productsIds, total]), {
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });
    }

    await productsCollection.deleteOne({ _id: new ObjectId(id) });
    revalidatePath("/dashboard");

    return new Response(null, { status: 200 });
}