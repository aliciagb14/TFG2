import axios from 'axios';
import keycloak, { initKeycloak } from '../../keycloak'

const KEYCLOAK_URL = 'http://localhost:8080/admin/realms/ComercioElectronico/users'

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
    
        const response = await axios.get(KEYCLOAK_URL, config);
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

export const createUser = async (user) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.post(KEYCLOAK_URL, {
            username: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            enabled: true,
        })
  
      return response.data;
    } catch (error) {
      console.error("Error al registrar usuario en Keycloak:", error);
      throw error;
    }
  };

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
        const response = await axios.delete(`KEYCLOAK_URL/${id}`, config)
        
        console.log(`Usuario con ID ${id} eliminado exitosamente de Keycloak.`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar usuario con ID ${id} de Keycloak:`, error);
        throw error;
    }
};
