<template>
    <div>
      <n-button ghost class="toggle-button" @click="toggleSidebar">
        <n-icon size="24"><SidebarIcon /></n-icon>
      </n-button>
      <div class="menu" v-if="isSidebarVisible" >
            <ul>
                <li><router-link to="/users">Users</router-link></li>
                <li><router-link to="/files">Files</router-link></li>
                <li><router-link to="/settings">Settings</router-link></li>
            </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { NButton, NIcon } from 'naive-ui';

  import { ListOutline as SidebarIcon } from '@vicons/ionicons5';
  
  const isSidebarVisible = ref(true);
  
  const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
  };
  </script>
  
  <style scoped>
.sidebar {
  width: 20%;
  height: 100vh;
  background-color: #182a3d;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease-in-out;
}

/* Sidebar cerrado */
.sidebar.collapsed {
  width: 0;
  overflow: hidden;
}

/* Botón de toggle */
.toggle-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

/* Menú */
.menu {
  margin-top: 80px;
}

.menu ul {
  list-style: none;
  padding: 0;
}

.menu li {
  margin: 15px 0;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: block;
  padding: 10px 20px;
  border-radius: 5px;
}

.menu a:hover {
  background: rgba(255, 255, 255, 0.2);
}
  </style>
  