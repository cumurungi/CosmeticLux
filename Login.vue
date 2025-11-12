<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const error = ref("");

// Login function
const login = async () => {
  error.value = ""; // reset error

  if (!username.value || !password.value) {
    error.value = "Please enter both username and password";
    return;
  }

  try {
    console.log("Attempting login with:", username.value, password.value);

    // Correct backend route: /api/auth
    const res = await fetch("http://localhost:5000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value, password: password.value })
    });

    // Parse response JSON safely
    let data;
    try {
      data = await res.json();
    } catch {
      error.value = `Server error: ${res.status}`;
      return;
    }

    console.log("Response data:", data);

    if (!res.ok) {
      error.value = data.message || "Login failed";
      return;
    }

    // Save token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("Login successful! Redirecting to dashboard...");
    router.push("/dashboard"); // redirect after successful login
  } catch (err) {
    console.error("Login fetch error:", err);
    error.value = "Server error, please try again later";
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <h1>Login</h1>

      <div class="form-group">
        <label>Username</label>
        <input v-model="username" placeholder="Enter your username" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Enter your password" />
      </div>

      <button @click="login">Login</button>

      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: rgb(176, 187, 188);
}

.login-box {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  font-size: 15px;
}

input:focus {
  border-color: #888;
}

button {
  width: 100%;
  padding: 12px;
  background-color: rgb(255, 8, 8);
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: rgb(241, 92, 92);
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
  font-weight: 500;
}
</style>
