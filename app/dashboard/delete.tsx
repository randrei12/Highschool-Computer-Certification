import { revalidatePath } from "next/cache";
import { Trash } from "lucide-react";

export function Delete({
    id
}: {
    id: string
}) {
    async function handleDeleteProduct() {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

        if (res.ok) {
            revalidatePath("/dashboard");
        }
    }

    return (
        <button onClick={handleDeleteProduct} className="text-red-500 hover:text-red-700">
            <Trash size={20} />
        </button>
    );
}