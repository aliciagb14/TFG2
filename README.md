# TFG2
Servicio web donde subir las tiendas de PrestaShop de la asignatura de Comercio Electrónico 

Estructura General del Proyecto
Roles de los Componentes:
1. Frontend (Vue.js):
 Interfaz gráfica para que los usuarios gestionen sus backups.
 Funcionalidades:
 - Subida de archivos SQL (bases de datos).
 - Gestión de archivos
 - Comunicación con el backend mediante APIs RESTful
2. Backend (FastAPI):
 Expondrá APIs RESTful para gestionar:
 - Gestión de backups
 - Autenticación y autorización con Keycloak.
 - Interacción con MinIO para el almacenamiento.
3. Keycloak:
 Gestión de usuarios y roles:
 - Administra usuarios y contraseñas.
 - Proporciona tokens de autenticación OAuth2/JWT para las peticiones al backend.
4. MinIO:
 - Almacenamiento de los backups de las tiendas de Prestashop.
 - Es utilizado para subir, listar y eliminar los archivos de backup.
   Se puede ver el [frontend](https://www.canva.com/design/DAGZ1Mo0siI/WryKV47wWqfTLKU76XSrTg/edit?utm_content=DAGZ1Mo0siI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
5. Opcional: Usar Azure si queremos acceder desde cualquier lugar.


/* Añadida la nueva rama (Desarrollo) */
