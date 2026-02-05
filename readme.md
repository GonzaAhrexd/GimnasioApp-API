# Gimnasio API

API para aplicación móvil de gimnasio utilizando Node.js, Prisma, Express y TypeScript.

## Requisitos previos

- Node.js (v18 o superior)
- MySQL/MariaDB
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd GimnasioAPI
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
corsOrigin = "http://localhost:4200"
PORT = "3000"
DATABASE_URL = "mysql://USUARIO:CONTRASEÑA@localhost:3306/NOMBRE_BASE_DATOS?schema=public"
DATABASE_HOST = "localhost"
DATABASE_USER = "USUARIO"
DATABASE_PORT = "3306"
DATABASE_NAME = "NOMBRE_BASE_DATOS"
```

> **Nota:** Reemplazar `USUARIO`, `CONTRASEÑA` y `NOMBRE_BASE_DATOS` con tus credenciales de MySQL.

4. Ejecutar migraciones de Prisma:
```bash
npx prisma migrate dev
```

5. Generar cliente de Prisma:
```bash
npx prisma generate
```

## Ejecución

### Modo desarrollo
```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

### Documentación API
Acceder a la documentación Swagger en: `http://localhost:3000/doc`

### Regenerar documentación Swagger
```bash
npm run swagger
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con hot-reload |
| `npm run swagger` | Regenera la documentación de Swagger |

## Plantilla / Template

Para utilizar mi plantilla base, [visita aquí](https://github.com/GonzaAhrexd/express-prisma-typescript-template.git)

To use my own template [visit here](https://github.com/GonzaAhrexd/express-prisma-typescript-template.git)