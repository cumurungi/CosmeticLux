import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Catalog from "../views/Catalog.vue";
import Checkout from "../views/Checkout.vue";
import Cart from "../views/Cart.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import FAQ from "../views/FAQ.vue";
import Blog from "../views/Blog.vue";
import Login from "../views/Login.vue";
import AddProduct from "../views/AddProduct.vue";
import Dashboard from "../views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
   
     {
      path: "/catalog",
      name: "Catalog",
      component: Catalog,
    },
   {
      path: "/checkout",
      name: "Checkout",
      component: Checkout,
    },
  
    {
      path: "/about",
      name: "Aboutview",
      component: About,
    },
      {
      path: "/contact",
      name: "Contactview",
      component: Contact,
    },
      {
      path: "/faq",
      name: "FAQview",
      component: FAQ,
    },
      {
      path: "/blog",
      name: "Blogview",
      component: Blog,
    },
      {
      path: "/cart",
      name: "Cartview",
      component: Cart,
    },
     {
      path: "/add-product",
      name: "AddProduct",
      component: AddProduct,
    },
    {
  path: "/dashboard",
  name: "Dashboard",
  component: Dashboard,
},
  ],
});

// 🔒 Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // Pages that require login
  const protectedPages = ["/dashboard", "/add-product", "/checkout"];
  if (protectedPages.includes(to.path) && !token) {
    next("/login");
  } else {
    next();
  }
});


export default router;
