<template>
  <n-grid >
    <n-grid-item class="sidebar-menu" span="12 m:3">
        <Sidebar/>
    </n-grid-item>
    <n-grid-item class="header" span="12 m:21">
        <h2>Bienvenido, {{ username }}</h2>
        <div>
          <h2>Users</h2>
          <n-button @click="showModal=!showModal">
            <n-icon size="20">
              <AddUserIcon /> 
            </n-icon>
          </n-button>
        </div>
        <AddUserModal v-model:show="showModal"  @userAdded="handleUserAdded"/>
        
        <div class="table-container">
          <n-data-table v-if="isAdmin && !loading" :columns="columns" :data="data" bordered />
          <p v-else>No tienes permisos para ver esta información.</p>
        </div>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { ref, onMounted, h, watch } from 'vue';
import { NDataTable, NGrid, NGridItem, NIcon, NButton } from 'naive-ui';
import { getUsers, deleteUserService } from '@/services/UserService';
import { PersonAddSharp as AddUserIcon, CloseCircleOutline as DeleteUserIcon} from '@vicons/ionicons5';
import AddUserModal from '@/components/AddUserModal.vue'
import Sidebar from '@/utils/Sidebar.vue';

const data = ref([]);
const loading = ref(true)
const showModal = ref(false);
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
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (row) => h(
        NButton,
        {
          size: 'small',
          type: 'error',
          onClick: () => deleteUser(row.id),
        },
        {
          default: () => h(NIcon, () => h(DeleteUserIcon) )
        }
      )
    }
];

const props = defineProps({
  username: String,
  isAdmin: Boolean
})

const deleteUser = async (userId) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar este usuario?`)) {
        return;
    }
    try {
        await deleteUserService(userId);

        data.value = data.value.filter(user => user.id !== userId);

        console.log(`Usuario con ID ${userId} eliminado de la tabla.`);
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
};



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

const handleUserAdded = (newUser) => {
  data.value.push(newUser);
};

watch(showModal, (newVal) => {
  console.log('showModal cambio a: ', newVal);
});

</script>

<style scoped>
.sidebar-menu {
  background-color: #2e3d4d; /* Color de fondo para diferenciar el sidebar */
  min-width: 10vw;
  margin:0;
  min-height: 100vh; /* Hace que el sidebar ocupe toda la altura de la pantalla */
  border-right: 1px solid #240b0b; /* Línea divisoria con el contenido principal */
}

.header {
  background-color: #a8c3ff;
  min-height: 100vh;
  min-width: 70vw;
  margin-bottom: 16px;
}

.table-container {
  size: 1px;
}

</style>
