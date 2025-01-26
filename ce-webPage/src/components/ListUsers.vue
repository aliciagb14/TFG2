<template>
    <div>
        <h2>Bienvenido, {{ username }}</h2>
        <h3>Lista de Usuarios</h3>
        <!-- <n-table :columns="columns" :data="user" bordered /> -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NTable } from 'naive-ui';

const user = ref({
    nombre: '',
    apellidos: '',
    username: '',
    email: '',
})

const columns = [
    {
        title: 'Nombre',
        key: 'nombre',
    },
    {
        title: 'Apellidos',
        key: 'apellidos',
    },
    {
        title: 'Correo Electrónico',
        key: 'email',
    }
];


// const users = ref<User>([]);

const props = defineProps({
  username: String
})


const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@alumnos\.upm\.es$/;
    return regex.test(email);
};

// const fetchUsers = async () => {
//     try {
//         const response = await fetch('/api/users?realm=COmercioElectronico');
        
//         if (response.ok) {
//             // Verifica el tipo de contenido antes de procesarlo
//             const contentType = response.headers.get('Content-Type');
//             if (contentType && contentType.includes('application/json')) {
//                 const fetchedUsers = await response.json();
//                 // Filtramos los usuarios por correo electrónico que tenga la extensión @alumnos.upm.es
//                 users.value = fetchedUsers.filter((user) => isValidEmail(user.email));
//             } else {
//                 console.error('La respuesta no es JSON:', contentType);
//             }
//         } else {
//             console.error('Error al obtener usuarios:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error al obtener usuarios:', error);
//     }
// };


// onMounted(() => {
//     fetchUsers();
// });
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
