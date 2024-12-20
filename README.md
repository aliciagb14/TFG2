# TFG2
Servicio web donde subir las tiendas de PrestaShop de la asignatura de Comercio Electrónico 

Estructura General del Proyecto
Roles de los Componentes:
1. Frontend (Vue.js):
 Interfaz gráfica para que los usuarios gestionen sus tiendas.
 Funcionalidades:
 - Registro y autenticación de usuarios.
 - Creación y configuración de tiendas.
 - Subida de archivos SQL (bases de datos).
 - Gestión de archivos (imágenes, temas, módulos).
2. Backend (FastAPI):
 Expondrá APIs RESTful para gestionar:
 - Usuarios y autenticación (delegado a Keycloak).
 - Creación de bases de datos para tiendas.
 - Interacción con MinIO para el almacenamiento.
 - Ejecución de scripts para configurar instancias de Prestashop.
3. Keycloak:
 Gestión de usuarios y roles:
 - Administra usuarios y contraseñas.
 - Proporciona tokens de autenticación OAuth2/JWT para las peticiones al backend.
4. SQL (MariaDB/MySQL):
 - Almacena los datos de las tiendas (tablas de Prestashop).
 - Mantiene la información del sistema (si necesitas almacenar datos adicionales).
5. MinIO:
 - Gestión del almacenamiento de archivos (temas, imágenes, módulos).
