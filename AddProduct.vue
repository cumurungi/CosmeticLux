<script setup>
import { ref } from "vue";

const name = ref("");
const price = ref("");
const category = ref("");
const image = ref(null);
const message = ref("");

const addProduct = async () => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("price", price.value);
  formData.append("category", category.value);
  if (image.value) formData.append("image", image.value);

  try {
    const res = await fetch("http://localhost:4000/add-product", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      message.value = data.error || "Failed to add product";
      return;
    }

    message.value = "Product added successfully!";
  } catch (err) {
    console.error(err);
    message.value = "Server error";
  }
};
</script>

<template>
  <div>
    <h1>Add Product</h1>
    <input v-model="name" placeholder="Product Name" />
    <input v-model="price" placeholder="Price" type="number" />
    <input v-model="category" placeholder="Category" />
    <input type="file" @change="e => image.value = e.target.files[0]" />
    <button @click="addProduct">Add Product</button>
    <p>{{ message }}</p>
  </div>
</template>
