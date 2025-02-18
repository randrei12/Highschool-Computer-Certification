import Link from "next/link"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  images: string[]
}

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-center object-cover group-hover:opacity-75 transition duration-300"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

