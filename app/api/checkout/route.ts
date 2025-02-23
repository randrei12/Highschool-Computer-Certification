import { getProductsByIds, ordersCollection } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const firstName = formData.get("firstName")!.toString();
    const lastName = formData.get("lastName")!.toString();
    const email = formData.get("email")!.toString();
    const address = formData.get("address")!.toString();
    const city = formData.get("city")!.toString();
    const zipCode = +formData.get("zipCode")!.toString();
    
    const cookie = await cookies();
    const [productsIds, total] = JSON.parse(cookie.get("cart")!.value) as [Record<string, number>, number];

    const products = await getProductsByIds(Object.keys(productsIds), {
        name: 1,
        price: 1
    });

    await ordersCollection.insertOne({
        firstName,
        lastName,
        email,
        address,
        city,
        zipCode,
        products: products.map(product => {
            const id = product._id.toString();
            
            return {
                id,
                name: product.name,
                price: product.price,
                quantity: productsIds[id]
            }
        }),
        total
    });

    return new Response(null, { status: 201 });
}