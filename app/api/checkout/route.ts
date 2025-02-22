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
    const x = cookie.get("cart")!.value;
    console.log(x);
}