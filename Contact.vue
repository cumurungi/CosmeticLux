<template>
  <div>
    <!-- Hero Section full width -->
    <section class="hero" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="hero-content">
        <h1>Contact Us</h1>
        <p>If you have any questions, don't hesitate to contact us.</p>
      </div>
    </section>

    <div class="page-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or feedback, feel free to reach out!</p>

      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label>Name:</label>
          <input v-model="name" type="text" required />
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>

        <div class="form-group">
          <label>Message:</label>
          <textarea v-model="message" rows="5" required></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import heroImage from '@/assets/images/img1.jpeg';

const name = ref("");
const email = ref("");
const message = ref("");

function submitForm() {
  alert(`Thank you, ${name.value}! Your message has been sent.`);
  name.value = "";
  email.value = "";
  message.value = "";
}
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

/* Page container */
.page-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px; /* spacing between fields */
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px; /* spacing between label and input */
}

input,
textarea {
  width: 100%;
  max-width: 500px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  width: 150px;
  padding: 10px;
  background-color: #e51a4b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #c3153b;
}
</style>
