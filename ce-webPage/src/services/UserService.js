import axios from 'axios';
import keycloak, { initKeycloak } from '../../keycloak'

export const getUsers = async () => {
    try {
        if (!keycloak.authenticated) {
            throw new Error("No estás autenticado en Keycloak.");
        }
        const token = keycloak.token;
    
        const config = {
            headers: {
            Authorization: `Bearer ${token}`, 
            }
        };
    
        const response = await axios.get('http://localhost:8080/admin/realms/ComercioElectronico/users', config);
        return response.data.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        }));

    } catch (error) {
        console.error('Error al obtener usuarios desde Keycloak:', error);
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
        if (!userId) {
            throw new Error('Usuario no encontrado.');
        }

        const response = await axios.delete(`http://localhost:8080/admin/realms/ComercioElectronico/users/${userId}`, config);

        console.log("Usuario eliminado con éxito:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error.response ? error.response.data : error.message);
    }
}
