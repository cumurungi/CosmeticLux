<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo-container">
      <img src="../assets/images/logo2.png" alt="CosmeticLux Logo" class="logo" />
    </div>

    <!-- Navigation Links -->
    <ul>
      <li @click="$router.push('/')">Home</li>
      <li @click="$router.push('/About')">About Us</li>
      <li @click="$router.push('/Catalog')">Catalog</li>
      <li @click="$router.push('/Cart')">Cart</li>
      <li @click="$router.push('/Checkout')">Checkout</li>
      <li @click="$router.push('/Contact')">Contact</li>
      <li @click="$router.push('/FAQ')">FAQ</li>
      <li @click="$router.push('/Blog')">Blog</li>
      
      <!-- Show Login only if not logged in -->
      <li v-if="!isLoggedIn" @click="$router.push('/Login')">Login</li>

      <!-- Show Logout if logged in -->
      <li v-if="isLoggedIn" @click="logout">Logout</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    // Check if token exists in localStorage
    this.isLoggedIn = !!localStorage.getItem("token");
  },
  methods: {
    logout() {
      localStorage.removeItem("token"); // remove JWT token
      this.isLoggedIn = false;
      this.$router.push("/login"); // redirect to login page
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  background: #111;
  padding: 12px 20px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 80px;
  width: auto;
  display: block;
  margin-right: 20px;
}

ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

li {
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;
}

li:hover {
  color: #ffcc00;
}
</style>
