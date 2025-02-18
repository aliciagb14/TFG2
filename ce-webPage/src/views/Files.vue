<template>
  <h1>Files</h1>
  <Sidebar></Sidebar>
  <ListUsers>{{ username }}</ListUsers>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
</script>

<style></style>
