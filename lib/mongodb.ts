import { MongoClient, ObjectId } from "mongodb";

export const mongo = new MongoClient(process.env.MONGO!);
export const db = mongo.db();

export type Product = {
    _id: ObjectId,
    name: string,
    description: string,
    price: number,
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