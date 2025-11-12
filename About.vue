<template>
  <div class="about-page">

    <!-- Hero Section -->
    <section class="hero" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="hero-content">
        <h1>About CosmeticLux</h1>
        <p>We bring you the best skincare and fragrance products for a healthy glow.</p>
      </div>
    </section>

    <!-- Our Mission -->
    <section class="mission">
      <h2>Our Mission</h2>
      <p>
        To make beauty simple, affordable, and accessible for everyone. We carefully select products
        to ensure quality and satisfaction for all our customers.
      </p>
    </section>

    <!-- Who We Are -->
    <section class="who-we-are">
      <h2>Who Are We?</h2>
      <p>
        At CosmeticLux, we are more than just a beauty brand—we are a community that celebrates confidence, self-expression, and the art of looking and feeling your best. Our team is passionate about curating high-quality cosmetic products that empower everyone to explore their unique style and enhance their natural beauty. We believe that beauty is not just about appearance; it’s about embracing individuality, boosting self-esteem, and enjoying the journey of self-care. By combining the latest trends, innovative formulations, and expert knowledge, we strive to make beauty accessible, enjoyable, and luxurious for all. Every product we offer is chosen with care, ensuring safety, effectiveness, and a touch of glamour that helps our customers shine in every aspect of their lives. At CosmeticLux, your beauty is our passion, and we are committed to helping you feel confident, radiant, and unapologetically yourself.
      </p>
    </section>

    <!-- Our Team -->
    <section class="team">
      <h2>Meet Our Team</h2>
      <div class="team-members">
        <div class="member">
          <img :src="team1" alt="Founder" />
          <p>Nshuti Divine<br> Founder</p>
        </div>
        <div class="member">
          <img :src="team2" alt="Skincare Expert" />
          <p>Umurungi Charmante<br> Skincare Specialist</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import heroImage from '@/assets/images/img1.jpeg';
import team1 from '@/assets/images/team1.png';
import team2 from '@/assets/images/team2.jpeg';
</script>

<style scoped>
.about-page {
  font-family: 'Poppins', sans-serif;
  color: #2d2627;
}

/* Hero Section */
.hero {
  height: 400px; /* fixed height for balance */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 10px; /* optional, looks nice */
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

/* Sections */
.mission, .who-we-are, .team {
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
}

.mission h2, .who-we-are h2, .team h2 {
  color: #004457;
  margin-bottom: 16px;
}

/* Team Section */
.team-members {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.member {
  text-align: center;
}

.member img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 8px;
}
</style>
