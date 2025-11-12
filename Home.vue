<script setup>
import { onMounted, computed } from "vue";
import { useProductsStore } from "../stores/products.js";

// Import images
import heroImage from '@/assets/images/img1.jpeg';
import skincareImage from '@/assets/images/img4.jpg';
import fragranceImage from '@/assets/images/img3.jpeg';

const store = useProductsStore();

onMounted(() => {
  store.fetchProductsFromDB();
});

const featuredProducts = computed(() => store.products.slice(0, 4));

function shopCategory(category) {
  alert(`Navigate to ${category} category page!`);
}
</script>

<template>
  <div class="home-page">

    <!-- Hero Banner -->
    <section class="hero-banner" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="hero-content">
        <h1>Luxury Cosmetics</h1>
        <p>Skincare & Fragrances curated just for you</p>
        <router-link to="/catalog" class="hero-btn">
  Shop Now
</router-link>

      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories">
      <h2>Explore Categories</h2>
      <div class="category-cards">
        <div class="category-card" @click="shopCategory('skincare')">
          <img :src="skincareImage" alt="Skincare">
          <h3>Skincare</h3>
        </div>
        <div class="category-card" @click="shopCategory('fragrances')">
          <img :src="fragranceImage" alt="Fragrances">
          <h3>Fragrances</h3>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
      <h2>Featured Products</h2>

      <div v-if="store.loading" class="loading">
        Loading featured products...
      </div>

      <div v-else class="products-grid">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="product-card"
        >
          <img :src="product.thumbnail" alt="" class="product-image" />
          <h3>{{ product.title }}</h3>
          <p>{{ product.brand }}</p>
          <p class="price">$ {{ product.price }}</p>
          <button @click="store.addToCart(product)" class="add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.home-page {
  font-family: 'Poppins', sans-serif;
}

/* Hero Banner */
.hero-banner {
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
}

.hero-banner::after {
  content: '';
  position: absolute;
  top:0; left:0; right:0; bottom:0;
  background: rgba(0,0,0,0.3);
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
  margin-bottom: 24px;
}

.hero-btn {
  background-color: #e51a4b;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
}

.hero-btn:hover {
  background-color: #c3153b;
}

/* Categories */
.categories {
  padding: 40px 20px;
  text-align: center;
}

.categories h2 {
  font-size: 32px;
  margin-bottom: 24px;
}

.category-cards {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.category-card {
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}

.category-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.category-card h3 {
  background-color: #fff;
  margin: 0;
  padding: 16px;
  font-size: 20px;
}

.category-card:hover {
  transform: translateY(-5px);
}

/* Featured Products */
.featured-products {
  padding: 40px 20px;
  text-align: center;
}

.featured-products h2 {
  font-size: 32px;
  margin-bottom: 24px;
}

.loading {
  font-size: 18px;
  color: #555;
  text-align: center;
  margin: 20px 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
}

.price {
  font-weight: bold;
  color: #e51a4b;
  margin: 12px 0;
}

.add-btn {
  background-color: #0099ff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #007acc;
}
</style>
