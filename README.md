# SongDNA 🎵

Biblioteca donde se documentan las conexiones entre canciones: samples, interpolaciones, covers y remixes. Cada conexión puede llevar su historia o curiosidad y la fuente de donde sale el dato. Permite ver, por ejemplo, qué canciones samplearon a otra, o de dónde viene el loop que usó tu tema favorito.

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
- React Router
- Tailwind CSS v4

## Estructura del proyecto

```
SongDNA/
├── backend/             API REST (Node.js + Express + Prisma)
├── frontend/            Interfaz web (React + Vite + Tailwind)
└── docker-compose.yml   PostgreSQL y pgAdmin para desarrollo local
```

## Estado actual

- **Backend:** CRUD de canciones y conexiones, listados de géneros y artistas, validación de datos, manejo de errores centralizado, CORS y health check.
- **Frontend:** portada con géneros y directorio de artistas de la A a la Z, catálogo de canciones, páginas de género y de artista, y la ficha de canción con sus samples, la historia de cada uno y su fuente.
- **Pendiente:** datos reales de samples, formulario para agregar canciones y conexiones, buscador y despliegue.

## Modelo de datos

- **Song**: una canción (título, año, portada y enlaces de reproducción, todos opcionales). Tiene un género principal y uno o varios artistas.
- **Artist**: un artista o grupo, con nombre único. Se relaciona con las canciones de muchos a muchos, así que una colaboración como "Queen y David Bowie" pertenece a los dos.
- **Genre**: un género, con nombre y `slug` (la parte de la dirección, como `hip-hop`).
- **Connection**: la relación entre dos canciones. `sourceSong` es la original y `derivativeSong` la que sampleó o interpoló. Tiene un tipo (`SAMPLE`, `INTERPOLATION`, `COVER`, `REMIX`), una descripción corta, la historia o curiosidad (`story`), la fuente del dato (`sourceUrl`) y los segundos donde aparece el fragmento en cada canción.

Los IDs son números enteros que se incrementan solos.

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

Aplica las migraciones, genera el cliente de Prisma y levanta el servidor:

```bash
pnpm exec prisma migrate dev
pnpm exec prisma generate --no-hints
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
- Si cambias `prisma/schema.prisma`, el orden es migrar y luego regenerar el cliente: `pnpm exec prisma migrate dev --name <nombre>` y `pnpm exec prisma generate --no-hints`.
- Si prefieres una base alojada en lugar de Docker, cualquier PostgreSQL sirve: solo cambia `DATABASE_URL` y `DIRECT_URL` en `backend/.env`.

## Rutas del frontend

| Dirección | Página |
|-----------|--------|
| `/` | Portada: bienvenida, géneros y artistas de la A a la Z |
| `/canciones` | Catálogo con todas las canciones |
| `/canciones/:id` | Ficha de una canción, con sus samples y su historia |
| `/generos/:slug` | Canciones de un género |
| `/artistas/:id` | Canciones de un artista |

## Endpoints de la API

### Songs

| Método | Ruta           | Descripción                                                    |
|--------|----------------|-----------------------------------------------------------------|
| GET    | `/songs`       | Lista todas las canciones, con sus artistas y su género         |
| GET    | `/songs/:id`   | Obtiene una canción con sus conexiones (`samples` y `sampledBy`) |
| POST   | `/songs`       | Crea una canción                                                |
| PATCH  | `/songs/:id`   | Actualiza una canción                                           |
| DELETE | `/songs/:id`   | Elimina una canción (y sus conexiones, en cascada)              |

### Connections

| Método | Ruta                 | Descripción                              |
|--------|----------------------|-------------------------------------------|
| GET    | `/connections`       | Lista todas las conexiones                |
| GET    | `/connections/:id`   | Obtiene una conexión específica           |
| POST   | `/connections`       | Crea una conexión entre dos canciones     |
| PATCH  | `/connections/:id`   | Actualiza una conexión                    |
| DELETE | `/connections/:id`   | Elimina una conexión                      |

### Genres y Artists

| Método | Ruta             | Descripción                                                          |
|--------|------------------|-----------------------------------------------------------------------|
| GET    | `/genres`        | Géneros que tienen canciones, con su cantidad                          |
| GET    | `/genres/:slug`  | Un género (por su `slug`) con sus canciones                            |
| GET    | `/artists`       | Artistas que tienen canciones, ordenados por nombre, con su cantidad   |
| GET    | `/artists/:id`   | Un artista con sus canciones                                           |

### Otros

| Método | Ruta       | Descripción                                               |
|--------|------------|------------------------------------------------------------|
| GET    | `/`        | Mensaje de bienvenida de la API                            |
| GET    | `/health`  | Verifica que el servidor y la base de datos estén activos  |

## Ejemplos

### Crear una canción

Los artistas y el género se indican por nombre. Si no existen, se crean solos.

```json
POST /songs
{
  "title": "Under Pressure",
  "artists": ["Queen", "David Bowie"],
  "genre": "Rock",
  "year": 1981
}
```

Campos opcionales: `genre`, `year`, `coverUrl`, `spotifyId` y `youtubeId`. En `PATCH /songs/:id`, si se envía `artists`, reemplaza la lista completa.

### Crear una conexión

```json
POST /connections
{
  "sourceSongId": 2,
  "derivativeSongId": 1,
  "type": "SAMPLE",
  "description": "Descripción corta de la conexión",
  "story": "Historia o curiosidad del sample",
  "sourceUrl": "https://ejemplo.com/fuente"
}
```

`sourceSongId` es la canción original y `derivativeSongId` la que la samplea. Tipos válidos para `type`: `SAMPLE`, `INTERPOLATION`, `COVER`, `REMIX`. Opcionales: `description`, `story`, `sourceUrl`, `timestampSource` y `timestampDerivative` (segundos).

## Errores

Todas las respuestas de error tienen el mismo formato:

```json
{ "error": "Descripción del problema" }
```

Los errores de validación agregan el detalle de cada campo:

```json
{
  "error": "Datos inválidos",
  "details": [{ "campo": "type", "mensaje": "Invalid option: ..." }]
}
```

Códigos usados: `400` (datos inválidos, id que no es número, canción inexistente en una conexión), `404` (recurso o ruta no encontrados) y `409` (registro duplicado).

## Autor

Álvaro Javier Méndez García — [GitHub](https://github.com/AlvaroJavier1)
