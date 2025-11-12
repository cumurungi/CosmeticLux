<template>
  <footer class="footer">
    <div class="footer-top">
      <!-- Brand & Description -->
      <div class="brand">
        <h2>CosmeticLux</h2>
        <p>Your one-stop shop for skincare & fragrances</p>
      </div>

      <!-- Quick Links -->
      <div class="links">
        <h3>Shop</h3>
        <ul>
          <li><router-link to="/catalog">Catalog</router-link></li>
          <li><router-link to="/catalog?category=skincare">Skincare</router-link></li>
          <li><router-link to="/catalog?category=fragrances">Fragrances</router-link></li>
        </ul>
      </div>

      <div class="links">
        <h3>Info</h3>
        <ul>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="newsletter">
        <h3>Subscribe</h3>
        <p>Get the latest deals and updates</p>
        <form @submit.prevent="subscribe">
          <input type="email" v-model="email" placeholder="Your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="social">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-tiktok"></i></a>
      </div>
      <div class="payment-icons">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Paypal_Logo.png" alt="Paypal" />
      </div>
      <p>© 2025 CosmeticLux. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");

function subscribe() {
  alert(`Subscribed with ${email.value}!`);
  email.value = "";
}
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: white;
  padding: 40px 20px 20px;
  font-family: 'Poppins', sans-serif;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: space-between;
  margin-bottom: 30px;
}

.brand h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

.brand p {
  font-size: 14px;
  max-width: 200px;
}

.links h3,
.newsletter h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.links ul {
  list-style: none;
  padding: 0;
}

.links ul li {
  margin-bottom: 8px;
}

.links ul li a {
  color: #ccc;
  text-decoration: none;
}

.links ul li a:hover {
  color: #e51a4b;
}

.newsletter form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.newsletter input[type="email"] {
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  outline: none;
}

.newsletter button {
  padding: 8px 10px;
  border: none;
  border-radius: 6px;
  background-color: #e51a4b;
  color: white;
  cursor: pointer;
}

.newsletter button:hover {
  background-color: #c3153b;
}

.footer-bottom {
  border-top: 1px solid #444;
  padding-top: 20px;
  text-align: center;
}

.footer-bottom p {
  margin-top: 10px;
  font-size: 14px;
  color: #888;
}

.social a {
  color: white;
  margin: 0 10px;
  font-size: 20px;
  text-decoration: none;
}

.social a:hover {
  color: #e51a4b;
}

.payment-icons {
  margin: 10px 0;
}

.payment-icons img {
  height: 24px;
  margin: 0 6px;
}
</style>

<!-- Note: Make sure to install FontAwesome or use a CDN for social icons -->
