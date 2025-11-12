<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>
    <p>Welcome, {{ user.username }}!</p>

    <button @click="logout">Logout</button>

    <div class="dashboard-content">
      <h2>Protected Data</h2>
      <ul>
        <li v-for="u in users" :key="u.id">{{ u.username }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(JSON.parse(localStorage.getItem("user") || "{}"));
const users = ref([]);
const token = localStorage.getItem("token");

// Logout function
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};

// Fetch protected data
const fetchUsers = async () => {
  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to fetch users", data);
      return;
    }

    users.value = data;
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.dashboard-page {
  padding: 20px;
}

button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: rgb(109, 124, 126);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(95, 110, 112);
}
</style>
