<template>
    <!-- <div > -->
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
    </div>
    <ListUsers v-if="isauthenticated" :username="authenticatedUser" :isAdmin="isAdmin"/>
</template>
  
<script setup>
import {ref, onMounted, watch} from 'vue'
import ListUsers from '@/components/ListUsers.vue';
import { NInput, NButton, NCard, NSpace, NIcon } from 'naive-ui'
import { LockClosedOutline as ForgotPasswordIcon} from '@vicons/ionicons5';
import keycloak, { initKeycloak } from '../../keycloak'

const username = ref('')
const password = ref('')
const isauthenticated = ref(false)
const authenticatedUser = ref('');
const isAdmin = ref(true)

onMounted(() => {
//   initKeycloak(isauthenticated);
    initKeycloak(isauthenticated).then(() => {
        if (isauthenticated.value) {
            authenticatedUser.value = keycloak.tokenParsed?.preferred_username || 'Usuario';
            isAdmin.value = keycloak.tokenParsed?.realm_access?.roles.includes('admin') || false;
        }
    });
});

const handleLogin = async () => {
  try {
    const response = await keycloak.login({
        username: username.value,
        password: password.value,
        grantType: 'password',
        clientId: 'frontend-ce',
    });
    console.log(username)
    console.log(password)
    console.log("preIF")
    if (response && keycloak.token) {
        console.log('Token received:', keycloak.token);
        const tokenParsed = keycloak.tokenParsed;  // Keycloak suele tener tokenParsed que contiene info del usuario
        authenticatedUser.value = tokenParsed?.preferred_username || 'Usuario';
        isauthenticated.value = true;
        console.log('Authenticated with {username + password}');
    }
    console.log("postIF")
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};

watch(isauthenticated, (newValue) => {
    if (newValue) {
        console.log('User is authenticated, displaying ListUsers component.');
    }
});

</script>


<style scoped>
    .Login-container {
        background-color: #bed0f8;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        margin-bottom: 20px;
        font-size: 2rem;
        color: #333;
    }

    .input-container {
        width: 200%;
        align-content: center;
    }

    .n-input {
        width: 100%;
    }

    .button-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
    }

    .n-button {
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 5px;
    }
</style>