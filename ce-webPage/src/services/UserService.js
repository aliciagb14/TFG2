import axios from 'axios';
import keycloak, { getAuthToken } from '../../keycloak'

export const getUsers = async (token) => {
    try {
        if (!token) {
            throw new Error("❌ No hay token disponible. Inicia sesión primero.");
        }

        const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
        const roles = tokenDecoded.realm_access?.roles || [];

        if (!roles.includes('admin')) {
            throw new Error("⛔ No tienes permisos para ver la lista de usuarios.");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(`http://localhost:8080/admin/realms/ComercioElectronico/users`, config);
        console.log(response)
        console.log("📜 Lista de usuarios obtenida:", response.data);

        return response.data.map(user => ({
            id: user.id,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            username: user.username || ''
        }));

    } catch (error) {
        console.error("❌ Error al obtener usuarios desde Keycloak:", error.response?.data || error.message);
        return [];
    }
};

export async function createUserKeycloak(user) {
    if (!user.username) {
        user.username = (user.firstName + user.lastName).replace(/\s+/g, '').toLowerCase();
    }
    if (user.username.length < 3 || user.username.length > 30) {
        console.error('Error: El username debe tener entre 3 y 30 caracteres.');
        return;
    }
    const token = keycloak.token;

    if (!token) {
        throw new Error('Token de autenticación no disponible.');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    try {
        const response = await axios.post(`http://localhost:8080/admin/realms/ComercioElectronico/users`, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user.id,
            username: user.username,
            credentials: [{
                type: "password",
                value: user.password,
                temporary: false
            }],
            enabled: true
        }, config);

        console.log("Usuario creado con éxito:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error al crear el usuario:', error.response ? error.response.data : error);
    }
}

export async function deleteUserKeycloak(userId) {
    try {
        if (!userId) {
            throw new Error('Usuario no encontrado.');
        }

        const token = getAdminToken() //getAuthToken();
    
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        const response = await axios.delete(`http://localhost:8080/admin/realms/ComercioElectronico/users/${userId}`, config);

        console.log("Usuario eliminado con éxito:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error.response ? error.response.data : error.message);
    }
}

export async function updateUserKeycloak(user) {
    const token = keycloak.token;

    if (!token) {
        throw new Error('Token de autenticación no disponible.');
    }

    if (!user.id) {
        throw new Error('El usuario no tiene un ID válido.');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.put(`http://localhost:8080/admin/realms/ComercioElectronico/users/${user.id}`, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            enabled: true
        }, config);

        console.log("Usuario actualizado con éxito", response.data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
        throw error;
    }
}
