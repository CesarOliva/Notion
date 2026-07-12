# Notion Clone

Proyecto web inspirado en [CodeWithAntonio](https://www.youtube.com/@CodeWithAntonio) de YouTube, construido como una version tipo Notion para crear y organizar notas, navegar entre documentos y llevar un calendario personal.

La base visual y parte de la estructura general toman como referencia ese tutorial, pero la logica del calendario, el registro de moods, la cancion del dia y las actividades del dia fue ideada e implementada por mi.

## Caracteristicas

- Autenticacion con Clerk.
- Editor de documentos con soporte para contenido enriquecido.
- Paginas anidadas, portada e icono por documento.
- Subida de imagenes con EdgeStore.
- Modo claro y oscuro.
- Busqueda de documentos.
- Exportacion y vista previa de documentos.
- Calendario anual interactivo.
- Registro por dia de mood.
- Registro por dia de cancion del dia.
- Registro por dia de actividades del dia.

## Stack

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- Convex
- Clerk
- BlockNote
- EdgeStore

## Estructura general

- `app/` contiene las rutas y pantallas principales.
- `components/` contiene componentes reutilizables de UI y modales.
- `convex/` contiene el esquema y las funciones de backend.
- `hooks/` contiene hooks personalizados.
- `lib/` contiene utilidades compartidas.

## Instalacion

1. Instala dependencias:

```bash
npm install
```

2. Configura tus variables de entorno.

3. Inicia Convex en una terminal:

```bash
npx convex dev
```

4. Inicia la app en otra terminal:

```bash
npm run dev
```

5. Abre:

```bash
http://localhost:3000
```

## Variables de entorno

Este proyecto usa al menos las siguientes variables en el cliente:

```bash
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

Si tu configuracion de Clerk, Convex o EdgeStore requiere variables adicionales, agregalas en tu archivo `.env.local` segun tu entorno.

## Scripts

- `npm run dev` - levanta el servidor de desarrollo.
- `npm run build` - genera la version de produccion.
- `npm run start` - inicia la app compilada.
- `npm run lint` - ejecuta ESLint.

## Creditos

Inspirado en el trabajo de CodeWithAntonio, con desarrollo propio en la logica de calendario y registro diario.
