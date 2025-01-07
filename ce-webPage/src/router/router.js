import { createRouter } from "vue-router";
import Menu from "@/components/Menu.vue";

//Definición de las rutas de la aplicación
const routes = [
  {
    path: "/",
    name: "Menu",
    component: Menu,
  },
  //Añadir todas las rutas de la misma forma.
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
