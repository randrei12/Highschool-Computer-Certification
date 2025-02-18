import { notFound } from "next/navigation"
import ProductDetails from "../../components/ProductDetails"
import RelatedProducts from "../../components/RelatedProducts"

// This would typically come from your Shopify API
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    description:
      "A timeless classic, our white t-shirt is made from 100% organic cotton for ultimate comfort and style. Perfect for any casual occasion.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600&text=Image+2",
      "/placeholder.svg?height=600&width=600&text=Image+3",
      "/placeholder.svg?height=600&width=600&text=Image+4",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
  },
  { id: 2, name: "Product 2", price: 39.99, images: ["/placeholder.svg?height=300&width=300"] },
  { id: 3, name: "Product 3", price: 49.99, images: ["/placeholder.svg?height=300&width=300"] },
  { id: 4, name: "Product 4", price: 59.99, images: ["/placeholder.svg?height=300&width=300"] },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProductDetails product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

