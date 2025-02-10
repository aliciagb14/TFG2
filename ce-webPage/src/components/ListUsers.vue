<template>
  <div class="layout">
    <Sidebar class="sidebar"/>
    <div class="main-content">
      <div>
        <h2>Bienvenido, {{ username }}</h2>
      </div>
      <div class="header">
        <h2>Users</h2>
        <n-button text class="add-user-btn">
          Add user 
          <n-icon>
            <AddUserIcon/>
          </n-icon>
        </n-button>
      </div> 
      <div class="table-container">
        <n-data-table v-if="isAdmin && !loading" :columns="columns" :data="data" bordered />
        <p v-else>No tienes permisos para ver esta información.</p>
      </div> 
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NDataTable } from 'naive-ui';
import { getUsers } from '@/services/UserService';
import { PersonAddSharp as AddUserIcon} from '@vicons/ionicons5';
import Sidebar from '@/utils/Sidebar.vue';

const data = ref([]);
const loading = ref(true)
const isAuthenticated = ref(false);
onMounted(async () => {
    console.log('isAdmin:', props.isAdmin);
    if (props.isAdmin) {
        await fetchUsers();
    }
});

const columns = [
    {
        title: 'Nombre',
        key: 'firstName',
    },
    {
        title: 'Apellidos',
        key: 'lastName',
    },
    {
        title: 'Correo Electrónico',
        key: 'email',
    }
];

const props = defineProps({
  username: String,
  isAdmin: Boolean
})

const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@alumnos\.upm\.es$/;
    return regex.test(email);
};

const fetchUsers = async () => {
  try {
    loading.value = true;
    const users = await getUsers();
    console.log(users)
    if (Array.isArray(users)) {
      data.value = users.map(user => ({
        firstName: user.firstName,  //muy importante que aqui se llame igual lo que printeo a lo que busco en la respuesta de mi console.log(users)
        lastName: user.lastName, 
        email: user.email,
      }));
    } else {
      console.error("La respuesta no es un array de usuarios");
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #a8c3ff;
}

.sidebar {
  flex: 0 0 200px;
  background-color: #4a4a32;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

}

.main-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #a8c3ff;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.header h2 {
  font-size: 1.8rem;
  color: #4a4a32;
}

.add-user-btn {
  font-size: 1rem;
  color: #4a4a32;
  cursor: pointer;
  transition: color 0.3s;
}

.add-user-btn:hover {
  color: #6b8ef7;
}

.table-container {
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

.n-table th {
  background-color: #bed0f8;
  text-align: center;
  font-weight: bold;
}

.n-table td {
  padding: 12px;
  text-align: center;
}

.info-text {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #4a4a32;
  text-align: center;
}
</style>
