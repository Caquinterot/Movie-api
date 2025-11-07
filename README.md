# 🎬 Movies API  
**Node.js | Express | Sequelize | PostgreSQL**

La **Movies API** es un servicio RESTful diseñado para administrar un catálogo de películas, actores, directores y géneros.  
Implementa una arquitectura escalable, relaciones **muchos-a-muchos (M:N)** y controladores desacoplados que garantizan mantenibilidad y claridad en el código.

---

## 📘 Índice

1. [Visión General](#-visión-general)  
2. [Arquitectura y Tecnologías](#-arquitectura-y-tecnologías)  
3. [Estructura del Proyecto](#-estructura-del-proyecto)  
4. [Instalación y Configuración](#️-instalación-y-configuración)  
5. [Modelado de Datos](#-modelado-de-datos)  
6. [Endpoints REST](#-endpoints-rest)  
7. [Ejemplos de Peticiones](#-ejemplos-de-peticiones)  
8. [Manejo de Errores](#-manejo-de-errores)  
9. [Despliegue del servidor](#-despliegue-en-producción)  
10. [Buenas Prácticas](#-buenas-prácticas)  
11. [Licencia](#-licencia)

---

## 🌍 Visión General

La **Movies API** permite realizar operaciones CRUD sobre las entidades:
- 🎞️ *Movies* (Películas)
- 👤 *Actors* (Actores)
- 🎬 *Directors* (Directores)
- 🏷️ *Genres* (Géneros)

Cada película puede tener múltiples actores, directores y géneros asociados.  
La API ofrece endpoints especializados para gestionar estas relaciones mediante peticiones POST a rutas del tipo:

POST /api/movies/:id/genres
POST /api/movies/:id/actors
POST /api/movies/:id/directors


---

## ⚙️ Arquitectura y Tecnologías

| Componente | Descripción |
|-------------|-------------|
| **Node.js 20+** | Entorno de ejecución para JavaScript del lado del servidor. |
| **Express.js** | Framework minimalista para la creación de APIs REST. |
| **Sequelize ORM** | Mapeo objeto-relacional para PostgreSQL. |
| **PostgreSQL** | Sistema de gestión de bases de datos relacional. |
| **dotenv / cors / express-async-errors** | Configuración de entorno, seguridad y manejo asincrónico de errores. |

---

## 🗂️ Estructura del Proyecto

src/
├── app.js
├── server.js
├── db/
│ └── connecdb.js
├── models/
│ ├── index.js
│ ├── genre.model.js
│ ├── actor.model.js
│ ├── director.model.js
│ ├── movie.model.js
│ ├── movieGenre.model.js
│ ├── movieActor.model.js
│ └── movieDirector.model.js
├── controllers/
│ ├── genres.controller.js
│ ├── actors.controller.js
│ ├── directors.controller.js
│ └── movies.controller.js
├── routes/
│ ├── index.js
│ ├── genres.routes.js
│ ├── actors.routes.js
│ ├── directors.routes.js
│ └── movies.routes.js
└── middlewares/
└── errorHandler.js


---

## ⚙️️ Instalación y Configuración

1️⃣ **Clonar el repositorio**
```bash
git clone <URL_DEL_REPO>
cd movies-api

npm install

PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=movies_app

## Crear base de datos

CREATE DATABASE movies_app;

## Ejecutar en modo de desarrollo
npm run dev

