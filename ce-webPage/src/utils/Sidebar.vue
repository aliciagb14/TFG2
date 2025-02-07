<template>
    <div>
      <div class="sidebar">
        <n-button ghost class="toggle-button" @click="toggleSidebar">
                <n-icon size="24"><SidebarIcon /></n-icon>
            </n-button>
        <div class="menu" >
            <ul>
                <li><router-link to="/users">Users</router-link></li>
                <li><router-link to="/files">Files</router-link></li>
                <li><router-link to="/settings">Settings</router-link></li>
            </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ListOutline as SidebarIcon } from '@vicons/ionicons5';
  
  const isSidebarVisible = ref(true);
  
  const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
  };
  </script>
  
  <style scoped>
  .toggle-button {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
  }
  
  .sidebar {
    width: 250px;
    background-color: #182a3d;
    color: #fff;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  
  .menu ul {
    list-style: none;
    padding: 0;
  }
  
  .menu li {
    margin: 10px 0;
  }
  
  .menu a {
    color: #354057;
    text-decoration: none;
    font-size: 18px;
  }
  
  .menu a:hover {
    text-decoration: underline;
  }
  </style>
  