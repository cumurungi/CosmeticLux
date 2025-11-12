<template>
  <div >
    <!-- Hero Section full width -->
    <section class="hero" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="hero-content">
        <h1>FAQ</h1>
        <p>If you have any questions, don't hesitate to contact us.</p>
      </div>
    </section>
    <div class="page-container">
         <h1>Frequently Asked Questions</h1>
    <div class="faq-item">
      <h3>1. How do I track my order?</h3>
      <p>You can track your order using the tracking link provided in your confirmation email.</p>
    </div>

    <div class="faq-item">
      <h3>2. What is your return policy?</h3>
      <p>We offer a 14-day return policy for unopened products. Contact us for details.</p>
    </div>

    <div class="faq-item">
      <h3>3. How long does shipping take?</h3>
      <p>Shipping usually takes 3-7 business days depending on your location.</p>
    </div>

    <div class="faq-item">
      <h3>4. Do you ship internationally?</h3>
      <p>Yes, we ship to most countries worldwide. International shipping fees and delivery times may vary.</p>
    </div>

    <div class="faq-item">
      <h3>5. Can I change or cancel my order?</h3>
      <p>Orders can be modified or canceled within 24 hours of placing them. Please contact our support team immediately.</p>
    </div>

    <div class="faq-item">
      <h3>6. Are your products tested on animals?</h3>
      <p>No, CosmeticLux is committed to cruelty-free products. We do not test on animals.</p>
    </div>

    <div class="faq-item">
      <h3>7. How do I know which product is right for my skin?</h3>
      <p>We provide detailed product descriptions and guides. You can also contact our skincare specialists for personalized advice.</p>
    </div>

    <div class="faq-item">
      <h3>8. What payment methods do you accept?</h3>
      <p>We accept major credit/debit cards, PayPal, and other secure payment options at checkout.</p>
    </div>

    <div class="faq-item">
      <h3>9. Can I gift someone a product?</h3>
      <p>Yes! You can add a gift message during checkout and have the product shipped directly to the recipient.</p>
    </div>

    <div class="faq-item">
      <h3>10. How do I contact customer support?</h3>
      <p>You can reach our support team via the Contact page, email, or social media channels. We’re happy to assist!</p>
    </div>
  </div>
  </div>
</template>


<script setup>
import heroImage from '@/assets/images/img1.jpeg';

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

.faq-item {
  margin-bottom: 20px;
}

.faq-item h3 {
  font-size: 18px;
  color: #004457;
  margin-bottom: 6px;
}

.faq-item p {
  font-size: 16px;
  line-height: 1.5;
}
</style>
