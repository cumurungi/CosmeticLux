// src/stores/products.js
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],   // all products from backend
    cart: [],       // shopping cart
    loading: false, // loading indicator
    error: null,    // error handling
  }),

  actions: {
    // Fetch products from backend (DB)
    async fetchProductsFromDB() {
      this.loading = true;
      this.error = null;

      try {
        // Fetch from backend
        const response = await fetch("http://localhost:4000/products");
        if (!response.ok) throw new Error("Failed to fetch products from backend");

        const data = await response.json();
        console.log("Fetched total products from backend:", data.length);

        this.products = data;
      } catch (err) {
        console.error("Error fetching products:", err);
        this.error = err.message || "Unknown error";
      } finally {
        this.loading = false;
      }
    },

    // Add a product to cart
    addToCart(product) {
      const existing = this.cart.find(item => item.id === product.id);
      if (!existing) {
        this.cart.push({ ...product, quantity: 1 });
      } else {
        existing.quantity += 1;
      }
    },

    // Remove a product from cart
    removeFromCart(id) {
      this.cart = this.cart.filter(item => item.id !== id);
    },

    // Update quantity in cart
    updateCartQuantity(id, quantity) {
      const item = this.cart.find(item => item.id === id);
      if (item) item.quantity = quantity;
    },

    // Clear the cart
    clearCart() {
      this.cart = [];
    }
  },
});
