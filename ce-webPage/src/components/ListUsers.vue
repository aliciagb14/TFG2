<template>
  <n-grid >
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

        <EditUserModal
          v-model:show="showEditModal"
          :user="userToEdit"
          @update:show="showModal = $event"
          @editUser="handleEditUser"
        />
        <DeleteUserModal 
          v-model:show="showDeleteModal"
          :user="userToDelete"
          @update:show="showModal = $event"
          @deleteUser="handleDeleteUser"
        />
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { ref, onMounted, h, watch } from 'vue';
import { NDataTable, NGrid, NGridItem, NIcon, NButton, NDatePicker } from 'naive-ui';
import { getUsers, deleteUserKeycloak } from '@/services/UserService';
import { PersonAddSharp as AddUserIcon, CloseCircleOutline as DeleteUserIcon, CreateOutline as EditUserIcon} from '@vicons/ionicons5';
import AddUserModal from '@/components/AddUserModal.vue'
import EditUserModal from '@/components/EditUserModal.vue'
import DeleteUserModal from '@/components/DeleteUserModal.vue';

const data = ref([]);
const loading = ref(true)
const showModal = ref(false);
const showDeleteModal = ref(false);
const showEditModal = ref(false)
const userToDelete = ref(null);
const userToEdit = ref(null);


onMounted(async () => {
    console.log('isAdmin:', props.isAdmin);
    if (props.isAdmin) {
        await fetchUsers();
    } else {
        console.warn('Acceso restringido. Solo los administradores pueden ver la lista de usuarios.');
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
      title: 'Rol',
      key: 'rol',
    },
    {
      title: 'Año académico',
      key: 'añoAcademico',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (row) => h('div', { style: 'display: flex; gap: 8px;' }, [
        h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            onClick: () => editUser(row),
          },
          {
            default: () => h(NIcon, () => h(EditUserIcon))
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            onClick: () => deleteUser(row),
          },
          {
            default: () => h(NIcon, () => h(DeleteUserIcon))
          }
        )
      ])
    }
];

const props = defineProps({
  username: String,
  isAdmin: Boolean
})

const deleteUser = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

const editUser = (user)=> {
  userToEdit.value = user
  showEditModal.value = true
}

const getActualYear = () => {
  return new Date().getFullYear();
};

const handleDeleteUser = async (user) => {
  console.log("el usertodelete es: ", user)
  if (!user) { 
    console.error("Error: No se pudo eliminar el usuario porque no tiene un ID válido.");
    return;
  }
  try {
    await deleteUserKeycloak(user.id);

    data.value = data.value.filter((u) => u.id !== user.id);
    
    await fetchUsers();
    console.log(`Usuario ${user.firstName} eliminado.`);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
};

const handleEditUser = async (updatedUser) => {
  console.log("el usertoedit es: ", updatedUser)

  if (!updatedUser) {
    console.error("Error: No se pudo actualizar el usuario porque no tiene un ID válido.");
    return;
  }

  try {
    const index = data.value.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      data.value[index] = { ...updatedUser };
    }

    showEditModal.value = false;
    console.log(`Usuario ${updatedUser.firstName} actualizado correctamente.`);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
}

const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(alumnos\.upm\.es|upm\.es)$/;
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
        id: user.id,
        username: user.username,
        rol: getRol(user),
        añoAcademico: getActualYear()
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

const getRol = (newUser) => {
  if (!isValidEmail(newUser.email)) {
        newUser.email = ""; 
        return "";
    }
    return newUser.email.endsWith("@alumnos.upm.es") ? "Usuario" : "Profesor";
}

const handleUserAdded = (newUser) => {
  console.log('Usuario agregado:', newUser);
  
  data.value.push({
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    rol: getRol(newUser),
  });
};


watch(showModal, (newVal) => {
  console.log('showModal cambio a: ', newVal);
});

</script>

<style scoped>

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