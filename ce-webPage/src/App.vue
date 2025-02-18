<!-- Definir todas las rutas
<template>
  <Login>
    <Home>
      <Profile></Profile>
      <Files></Files>
      <Settings></Settings>
    </Home>
  </Login>
</template>

<script setup>
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Files from "./views/Files.vue";
import Settings from "./views/Settings.vue";
</script>

<style></style> -->

<template>
  <div id="app">
    <router-view></router-view><!-- Renderiza la vista actual según la ruta -->
  </div>
</template>

<script setup>

</script>

<style>
/* Agrega estilos generales si lo necesitas */
</style>
