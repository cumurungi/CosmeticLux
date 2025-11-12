<script setup>
import { useRouter, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { useProductsStore } from "./stores/products.js";

const store = useProductsStore();
const router = useRouter();

// Navigate to cart
const goToCart = () => {
  router.push({ path: "/cart" });
};
</script>

<template>
  <div id="app">
    <!-- Navbar -->
    <Navbar />

    <!-- Cart info (top-right) -->
    <div class="cart-items" @click="goToCart">
      <p>🛒 Items in Cart: {{ store.cart.length }}</p>
    </div>

    <!-- Main page content -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(176, 187, 188);
}

/* Navbar and Footer spacing handled internally */
main {
  flex: 1;
  margin: 0;
  padding: 0;
}

/* Cart indicator */
.cart-items {
  position: absolute;
  top: 15px;
  right: 25px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 6px 14px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cart-items:hover {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
