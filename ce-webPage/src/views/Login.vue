<template>
    <Login/>
    <!-- <div >
    <div class="Login-container" v-if="!isauthenticated">
        <div class="form-container">
            <h1>Gestión de Tiendas</h1>
            <div>
                <n-space vertical class="input-container">
                    <n-input round v-model:value="username" type="text" placeholder="Username" />
                    <n-input round v-model:value="password" type="password" placeholder="Password" />
                </n-space>
                <div class="button-container">
                    <n-button type="success" ghost @click="handleLogin" >Login</n-button>
                    <n-button type="error" ghost @click="forgotPassword">Forgot your password?
                        <n-icon><ForgotPasswordIcon/></n-icon>
                    </n-button>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script setup>
import {ref, onMounted, watch} from 'vue'
import Login  from '@/components/Login.vue'
import ListUsers from '@/components/ListUsers.vue';
import { NInput, NButton, NCard, NSpace, NIcon } from 'naive-ui'
import { LockClosedOutline as ForgotPasswordIcon} from '@vicons/ionicons5';
import keycloak, { initKeycloak } from '../../keycloak'
import { useRouter } from 'vue-router';
const router = useRouter();


const username = ref('')
const password = ref('')
const isauthenticated = ref(false)
const authenticatedUser = ref('');
const isAdmin = ref(true)

//DESCOMENTAR
// onMounted(() => {
// // //   initKeycloak(isauthenticated);
// //     initKeycloak(isauthenticated).then(() => {
// //         if (isauthenticated.value) {
// //             authenticatedUser.value = keycloak.tokenParsed?.preferred_username || 'Usuario';
// //             isAdmin.value = keycloak.tokenParsed?.realm_access?.roles.includes('admin') || false;
// //         }
// //     });
// });

//PRUEBA
onMounted(() => {
    router.push('/home');
    // initKeycloak(isauthenticated).then(() => {
    //     if (keycloak.authenticated) {
    //         console.log('Usuario ya autenticado, redirigiendo...');
    //         router.push('/home');
    //     }
    // });
});

//PRUEBA
const handleLogin = async () => {
    try {
        console.log('Intentando iniciar sesión con:', username.value, password.value);
        
        await keycloak.login({
            username: username.value,
            password: password.value,
            grantType: 'password',
            clientId: 'frontend-ce',
        });

        // Esperamos un poco para que Keycloak actualice su estado
        setTimeout(() => {
            if (keycloak.authenticated) {
                console.log('Autenticación exitosa, redirigiendo...');
                authenticatedUser.value = keycloak.tokenParsed?.preferred_username || 'Usuario';
                isauthenticated.value = true;
                router.push('/home'); // Redirige a la vista "Home"
            } else {
                console.warn('No se pudo autenticar al usuario.');
            }
        }, 1000);
    } catch (error) {
        console.error('Fallo en la autenticación:', error);
    }
};

//DESCOMENTAR
// const handleLogin = async () => {
//   try {
//     const response = await keycloak.login({
//         username: username.value,
//         password: password.value,
//         grantType: 'password',
//         clientId: 'frontend-ce',
//     });
//     console.log(username)
//     console.log(password)
//     console.log("preIF")
//     if (response && keycloak.token) {
//         console.log('Token received:', keycloak.token);
//         const tokenParsed = keycloak.tokenParsed;  // Keycloak suele tener tokenParsed que contiene info del usuario
//         authenticatedUser.value = tokenParsed?.preferred_username || 'Usuario';
//         isauthenticated.value = true;
//         console.log('Authenticated with {username + password}');
//         router.push('/home');
//     }
//     console.log("postIF")
//   } catch (error) {
//     console.error('Authentication failed:', error);
//   }
// };

watch(isauthenticated, (newValue) => {
    if (newValue) {
        console.log('User is authenticated, displaying ListUsers component.');
    }
});

</script>

<style scoped></style>
