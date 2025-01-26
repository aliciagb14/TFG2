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
        return response.data; 

    } catch (error) {
        console.error('Error al obtener usuarios desde Keycloak:', error);
        return [];  
    }
};
