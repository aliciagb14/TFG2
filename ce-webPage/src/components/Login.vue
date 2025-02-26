<template>
    <div class="Login-container" v-if="!isauthenticated">
        <div class="form-container">
            <h1>Gestión de Tiendas</h1>
            <div>
                <n-space vertical class="input-container">
                    <n-input v-model:value="username" type="text" placeholder="Username" clearable  />
                    <n-input v-model:value="password" type="password" placeholder="Password" show-password-on="click" clearable/>
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
    <ListUsers v-if="isauthenticated && isAdmin" :username="authenticatedUser" :isAdmin="isAdmin"/>
</template>
  
<script setup>
import {ref, onMounted, watch} from 'vue'
import ListUsers from '@/components/ListUsers.vue';
import { NInput, NButton, NCard, NSpace, NIcon } from 'naive-ui'
import { LockClosedOutline as ForgotPasswordIcon} from '@vicons/ionicons5';
import keycloak, { initKeycloak, forgotPassword } from '../../keycloak'

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
    if (response && keycloak.token) {
        console.log('Token received:', keycloak.token);
        const tokenParsed = keycloak.tokenParsed;
        const email = tokenParsed?.email || '';
        console.log(email)
        authenticatedUser.value = tokenParsed?.preferred_username || 'Usuario';
        if (email.endsWith('@upm.es')) {
            isAdmin.value = true
        } else {
            isAdmin.value = false
        }
        isauthenticated.value = true;
        console.log('Authenticated with {username + password}');
    }
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
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #a8c3ff, #6b8ef7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-container {
        background: white;
        padding: 30px 25px;
        border-radius: 15px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 350px;
    }

    h1 {
        margin-bottom: 20px;
        font-size: 2.2rem;
        color: #3a3a3a;
        font-weight: bold;
    }

    .input-container {
        width: 100%;
        margin-top: 15px;
    }

    .n-input:focus {
        border-color: #4a6cf7;
        box-shadow: 0 0 8px rgba(75, 102, 247, 0.3);
    }

    .button-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 15px;
    }

    .n-button {
        padding: 12px;
        font-size: 1rem;
        border-radius: 8px;
        width: 100%;
        transition: all 0.3s ease;
        margin-top:10px
    }

    .n-button:hover {
        transform: scale(1.05);
    }

    .forgot-password {
        margin-top: 12px;
        font-size: 0.9rem;
        color: #4a4a32;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        cursor: pointer;
        transition: color 0.3s ease;
    }

    .forgot-password:hover {
        color: #6b8ef7;
    }
</style>