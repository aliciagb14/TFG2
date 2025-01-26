import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'ComercioElectronico',
    clientId: 'frontend-ce'
});

let initialized = false;

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
                }
            })
            .catch(error => {
                console.error('Failed to initialize Keycloak', error);
            });
    }
};


export default keycloak;