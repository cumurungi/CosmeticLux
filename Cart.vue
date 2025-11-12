<script setup>
import { useProductsStore } from "../stores/products.js";
import { useRouter } from "vue-router";
import heroImage from '@/assets/images/img1.jpeg';

const store = useProductsStore();
const router = useRouter();

// Navigate to Checkout page
function checkout() {
  if (store.cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  router.push("/checkout");
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="hero-content">
        <h1>Your Cart</h1>
        <p>We bring you the best skincare and fragrance products for a healthy glow.</p>
      </div>
    </section>

    <div class="cart-container">
      <!-- Empty cart -->
      <div v-if="store.cart.length === 0">
        <p>Your cart is empty.</p>
      </div>

      <!-- Cart items -->
      <div v-else>
        <div
          v-for="item in store.cart"
          :key="item.id"
          class="cart-item"
        >
          <img :src="item.thumbnail" alt="product" class="product-img" />

          <div class="item-info">
            <h2>{{ item.title }}</h2>
            <p class="price">$ {{ item.price }}</p>
          </div>

          <button @click="store.removeFromCart(item.id)" class="remove-btn">
            Remove
          </button>
        </div>

        <!-- Total price -->
        <p class="total">
          Total: ${{ store.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2) }}
        </p>

        <!-- Checkout button -->
        <button class="checkout-btn" @click="checkout">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background-size: cover;
  background-position: center;
  position: relative;
  margin-bottom: 20px;
  border-radius: 0; /* match home page hero */
}

.hero::after {
  content: '';
  position: absolute;
  top:0; left:0; right:0; bottom:0;
  background: rgba(0,0,0,0.3); /* overlay for readability */
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 16px;
}

.hero-content p {
  font-size: 20px;
}

/* Cart container */
.cart-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

/* Cart items */
.cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  gap: 16px;
}

.product-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 4px;
}

.item-info {
  flex-grow: 1;
}

.price {
  font-weight: bold;
  color: #e51a4b;
}

.remove-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

.total {
  font-weight: bold;
  font-size: 18px;
  text-align: right;
  margin-top: 16px;
}

.checkout-btn {
  margin-top: 20px;
  background-color: #2196F3;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #1976D2;
}
</style>
