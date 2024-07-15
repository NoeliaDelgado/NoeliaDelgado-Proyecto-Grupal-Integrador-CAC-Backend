# Proyecto-Grupal-Integrador-CAC


## Comisión 24167- Grupo 22 

### Integrantes:
* Delgado, Noelia  
* Delgado, Silvina   


## Descripción del proyecto
Para esta instancia, se actualizó la aplicación web. Esto permitió gestionar información sobre el personal de la clínica mediante operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para la entidad Medico.

### Configuración del Proyecto
1. Flask: Framework web utilizado para manejar rutas y lógica de la aplicación.
2. SQLAlchemy: Biblioteca ORM (Object Relational Mapper)  utilizada para interactuar con la base de datos.
3. CORS: Habilitado para permitir solicitudes desde el frontend.

### Modelos de Base de Datos
**Especialidad:** Representa una especialidad médica.

     id_especialidad (PK)
     especialidad

**Medico:** Representa un médico y sus detalles.

    id (PK)
    nombre 
    foto
    id_especialidad (FK)
    descripcion

Relación uno a muchos con Especialidad (cada especialidad médica puede estar asociada con múltiples médicos y cada médico tiene una especialidad específica).


### Principales endpoints de la Aplicación

| Endpoint              | Método HTTP | Descripción                                                                              |
|-----------------------|-------------|------------------------------------------------------------------------------------------|
| /registro             | POST        | Crea un nuevo registro de médico.                                                         |
| /medicos              | GET         | Retorna todos los médicos y sus especialidades.                                            |
| /update/id          | PUT         | Modifica un registro de médico por ID.                                                    |
| /borrar/id          | DELETE      | Elimina un registro de médico por ID.                                                     |
| /                    | GET         | Renderiza la página de inicio.                                                            |
| /especialidades       | GET         | Renderiza la página de especialidades ó crea un nuevo médico si el usuario está autenticado.|
| /login                | GET, POST   | Maneja el inicio de sesión.                                                               |
| /logout               | GET         | Cierra la sesión del usuario.                                                             |

### Autenticación de usuario
La autenticación se realiza mediante un formulario de inicio de sesión que verifica las credenciales del usuario. Actualmente, solo un usuario __admin__ puede acceder a ciertas funcionalidades protegidas utilizando la contraseña __admin__.

La sesión del usuario se gestiona utilizando una clave secreta en Flask (SECRET_KEY). Al iniciar sesión correctamente, el usuario puede acceder a la gestión de médicos.

