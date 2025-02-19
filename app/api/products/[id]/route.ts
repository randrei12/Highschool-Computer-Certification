import { productsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await productsCollection.deleteOne({ _id: new ObjectId(id) });
    revalidatePath("/dashboard");

    return new Response(null, { status: 200 });
}