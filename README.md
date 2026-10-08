# SongDNA 🎵

Biblioteca donde se documentan las conexiones entre canciones: samples, interpolaciones, covers y remixes. Permite ver, por ejemplo, qué canciones samplearon a otra, o de dónde viene el loop que usó tu tema favorito.

## Stack

**Backend**
- Node.js + TypeScript
- Express 5
- Prisma 7 (ORM) + PostgreSQL (alojado en [Supabase](https://supabase.com))
- Zod (validación de datos)
- pnpm

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS v4

## Estructura del proyecto

```
SongDNA/
├── backend/     API REST (Node.js + Express + Prisma)
└── frontend/    Interfaz web (React + Vite + Tailwind)
```

## Estado actual

- **Backend:** CRUD completo de canciones y conexiones, validación de datos, manejo de errores centralizado, CORS y health check.
- **Frontend:** lista de canciones y ficha de detalle con sus conexiones (`SAMPLEA A` / `SAMPLEADA POR`), consumiendo la API.
- **Pendiente:** formulario para agregar canciones y conexiones, buscador y rutas con URL propia por canción.

## Modelo de datos

- **Song**: una canción (título, artista, año, género, etc.)
- **Connection**: la relación entre dos canciones (`sourceSong` → la original, `derivativeSong` → la que sampleó/interpoló), con un tipo (`SAMPLE`, `INTERPOLATION`, `COVER`, `REMIX`)

## Cómo correrlo localmente

Necesitas dos terminales, una para cada servidor.

### 1. Backend

```bash
cd backend
pnpm install
```

Crea un archivo `.env` dentro de `backend/` con las siguientes variables (necesitas un proyecto de [Supabase](https://supabase.com) o cualquier PostgreSQL):

```
DATABASE_URL="postgresql://..."   # conexión con pooling
DIRECT_URL="postgresql://..."     # conexión directa (para migraciones)
```

Aplica las migraciones y levanta el servidor:

```bash
pnpm exec prisma migrate dev
pnpm run dev
```

La API corre en `http://localhost:3000`.

### 2. Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

La interfaz corre en `http://localhost:5173`. Por defecto se conecta a `http://localhost:3000`; para usar otra dirección, crea `frontend/.env` con:

```
VITE_API_URL=http://localhost:3000
```

### Nota sobre Supabase

En el plan gratuito, Supabase pausa el proyecto tras un tiempo de inactividad. Si la API responde con errores de base de datos (`GET /health` devuelve `disconnected`), revisa el dashboard y reanuda el proyecto.

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
