import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'ComercioElectronico',
    clientId: 'frontend-ce'
});

let initialized = false;
keycloak.authServerUrl = 'http://localhost:8080'; 

export const initKeycloak = (isauthenticated) => {
    if (!initialized) {
        initialized = true;
        return keycloak.init({ onLoad: 'login-required' })
            .then(authenticated => {
                isauthenticated.value = authenticated; // Actualiza isauthenticated aquí
                if (authenticated) {
                    // Extrae el nombre de usuario desde el token decodificado
                    const username = keycloak.tokenParsed?.preferred_username || 'Usuario desconocido';
                    console.log(`Authenticated as: ${username}`);
                    const roles = keycloak.tokenParsed?.realm_access?.roles || [];
                    console.log(`Role as:` , roles)
                    const isAdmin = roles.includes('admin');
                    return { username, isAdmin };
                }
            })
            .catch(error => {
                console.error('Failed to initialize Keycloak', error);
            });
    }
};

export const forgotPassword = () => {
    const resetPasswordUrl = `${keycloak.authServerUrl}/realms/${keycloak.realm}/account`;
    window.location.href = resetPasswordUrl;
};


export default keycloak;