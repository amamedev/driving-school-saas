# Driving School SaaS

SaaS para la gestión interna de una autoescuela, desarrollado como proyecto profesional de portfolio y orientado a resolver necesidades reales de gestión y organización del trabajo.

El proyecto utiliza una arquitectura frontend/backend separada, autenticación mediante Supabase y una API REST desarrollada con Node.js y Express.

> **Estado:** En desarrollo

## Funcionalidades

Actualmente el proyecto está centrado en la gestión interna de tareas y usuarios.

* Autenticación de usuarios
* Gestión de roles

  * Administrador
  * Empleado
* Gestión de tareas

  * Crear y consultar tareas
  * Modificar tareas
  * Cambiar estado y prioridad
  * Asignar tareas a empleados
  * Categorizar tareas
  * Añadir notas
* Gestión de empleados
* Gestión de categorías
* Búsqueda y filtrado de tareas
* Paginación de resultados
* Autorización basada en roles y usuario autenticado
* Validación de datos mediante Zod
* Row Level Security (RLS) en PostgreSQL/Supabase
* Gestión centralizada de errores
* Procesamiento de operaciones asíncronas mediante eventos internos

## Arquitectura

El backend sigue una arquitectura por capas para separar responsabilidades y facilitar el mantenimiento y las pruebas.

```text
Request
   |
   v
Router
   |
   v
Middleware
   |
   v
Controller
   |
   v
Service
   |
   v
Repository
   |
   v
PostgreSQL / Supabase
```

### Backend

```text
backend/
├── src/
│   ├── infra/
│   │   ├── database/
│   │   └── env.js
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
│   │   ├── categories/
│   │   ├── tasks/
│   │   └── users/
│   ├── schemas/
│   ├── utils/
│   └── errors/
├── app.js
├── server.js
├── package.json
└── pnpm-lock.yaml
```

El backend está organizado por módulos y responsabilidades, evitando concentrar la lógica de negocio en los controladores.

### Frontend

El frontend está desarrollado con React y Vite, utilizando una separación entre páginas, componentes, servicios, hooks y gestión del estado.

```text
frontend/
├── src/
├── package.json
└── ...
```

## Seguridad

La seguridad es una parte importante de la arquitectura del proyecto.

El sistema diferencia entre:

**Autenticación**

¿Quién eres?

**Autorización**

¿Qué puedes hacer?

**Reglas de negocio**

¿Qué puedes modificar concretamente?

Las decisiones de autorización se realizan en el backend y no dependen de que determinadas opciones estén ocultas en la interfaz.

Por ejemplo, un empleado únicamente puede modificar tareas asignadas a su propio perfil, mientras que un administrador puede gestionar las tareas independientemente de su asignación.

La base de datos utiliza además Row Level Security (RLS) como capa adicional de protección.

## Stack tecnológico

### Frontend

* React
* Vite
* Tailwind CSS
* JavaScript / ES6+

### Backend

* Node.js
* Express
* REST API
* Zod
* Supabase
* PostgreSQL

### Herramientas

* Git
* GitHub
* pnpm
* Nodemon

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/amamedev/driving-school-saas.git
cd driving-school-saas
```

### Backend

```bash
cd backend
pnpm install
```

Crea un archivo `.env` siguiendo las variables necesarias del proyecto.

Después:

```bash
pnpm dev
```

### Frontend

En otra terminal:

```bash
cd frontend
pnpm install
```

Configura las variables de entorno necesarias para el frontend y ejecuta:

```bash
pnpm dev
```

> Las variables de entorno reales no están incluidas en el repositorio.

## Desarrollo

El proyecto se desarrolla mediante ramas de funcionalidad para mantener `main` estable.

Ejemplo:

```text
main
 |
 └── feature/task-filters
          |
          ├── desarrollo
          ├── pruebas
          └── documentación
                   |
                   v
                 merge
                   |
                   v
                  main
```

## Testing

Los tests se incorporan progresivamente, priorizando las reglas de negocio y los casos que puedan provocar problemas de autorización o inconsistencias en los datos.

El objetivo no es alcanzar una cobertura artificial del 100 %, sino garantizar el comportamiento de las partes críticas de la aplicación.

## Roadmap

El proyecto se encuentra en desarrollo.

Próximos objetivos:

* [ ] Completar el sistema de gestión de tareas
* [ ] Completar búsqueda y filtros
* [ ] Completar gestión de empleados
* [ ] Mejorar cobertura de tests
* [ ] Finalizar documentación técnica
* [ ] Despliegue de frontend y backend
* [ ] Incorporar mejoras basadas en necesidades reales de uso

Las funcionalidades se incorporarán priorizando problemas reales de negocio frente a añadir complejidad innecesaria.

## Objetivo del proyecto

Este proyecto tiene dos objetivos principales:

1. Construir una aplicación SaaS funcional para la gestión interna de una autoescuela.
2. Aplicar buenas prácticas de desarrollo backend y arquitectura de software en un proyecto real.

El foco está especialmente puesto en:

* Diseño de APIs REST
* Separación de responsabilidades
* Arquitectura por capas
* Autenticación y autorización
* Validación de datos
* Seguridad
* Gestión de errores
* Persistencia de datos
* Testing
* Git y flujo de desarrollo
* Despliegue

## Estado del proyecto

Proyecto activo y en desarrollo.

Las funcionalidades y la arquitectura pueden evolucionar a medida que se incorporen nuevos requisitos y necesidades reales de uso.

---

**Autor:** Alejandro Marín Melero
