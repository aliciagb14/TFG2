<template>
    <h1>Gestión de Tiendas</h1>

    <n-space vertical>
        <n-input round v-model:value="username" type="text" placeholder="Username" />
        <n-input round v-model:value="password" type="password" placeholder="Password" />
    </n-space>
    <div class="button-container">
        <n-button type="success" ghost @click="handleLogin" >Login</n-button>
        <n-button type="error" ghost @click="forgotPassword">Forgot your password?
            <n-icon><ForgotPasswordIcon/></n-icon>
        </n-button>
        <!-- Enlace para ir a la página "X de" -->
        <!-- <router-link to="/about">Ir a Acerca de</router-link>-->
    </div>
</template>
  
<script setup>
import {ref} from 'vue'
import { NInput, NButton, NCard, NSpace, NIcon } from 'naive-ui'
import { LockClosedOutline as ForgotPasswordIcon} from '@vicons/ionicons5';
const username = ref('')
const password = ref('')

const handleLogin = () => {
    
}
</script>


<style scoped>
    .button-container {
        margin-top: 20px;
        margin-left: 230px;
    }
</style>