<script setup>
import Login from './components/Login.vue';
</script>


<!-- Definir todas las rutas -->
<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/">Login</router-link></li>
        <li><router-link to="/home">Home</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>


<style>
nav ul {
  display: flex;
  list-style: none;
  padding: 0;
}
nav ul li {
  margin-right: 10px;
}
</style>