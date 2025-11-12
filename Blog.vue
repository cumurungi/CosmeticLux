<template>
<!-- Hero Section full width -->
    <section class="hero" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="hero-content">
        <h1>Our Blog</h1>
        <p>You can see all our blogs here.</p>
      </div>
    </section>
  <div class="page-container">
    <h1>Our Blogs</h1>

    <div class="blog-post" v-for="post in posts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import heroImage from '@/assets/images/img1.jpeg';


const posts = ref([
  { id: 1, title: "5 Skincare Tips for Healthy Glow", content: "Always moisturize daily and drink plenty of water..." },
  { id: 2, title: "Choosing the Right Fragrance", content: "Pick scents that suit your personality and season..." },
  { id: 3, title: "How to Store Your Cosmetics", content: "Keep products away from direct sunlight and humidity..." },
  { id: 4, title: "The Best Makeup Routine for Beginners", content: "A simple step-by-step routine using basic products to help beginners feel confident with makeup without spending too much..." },
  { id: 5, title: "Top 5 Lipstick Shades Every Woman Should Own", content: "Guide to classic lipstick colors that match all skin tones—perfect for every occasion from work to date nights..." },
  { id: 6, title: "How to Choose the Right Foundation for Your Skin Type", content: "Tips for selecting the right shade and formula for dry, oily, or combination skin—no more mismatched foundation..." },
  { id: 7, title: "Why Sunscreen Is a Beauty Essential", content: "Explain how sunscreen prevents wrinkles, dark spots, and aging. Include SPF recommendations for cosmetic users..." },
  { id: 8, title: "Makeup Expiration Dates: When to Throw Products Away", content: "Educate customers about product shelf life to avoid skin irritation and bacteria...." },

]);
</script>

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
}

.hero::after {
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
}
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.blog-post h3 {
  color: #004457;
  margin-bottom: 8px;
}

.blog-post p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
}
</style>
