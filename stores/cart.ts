import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as Array<{
      id: string;
      name: string;
      price: number;
      image: string;
      quantity: number;
    }>,
  }),
  actions: {
    addItem(
      product: { name: string; price: number; image: string },
      quantity: number
    ) {
      const existingItem = this.items.find(
        (item) => item.name === product.name
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          id: Math.random().toString(36).substring(2, 9),
          ...product,
          quantity,
        });
      }
      this.saveToLocalStorage();
    },
    removeItem(id: string) {
      this.items = this.items.filter((item) => item.id !== id);
      this.saveToLocalStorage();
    },
    updateQuantity(id: string, quantity: number) {
      const item = this.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    loadFromLocalStorage() {
      const cart = localStorage.getItem("cart");
      if (cart) {
        this.items = JSON.parse(cart);
      }
    },
    setupListeners() {
      window.addEventListener("storage", (event) => {
        if (event.key === "cart") {
          this.loadFromLocalStorage();
        }
      });
    },
  },
  getters: {
    totalItems(): number {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice(): number {
      return this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});
