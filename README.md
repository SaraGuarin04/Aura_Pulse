🚀 Aura Pulse API - Node.js + Express + MongoDB
API REST construida con Node.js, Express, MongoDB y TypeScript, diseñada para la gestión de acciones ecológicas, retos y logros, siguiendo una arquitectura modular y documentada con Swagger.

📦 Tecnologías utilizadas
Node.js & Express

MongoDB (Mongoose)

TypeScript

JWT (jsonwebtoken) → Autenticación segura

bcrypt → Encriptación de contraseñas

Zod → Validación de esquemas y datos

Swagger (OpenAPI) → Documentación interactiva

CORS & Morgan

📁 Estructura del proyecto
Plaintext
src/
│
├── modules/
│   ├── auth/          # Registro y Login
│   ├── users/         # Gestión de usuarios
│   ├── actions/       # Acciones ecológicas
│   ├── challenges/    # Retos globales
│   └── achievements/  # Logros y medallas
│
├── middlewares/       # Auth y Validaciones
├── config/            # Variables de entorno
├── database/          # Conexión a MongoDB
└── server.ts          # Punto de entrada
⚙️ Instalación
Bash
# Clonar el repositorio
git clone https://github.com/SaraGuarin04/Aura_Pulse.git

# Entrar a la carpeta
cd Aura_Pulse

# Instalar dependencias
npm install
🏃‍♂️ Ejecución
Bash
# Modo desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar producción
npm start
🔐 Autenticación
La mayoría de las rutas requieren autenticación mediante un token Bearer.
Para usarlo en Swagger o Postman:
Authorization: Bearer <tu_token_jwt>

📚 Swagger (Documentación)
Puedes visualizar y probar la API de forma interactiva en el siguiente enlace de Render:

🔗 https://aura-pulse.onrender.com/api/v2/docs/

📊 Scripts disponibles
npm run dev: Ejecuta el servidor con recarga automática.

npm run build: Compila el código TypeScript a JavaScript.

npm start: Inicia el servidor compilado.

👩‍💻 Autora
Sara Camila Guarín Guerrero
