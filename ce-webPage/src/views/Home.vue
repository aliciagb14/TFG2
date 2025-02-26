<template>
  <div class="container">
    <Sidebar></Sidebar>
    <h1>Comercio Electrónico</h1>
    <Login/>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Login from "@/components/Login.vue";
</script>

<style scoped>
h1 {
    text-align: center; /* Centra el texto horizontalmente */
    margin: 30px auto;
    font-size: 2rem;
    color: #333;
}

</style>
