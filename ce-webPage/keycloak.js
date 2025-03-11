import Keycloak from 'keycloak-js';
import axios from 'axios';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'ComercioElectronico',
  clientId: 'frontend-ce'
});

const authUrl = 'http://localhost:8080/realms/ComercioElectronico/protocol/openid-connect/token';

export const getAuthToken = async () => {
    let token = localStorage.getItem('access_token');

    if (!token) {
        throw new Error("❌ No hay token disponible. Inicia sesión primero.");
    }

    return token;
};

export const getAdminToken = async () => {
    try {
        const response = await axios.post(authUrl, new URLSearchParams({
            client_id: 'frontend-ce',
            grant_type: 'password',
            username,
            password
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data.access_token;
    } catch (error) {
        console.error("❌ Error al obtener el token de administrador:", error.response?.data || error.message);
        throw error;
    }
};


export const loginWithCredentials = async (username, password) => {
    try {
        const response = await axios.post(authUrl, new URLSearchParams({
            client_id: 'frontend-ce',
            grant_type: 'password',
            username,
            password
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const data = response.data;
        console.log("🔑 Token recibido:", data.access_token);

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        const tokenDecoded = JSON.parse(atob(data.access_token.split('.')[1]));
        const user = tokenDecoded.preferred_username || "Usuario";
        const roles = tokenDecoded.realm_access?.roles || [];

        console.log("👤 Usuario autenticado:", user);
        console.log("🎭 Roles:", roles);

        return { username: user, roles, token: data.access_token };

    } catch (error) {
        console.error("❌ Error en la autenticación:", error.response?.data || error.message);
        throw error;
    }
};




export default keycloak;
