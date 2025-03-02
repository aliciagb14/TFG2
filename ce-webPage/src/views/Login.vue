<template>
  <div class="container">
    <Login></Login>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Login from "@/components/Login.vue";
const router = useRouter();
</script>

<style scoped></style>
