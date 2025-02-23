import { ordersCollection } from "@/lib/mongodb";

export default async function OrderList() {
    const orders = await ordersCollection.find({}).toArray().then(orders => orders.map(order => ({ ...order, _id: order._id.toString() })));

    return (
        <ul className="space-y-4">
            {orders.length > 0 ? orders.map(order => {
                const id = order._id.toString();
                
                return (
                    <li key={id} className="bg-white p-4 rounded-md shadow">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Comanda #{id.toUpperCase()}</span>
                        </div>
                        <p className="text-gray-600">{order.firstName} {order.lastName}</p>
                        <p className="text-gray-600">{order.email}</p>
                        <p className="text-gray-600">{order.address} {order.zipCode}</p>
                        <p className="text-gray-600">{order.city}</p>
                        <br />
                        {order.products.map(product => (
                            <p className="text-gray-600">{product.quantity} &times; {product.name}: <span className="text-gray-800 font-medium">{product.quantity * product.price} RON</span> ({product.quantity} &times; {product.price} RON)</p>
                        ))}
                        <br />
                        <p className="text-gray-800 font-medium">Total: {order.products.map(product => product.price * product.quantity).reduce((a, b) => a + b, 0)} RON</p>
                    </li>
                );
            }) : <p className="text-center text-gray-500">Nu există comenzi</p>}    
        </ul>
    );
}