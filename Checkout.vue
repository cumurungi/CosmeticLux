<script setup>
import { useProductsStore } from "../stores/products.js";
import { useRouter } from "vue-router";
import heroImage from '@/assets/images/img1.jpeg';

const store = useProductsStore();
const router = useRouter();

// Calculate total price
const total = () =>
  store.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

// Simulate payment
function buyNow() {
  if (store.cart.length === 0) return alert("Your cart is empty!");

  // Simple simulation of buying
  alert(`Thank you! Your order of $${total()} has been placed.`);

  // Clear cart
  store.cart = [];

  // Redirect to home page
  router.push("/");
}

// Continue shopping
function continueShopping() {
  router.push("/catalog"); // or "/" for home
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="hero-content">
        <h1>Check out</h1>
        <p>We bring you the best skincare and fragrance products for a healthy glow.</p>
      </div>
    </section>

    <div v-if="store.cart.length === 0">
      <p>Your cart is empty.</p>
      <button @click="continueShopping" class="continue-btn">
        Continue Shopping
      </button>
    </div>

    <div v-else>
      <div class="cart-items">
        <div v-for="item in store.cart" :key="item.id" class="cart-item">
          <img :src="item.thumbnail" alt="" class="item-img" />
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p>Price: ${{ item.price }}</p>
          </div>
        </div>
      </div>

      <p class="total">Total: ${{ total() }}</p>

      <div class="actions">
        <button @click="buyNow" class="buy-btn">Buy Now</button>
        <button @click="continueShopping" class="continue-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
}
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

.cart-items {
  border-top: 1px solid #ccc;
  margin-top: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
}

.item-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 20px;
}

.item-info h3 {
  margin: 0;
  font-size: 18px;
}

.item-info p {
  margin: 4px 0 0 0;
  color: #555;
}

.total {
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
  text-align: right;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
}

.buy-btn {
  background-color: #e51a4b;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.buy-btn:hover {
  background-color: #c3153b;
}

.continue-btn {
  background-color: #555;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.continue-btn:hover {
  background-color: #333;
}
</style>
