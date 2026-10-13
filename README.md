# SongDNA 🎵

Biblioteca donde se documentan las conexiones entre canciones: samples, interpolaciones, covers y remixes. Permite ver, por ejemplo, qué canciones samplearon a otra, o de dónde viene el loop que usó tu tema favorito.

## Stack

**Backend**
- Node.js + TypeScript
- Express 5
- Prisma 7 (ORM) + PostgreSQL (con Docker en desarrollo local)
- Zod (validación de datos)
- pnpm

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS v4

## Estructura del proyecto

```
SongDNA/
├── backend/             API REST (Node.js + Express + Prisma)
├── frontend/            Interfaz web (React + Vite + Tailwind)
└── docker-compose.yml   PostgreSQL y pgAdmin para desarrollo local
```

## Estado actual

- **Backend:** CRUD completo de canciones y conexiones, validación de datos, manejo de errores centralizado, CORS y health check.
- **Frontend:** lista de canciones y ficha de detalle con sus conexiones (`SAMPLEA A` / `SAMPLEADA POR`), consumiendo la API.
- **Pendiente:** formulario para agregar canciones y conexiones, buscador y rutas con URL propia por canción.

## Modelo de datos

- **Song**: una canción (título, artista, año, género, etc.)
- **Connection**: la relación entre dos canciones (`sourceSong` → la original, `derivativeSong` → la que sampleó/interpoló), con un tipo (`SAMPLE`, `INTERPOLATION`, `COVER`, `REMIX`)

## Cómo correrlo localmente

Requisitos: [Node.js](https://nodejs.org), [pnpm](https://pnpm.io) y [Docker](https://www.docker.com) con Docker Compose.

Necesitas una terminal para la base de datos y dos más para los servidores (backend y frontend).

### 1. Base de datos

Desde la raíz del proyecto:

```bash
docker compose up -d
```

Esto levanta dos contenedores:

| Servicio | Dirección | Para qué sirve |
|----------|-----------|----------------|
| PostgreSQL | `localhost:5432` | La base de datos |
| pgAdmin | `http://localhost:5050` | Interfaz para ver y revisar las tablas |

Credenciales de desarrollo (solo para uso local):

- **PostgreSQL:** usuario `postgres`, contraseña `songdna`, base `songdna`
- **pgAdmin:** correo `admin@example.com`, contraseña `admin`. Al registrar el servidor, el host es `db` y el puerto `5432`.

### 2. Backend

```bash
cd backend
pnpm install
```

Crea un archivo `.env` dentro de `backend/`:

```
DATABASE_URL="postgresql://postgres:songdna@localhost:5432/songdna"
DIRECT_URL="postgresql://postgres:songdna@localhost:5432/songdna"
```

Aplica las migraciones y levanta el servidor:

```bash
pnpm exec prisma migrate dev
pnpm run dev
```

La API corre en `http://localhost:3000`. Para comprobar que está conectada a la base, abre `http://localhost:3000/health`.

### 3. Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

La interfaz corre en `http://localhost:5173`. Por defecto se conecta a `http://localhost:3000`; para usar otra dirección, crea `frontend/.env` con:

```
VITE_API_URL=http://localhost:3000
```

### Notas sobre la base de datos

- Los datos se guardan en un volumen de Docker, así que sobreviven a reinicios. Para detener los contenedores sin perder nada: `docker compose stop`.
- `docker compose down -v` **borra el volumen** y con él todos los datos.
- Para ver o editar registros rápidamente también puedes usar Prisma Studio: `pnpm exec prisma studio` (desde `backend/`).
- Si prefieres una base alojada en lugar de Docker, cualquier PostgreSQL sirve: solo cambia `DATABASE_URL` y `DIRECT_URL` en `backend/.env`.

## Endpoints disponibles

### Songs

| Método | Ruta           | Descripción                                        |
|--------|----------------|-----------------------------------------------------|
| GET    | `/songs`       | Lista todas las canciones                           |
| GET    | `/songs/:id`   | Obtiene una canción con sus conexiones              |
| POST   | `/songs`       | Crea una canción                                    |
| PATCH  | `/songs/:id`   | Actualiza una canción                               |
| DELETE | `/songs/:id`   | Elimina una canción (y sus conexiones, en cascada)  |

### Connections

| Método | Ruta                 | Descripción                              |
|--------|----------------------|-------------------------------------------|
| GET    | `/connections`       | Lista todas las conexiones                |
| GET    | `/connections/:id`   | Obtiene una conexión específica           |
| POST   | `/connections`       | Crea una conexión entre dos canciones     |
| PATCH  | `/connections/:id`   | Actualiza una conexión                    |
| DELETE | `/connections/:id`   | Elimina una conexión                      |

### Otros

| Método | Ruta       | Descripción                                               |
|--------|------------|------------------------------------------------------------|
| GET    | `/`        | Mensaje de bienvenida de la API                            |
| GET    | `/health`  | Verifica que el servidor y la base de datos estén activos  |

## Ejemplo: crear una conexión

```json
POST /connections
{
  "sourceSongId": "id-de-la-canción-original",
  "derivativeSongId": "id-de-la-canción-que-samplea",
  "type": "SAMPLE",
  "description": "Breve descripción de la conexión"
}
```

Tipos válidos para `type`: `SAMPLE`, `INTERPOLATION`, `COVER`, `REMIX`.

## Autor

Álvaro Javier Méndez García — [GitHub](https://github.com/AlvaroJavier1)
