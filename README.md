# SongDNA 🎵

Biblioteca donde se documentan las conexiones entre canciones: samples, interpolaciones, covers y remixes. Permite ver, por ejemplo, qué canciones samplearon a otra, o de dónde viene el loop que usó tu tema favorito.

## Stack

**Backend**
- Node.js + TypeScript
- Express 5
- Prisma 7 (ORM) + PostgreSQL (alojado en [Supabase](https://supabase.com))
- Zod (validación de datos)
- pnpm

**Frontend** *(en construcción)*
- React + Vite + Tailwind CSS

## Estructura del proyecto

```
SongDNA/
├── backend/     API REST (Node.js + Express + Prisma)
└── frontend/    Interfaz web (React + Vite) — pendiente
```

## Modelo de datos

- **Song**: una canción (título, artista, año, género, etc.)
- **Connection**: la relación entre dos canciones (`sourceSong` → la original, `derivativeSong` → la que sampleó/interpoló), con un tipo (`SAMPLE`, `INTERPOLATION`, `COVER`, `REMIX`)

## Cómo correrlo localmente

1. Clona el repositorio y entra a la carpeta del backend:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   ```

3. Crea un archivo `.env` dentro de `backend/` con las siguientes variables (necesitas un proyecto de [Supabase](https://supabase.com) o cualquier PostgreSQL):
   ```
   DATABASE_URL="postgresql://..."   # conexión con pooling
   DIRECT_URL="postgresql://..."     # conexión directa (para migraciones)
   ```

4. Aplica las migraciones de la base de datos:
   ```bash
   pnpm exec prisma migrate dev
   ```

5. Levanta el servidor:
   ```bash
   pnpm run dev
   ```

   El servidor corre por defecto en `http://localhost:3000`.

## Endpoints disponibles

### Songs

| Método | Ruta           | Descripción                                   |
|--------|----------------|------------------------------------------------|
| GET    | `/songs`       | Lista todas las canciones                      |
| GET    | `/songs/:id`   | Obtiene una canción con sus conexiones         |
| POST   | `/songs`       | Crea una canción                               |
| PATCH  | `/songs/:id`   | Actualiza una canción                          |
| DELETE | `/songs/:id`   | Elimina una canción (y sus conexiones, en cascada) |

### Connections

| Método | Ruta                 | Descripción                              |
|--------|----------------------|-------------------------------------------|
| GET    | `/connections`       | Lista todas las conexiones                |
| GET    | `/connections/:id`   | Obtiene una conexión específica           |
| POST   | `/connections`       | Crea una conexión entre dos canciones     |
| PATCH  | `/connections/:id`   | Actualiza una conexión                    |
| DELETE | `/connections/:id`   | Elimina una conexión                      |

### Otros

| Método | Ruta       | Descripción                                   |
|--------|------------|------------------------------------------------|
| GET    | `/`        | Mensaje de bienvenida de la API                |
| GET    | `/health`  | Verifica que el servidor y la base de datos estén activos |

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
