import { create } from "zustand";

const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) => set((state) => {
        const existing = state.cart.find((item) => item.id === product.id);
        if (existing) {
            return {
                cart: state.cart.map((item) =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                ),
            };
        } else {
            return { cart: [...state.cart, { ...product, qty: 1 }] };
        }
    }),
    decreaseQty: (product) => set((state) => {
        const existing = state.cart.find((item) => item.id === product.id);
        if (existing && existing.qty > 1) {
            return {
                cart: state.cart.map((item) =>
                    item.id === product.id ? { ...item, qty: item.qty - 1 } : item
                ),
            };
        } else {
            return {
                cart: state.cart.filter((item) => item.id !== product.id),
            };
        }
    }),
    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
    })),
    clearCart: () => set({ cart: [] }),
}))

export default useCartStore;
