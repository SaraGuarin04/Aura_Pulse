# 🚀 Aura Pulse API - Node.js + Express + MongoDB

API REST construida con **Node.js**, **Express**, **MongoDB** y **TypeScript**, siguiendo buenas prácticas como arquitectura modular, validaciones con Zod, documentación con Swagger y autenticación con JWT.

---

### 📦 Tecnologías utilizadas

* **Node.js**
* **Express 5**
* **MongoDB**
* **TypeScript**
* **JWT (jsonwebtoken)** → Autenticación
* **bcrypt** → Encriptación de contraseñas
* **Zod** → Validación de datos
* **Swagger (OpenAPI)** → Documentación de API
* **Helmet** → Seguridad HTTP
* **CORS**
* **Morgan** → Logging

---

### 📁 Estructura del proyecto

```bash
src/
│
├── modules/
│   ├── auth/          # Autenticación y JWT
│   ├── users/         # Gestión de usuarios
│   ├── actions/       # Acciones ecológicas
│   ├── challenges/    # Retos y desafíos
│   └── achievements/  # Logros y medallas
│
├── config/            # Variables de entorno y constantes
├── middlewares/       # Validaciones y AuthMiddleware
├── routes/            # Definición de rutas globales
├── database/          # Configuración de MongoDB
└── server.ts          # Punto de entrada de la aplicación
```
---
## ⚙️ Instalación

```bash
git clone https://github.com/SaraGuarin04/Aura_Pulse.git
cd Aura_Pulse
npm install
```

## 🏃‍♂️ Ejecución

```bash
npm run build
npm start
```
---

## 🔐 Autenticación
Usa JWT para proteger las rutas privadas:
```
Authorization: Bearer <token>
```
---

## 📚 Swagger
Accede a la documentación interactiva en el siguiente enlace:
```
🔗 https://aura-pulse.onrender.com/api/v2/docs/
```
---

## 📊 Scripts

```bash
npm run build
npm start
```
---
## 👩‍💻 Autora
Sara Camila Guarín Guerrero
