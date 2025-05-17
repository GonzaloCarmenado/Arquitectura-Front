# Arquitectura Frontales con Angular 19+

> **Este proyecto es un ejemplo de buenas prácticas y arquitectura moderna para aplicaciones Angular 19+.**  
> La guía completa de arquitectura está disponible en el PDF:  
> [`docs/Arquitectura para Frontales con Angular 19+.pdf`](./docs/Arquitectura%20para%20Frontales%20con%20Angular%2019%2B.pdf)

---

## 📚 ¿Qué es este proyecto?

Este repositorio es una referencia para equipos que buscan construir aplicaciones Angular robustas, escalables y mantenibles, siguiendo estándares profesionales y buenas prácticas.  
**La arquitectura, organización y convenciones aquí propuestas están ampliamente documentadas en el PDF adjunto.**

---

## 🏛️ Documentación principal

- **Guía de arquitectura**:  
  [`docs/Arquitectura para Frontales con Angular 19+.pdf`](./docs/Arquitectura%20para%20Frontales%20con%20Angular%2019%2B.pdf)  
  _Incluye estructura de carpetas, patrones, ejemplos, convenciones y mucho más._
---

## 🗂️ Estructura del proyecto

```text
/src
└── /app
    ├── /core                # Servicios, guardias e interceptores globales (puede no estar creada aún)
    ├── /shared              # Componentes, directivas y pipes reutilizables
    ├── /features            # Módulos principales de funcionalidad
    ├── app-routing.module.ts
    └── app.config.ts
```

### Ejemplo real de `/features/clients`:

```text
/features/clients
├── clients.module.ts
├── clients.routing.module.ts
├── clients.component.ts
├── clients.component.html
├── clients.component.scss
├── clients.component.spec.ts
├── /add-edit
│   ├── add-edit.component.ts
│   ├── add-edit.component.html
│   ├── add-edit.component.scss
│   ├── add-edit.component.spec.ts
│   ├── add-edit.constructor.service.ts
│   ├── add-edit.access.service.ts
│   └── add-edit.transformation.service.ts
├── /list
│   ├── list.component.ts
│   ├── list.component.html
│   ├── list.component.scss
│   ├── list.component.spec.ts
│   ├── list.constructor.service.ts
│   ├── list.access.service.ts
│   └── /models
```

### `/shared` y utilidades

- Ejemplo: `src/app/shared/pipes/date-transform.pipe.ts`  
  _Aquí se ubican pipes, directivas y componentes reutilizables._

---

## 🧑‍💻 Principios y buenas prácticas

- **Separación clara de responsabilidades**:  
  - `/core`: lógica global, servicios, interceptores.
  - `/shared`: elementos visuales y reutilizables.
  - `/features`: módulos funcionales, organizados por dominio.
- **Lazy Load**:  
  _Carga diferida de módulos para mejorar rendimiento._
- **Componentes atómicos y Standalone**:  
  _Componentes pequeños, reutilizables y bien tipados._
- **Servicios por componente**:  
  _Constructor, Access, Transformation para mantener el código limpio y organizado._
- **Nomenclatura clara y consistente**:  
  _Variables y archivos con nombres descriptivos y en inglés._
- **Documentación y comentarios útiles**:  
  _Solo lo necesario, priorizando la claridad._

> **Todos estos principios están explicados con ejemplos y tablas en el PDF de arquitectura.**

---

## 🛠️ Herramientas de calidad y automatización

- **ESLint**: Linter para mantener el código limpio.
- **Husky**: Ganchos de Git para evitar commits con errores.
- **lint-staged**: Lint solo a los archivos modificados.
- **Cypress**: Pruebas E2E automatizadas.
- **SonarQube**: Análisis de calidad y cobertura (ver guía en docs).

---

## 🚀 Comandos útiles

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start

# Build de producción
npm run build

# Lint del proyecto
npm run lint

# Pruebas unitarias
npm test

# Pruebas E2E con Cypress
npm run cypress:open
npm run cypress:run

# Test sólo de archivos modificados
npm run test:affected
```

---

## 🏁 Primeros pasos

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Lee la guía de arquitectura en `docs/Arquitectura para Frontales con Angular 19+.pdf`
4. ¡Comienza a desarrollar siguiendo las buenas prácticas!

---

## 📎 Recursos adicionales

- [Angular CLI](https://angular.dev/tools/cli)
- [Single-spa.js](https://single-spa.js.org)
- [Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation)
- [Cypress](https://www.cypress.io/)
- [ESLint](https://eslint.org/)
- [SonarQube](https://www.sonarqube.org/)

---

> **Recuerda:**  
> La clave de este proyecto no es solo el código, sino la arquitectura y las buenas prácticas documentadas.  
> **¡Lee el PDF y conviértelo en tu manual de cabecera!**
