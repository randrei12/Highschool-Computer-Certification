import { MongoClient, ObjectId } from "mongodb";

export const mongo = new MongoClient(process.env.MONGO!);
export const db = mongo.db();

export type Product = {
    _id: ObjectId,
    name: string,
    description: string,
    price: number,
    preview: string,
    images: string[]
}
export const productsCollection = db.collection<Product>("products");

export type Order = {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    zipCode: number,
    products: Array<{
        id: string,
        name: string,
        quantity: number,
        price: number
    }>,
    total: number
}
export const ordersCollection = db.collection<Order>("orders");

export async function getProductsByIds(ids: (ObjectId | string)[], projection?: Partial<Record<keyof Product, 1 | Record<string, any>>>) {
    const $ids = ids.map(id => new ObjectId(id));
    
    const products = await productsCollection.find({
        _id: {
            $in: $ids
        }
    }, {
        projection
    }).toArray();

    return products;
}