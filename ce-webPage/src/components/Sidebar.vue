<template>
  <div>
    <!-- Botón para alternar la visibilidad del Sidebar -->
    <n-button ghost class="toggle-button" @click="toggleSidebar">
      <n-icon size="24"><SidebarIcon /></n-icon>
    </n-button>
    
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-hidden': !isSidebarVisible }">
      <div class="sidebar-header">
        <h4>Menú</h4>
        <!-- Botón para cerrar el sidebar -->
        <n-button ghost size="small" @click="toggleSidebar">
          <n-icon size="16"><SidebarIcon /></n-icon> Close
        </n-button>
      </div>
      
      <div class="sidebar-content">
        <ul>
          <li><router-link to="/home/files">Files</router-link></li>
          <li><router-link to="/settings">Settings</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
        </ul>
      </div>
    </div>

    <!-- Contenido principal, que se ajusta al tamaño del sidebar -->
    <div class="content" :class="{ 'content-expanded': !isSidebarVisible }">
      <router-view />
    </div>
  </div>
</template>

<script setup>
  import { ref,  watch } from 'vue';
  import { NButton, NIcon } from 'naive-ui';
  import { ListOutline as SidebarIcon } from '@vicons/ionicons5';

  // Estado para controlar la visibilidad del sidebar
  const isSidebarVisible = ref(true);

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
  };

  watch(isSidebarVisible, (newValue) => {
    console.log('isSidebarVisible esta a : ', newValue);
  });
</script>

<style scoped>
/* Estilo del Sidebar */
.sidebar {
  width: 0;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition: width 0.5s ease-in-out;  /* Transición para el cambio de ancho */
  overflow: hidden;
  z-index: 1000;
}

/* Cuando isSidebarVisible es true, el sidebar se expande */
.sidebar-hidden {
  width: 250px; /* Ancho del sidebar cuando está visible */
}

/* Estilos de la cabecera del sidebar */
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.sidebar-header h4 {
  margin: 0;
}

/* Estilo para los elementos del menú */
.sidebar-content ul {
  list-style-type: disc;
  padding-left: 20px;
}

.sidebar-content li {
  margin: 15px 0;
}

/* Estilo del contenido */
.content {
  margin-left: 0; /* Sin margen cuando el sidebar está oculto */
  padding: 20px;
  transition: margin-left 0.5s ease-in-out; /* Transición para el margen izquierdo */
}

/* Cuando el sidebar está visible, el contenido se desplaza */
.content-expanded {
  margin-left: 250px; /* El contenido se ajusta cuando el sidebar está visible */
}
</style>
