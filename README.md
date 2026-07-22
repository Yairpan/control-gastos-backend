# FinTrack API — Sistema de Control de Gastos Personales

API REST modular, escalable y segura diseñada para la gestión de finanzas y control de gastos personales. El proyecto implementa una arquitectura multicapa profesional (separación estricta de responsabilidades) y validaciones optimizadas a nivel de base de datos para garantizar la consistencia y el alto rendimiento bajo escenarios de producción masiva.

## Características Principales
- **Arquitectura de Software Multicapa:** Separación lógica y física de responsabilidades en carpetas independientes (`routes`, `middlewares`, `controllers`, `services`), facilitando el mantenimiento y el escalado del sistema.
- **Seguridad en Capa de Red (Helmet):** Implementación de **Helmet.js** para mitigar vulnerabilidades web comunes mediante la configuración automática de cabeceras HTTP seguras (XSS, Clickjacking, etc.).
- **Autenticación Segura y Control de Sesiones (Auth):** Flujo completo de registro e inicio de sesión integrando encriptación de contraseñas mediante hash asíncrono con `bcrypt` y manejo de sesiones sin estado mediante **JSON Web Tokens (JWT)**.
- **Seguridad y Propietariado de Datos (Candados de Control):** Los endpoints críticos de consulta, actualización y eliminación validan estrictamente que el recurso pertenezca al usuario autenticado extraído del token (`WHERE idGasto = ? AND usuarioId = ?`), mitigando de forma definitiva vulnerabilidades de acceso cruzado (IDOR).
- **Rendimiento Avanzado (Anti-Race Conditions):** Optimización del I/O de red eliminando consultas intermedias redundantes (`SELECT` previos de comprobación) y delegando la unicidad de registros a restricciones `UNIQUE` nativas en MySQL. Captura y manejo defensivo de códigos de error de sistema (`ER_DUP_ENTRY` / Error `1062`) para responder con estados limpios (`400 Bad Request`).

## 🛠️ Tecnologías Utilizadas
- **Runtime:** Node.js (Asincronía nativa mediante `async/await` y Promesas)
- **Framework Web:** Express.js
- **Seguridad:** Helmet.js, Bcrypt & JsonWebToken (JWT)
- **Base de Datos:** MySQL / MariaDB (Driver nativo `mysql2`)

## Estructura del Proyecto Real
```text 
mi-backend/
 routes/          # Enrutadores HTTP y mapeo de endpoints
 middlewares/     # Validadores de datos y verificación de tokens JWT
 controllers/     # Orquestadores de peticiones y manejo de respuestas HTTP
 service/         # Lógica de negocio pura, reglas del sistema y queries SQL
   app.js           # Archivo central de arranque y configuración del servidor (Helmet integrado)
   db.js            # Módulo de conexión al pool de la base de datos
 package.json     # Manifiesto del proyecto y control de dependencias
```

## Endpoints de la API

### Usuarios & Autenticación
- `POST /usuarios/registro` - Registra un nuevo usuario en el sistema. Valida campos obligatorios y gestiona correos duplicados de forma eficiente.
- `POST /usuarios/login` - Autentica las credenciales con `bcrypt.compare` y retorna un token de acceso JWT firmado.

### Gestión de Gastos (Rutas Protegidas por JWT Middleware)
- `POST /gastos` - Crea un nuevo registro financiero asociándolo automáticamente al `IdUsuario` inyectado de manera segura por el token.
- `GET /gastos` - Obtiene la lista completa de gastos del usuario autenticado ordenados de forma descendente por fecha (`ORDER BY fecha DESC`), incluyendo metadatos de conteo dinámico (`total`).
- `PUT /gastos/:idGasto` - Actualiza los valores de monto, descripción o fecha de un gasto específico, validando los permisos de propiedad del recurso.
- `DELETE /gastos/:idGasto` - Elimina de forma segura un gasto verificado de la base de datos.
