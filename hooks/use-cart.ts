import { create } from "zustand";
import Cookies from "js-cookie";

function saveCookie(cart: CartItem, total: number) {
    Cookies.set("cart", JSON.stringify([cart, total]), { expires: 7 });
}

type CartItem = Record<string, number>;

export const useCart = create<{
    cart: CartItem,
    total: number,
    addToCart(...items: string[]): void,
    removeFromCart(...items: string[]): void,
    setCart(cart: CartItem, total: number): void,
    deleteFromCart(id: string): void
}>((set, get) => ({
    cart: {},
    total: 0,
    addToCart(...items) {
        const { cart, total } = get();
        const newItems: CartItem = cart;
        let newTotal = total;

        for (const item of items) {
            newItems[item] = (newItems[item] || 0) + 1;
            newTotal += 1;
        }
        
        set({
            cart: newItems,
            total: newTotal
        });

        saveCookie(newItems, newTotal);
    },
    removeFromCart(...items) {
        const { cart, total } = get();
        const newItems: CartItem = cart;
        let newTotal = total;

        for (const item of items) {
            newItems[item] = (newItems[item] || 0) - 1;
            newTotal -= 1;
        }
        
        set({
            cart: newItems,
            total: newTotal
        });

        saveCookie(newItems, newTotal);
    },
    setCart(newCart, total) {
        set({
            cart: newCart,
            total
        });
        saveCookie(newCart, total);
    },
    deleteFromCart(id, amount = 1) {
        const { cart, total } = get();
        const { [id]: target, ...rest } = cart;
        const newTotal = total - (amount || 0);

        set({ cart: rest, total: newTotal });
        saveCookie(rest, newTotal);
    },
    emptyCart() {
        set({ cart: {}, total: 0 });
        saveCookie({}, 0);
    }
}));

const rawCookie = Cookies.get("cart");
if (rawCookie) {
    const [cart, total] = JSON.parse(rawCookie) as [CartItem, number];
    useCart.getState().setCart(cart, total);
}