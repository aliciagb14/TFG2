<template>
  <div class="container">
    <Sidebar :isVisible="isSidebarVisible" @toggleSidebar="toggleSidebar" />
    <div class="main-content" :class="{ 'collapsed': !isSidebarVisible }">
      <ListUsers v-if="isauthenticated && isAdmin" :username="authenticatedUser" :isAdmin="isAdmin" :password="password"/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue'
import Sidebar from "@/components/Sidebar.vue";
import ListUsers from "@/components/ListUsers.vue";
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const isauthenticated = ref(false)
const authenticatedUser = ref('')
const isAdmin = ref(false); 
const password = ref('')


onMounted(() => {
    
    authenticatedUser.value = route.query.username || '';
    isAdmin.value = route.query.isAdmin === 'true';
    password.value = route.query.password || '';

    console.log("✅ Username logueado: ", authenticatedUser.value)
    console.log("👑 ¿¿Es admin???: ", isAdmin.value)
    console.log("🔒 Password es: ", password.value)
    if (authenticatedUser.value) {
        isauthenticated.value = true;
    } else {
        router.push('/');
    }
});

</script>

<!-- <style scoped>
h1 {
    text-align: center; /* Centra el texto horizontalmente */
    margin: 30px auto;
    font-size: 2rem;
    color: #333;
}

</style> -->

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s ease-in-out;
  margin-left: 250px;
}

.collapsed {
  margin-left: 0;
}
</style>