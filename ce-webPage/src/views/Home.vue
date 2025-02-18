<template>
  <div class="container">
    <Sidebar></Sidebar>
    <h1>Comercio Electrónico</h1>
    <h2>Bienvenido, {{ username }}</h2>
    <ListUsers></ListUsers>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import ListUsers from "@/components/ListUsers.vue";
</script>

<style scoped>
h1 {
    text-align: center; /* Centra el texto horizontalmente */
    margin: 30px auto;
    font-size: 2rem;
    color: #333;
}

</style>
