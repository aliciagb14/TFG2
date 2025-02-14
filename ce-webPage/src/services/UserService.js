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
            Authorization: `Bearer ${token}`,  // Authorization con el token de Keycloak
            }
        };
    
        const response = await axios.get('http://localhost:8080/admin/realms/ComercioElectronico/users', config);
        return response.data.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }));

    } catch (error) {
        console.error('Error al obtener usuarios desde Keycloak:', error);
        return [];  
    }
};

export async function createUser(user) {
    await axios.post(`${API_URL}/users`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      credentials: [{ type: "password", value: user.password, temporary: false }]
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
}

export const deleteUserService = async (id) => {
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
        const response = await axios.delete(`http://localhost:8080/admin/realms/ComercioElectronico/users/${id}`, config)
        
        console.log(`Usuario con ID ${id} eliminado exitosamente de Keycloak.`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar usuario con ID ${id} de Keycloak:`, error);
        throw error;
    }
};
