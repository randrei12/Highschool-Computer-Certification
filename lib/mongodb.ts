import { MongoClient, ObjectId } from "mongodb";

console.log(process.env.MONGO);
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
    
}
export const ordersCollection = db.collection("orders");