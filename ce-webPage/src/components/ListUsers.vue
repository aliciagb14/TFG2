<template>
    <div>
        <h3>Lista de Usuarios</h3>
        <n-data-table v-if="isAdmin && !loading" :columns="columns" :data="data" bordered />
        <p v-else>No tienes permisos para ver esta información.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NDataTable } from 'naive-ui';
import { getUsers } from '@/services/UserService'; 

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
        firstName: user.firstName,
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
.n-table {
    margin-top: 20px;
}

.n-table th {
    background-color: #f4f4f4;
    text-align: left;
}

.n-table td {
    padding: 12px;
}
</style>
