<script setup>
import { onMounted } from "vue";
import { useProductsStore } from "../stores/products.js";

const store = useProductsStore();

onMounted(() => {
  store.fetchProductsFromDB();
});
</script>

<template>
  <div class="catalog-container">
    <h1>Catalog</h1>
    <div class="products-grid">
      <div v-for="product in store.products" :key="product.id" class="product-card">
        <img :src="product.thumbnail" alt="product image" class="product-image"/>
        <h2 class="product-title">{{ product.title }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">${{ product.price }}</p>
        <button class="add-to-cart" @click="store.addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalog-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background-color: #fff;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.product-title {
  font-size: 18px;
  margin: 10px 0 5px;
}

.product-description {
  font-size: 14px;
  color: #555;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-weight: bold;
  margin: 10px 0;
}

.add-to-cart {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #45a049;
}
</style>
