import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'ComercioElectronico',
    clientId: 'frontend-client'
});

export default keycloak;