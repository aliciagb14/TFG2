// src/router/router.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Files from "@/views/Files.vue";
import Profile from "@/views/Profile.vue";
import Settings from "@/views/Settings.vue";

/*Añadir todas las vistas de la App*/
const routes = [
  { path: "/",
    component: Login
  },
  {
    path: "/home",
    component: Home,
    children: [
      { path: "files", component: Files },
    ],
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/settings",
    component: Settings
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
