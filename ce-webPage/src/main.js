import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';

const app = createApp(App);

app.use(router); // Usa el router en la aplicación
app.mount('#app');

//createApp(App).mount('#app')