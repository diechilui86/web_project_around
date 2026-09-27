# Around The U.S.

Aplicación web interactiva desarrollada como parte del programa de desarrollo web. El proyecto permite editar la información del perfil de usuario, crear y eliminar tarjetas de lugares, marcar tarjetas como favoritas y visualizar sus imágenes en ventanas emergentes.

El proyecto fue refactorizado utilizando **TypeScript y Programación Orientada a Objetos (POO)**, organizando las diferentes responsabilidades de la aplicación mediante clases reutilizables.

## Demo

El proyecto puede visualizarse en GitHub Pages:

https://diechilui86.github.io/web_project_around_es/

## Funcionalidades

- Editar el nombre y la descripción del perfil.
- Agregar nuevas tarjetas indicando un nombre y una URL de imagen.
- Eliminar tarjetas.
- Marcar y desmarcar tarjetas como favoritas.
- Visualizar las imágenes de las tarjetas en un popup.
- Cerrar los popups mediante:
  - Botón de cierre.
  - Tecla `Escape`.
  - Clic sobre el área sombreada.
- Validar formularios utilizando la API nativa de validación de HTML.
- Mostrar mensajes de error en los campos inválidos.
- Activar y desactivar automáticamente los botones de envío según la validez del formulario.
- Restablecer la validación cuando se vuelve a abrir un formulario.
- Crear tarjetas dinámicamente utilizando elementos `<template>`.

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- JavaScript ES6+
- Programación Orientada a Objetos (POO)
- DOM API
- HTML Form Validation API
- ES Modules (`import` / `export`)
- Interfaces y tipos de TypeScript
- Genéricos de TypeScript
- Herencia
- Encapsulamiento
- Callbacks
- Git
- GitHub
- GitHub Pages

## Programación Orientada a Objetos

La lógica de la aplicación está dividida en clases con responsabilidades específicas.

### `Card`

Responsable de crear una tarjeta individual, configurar su contenido y registrar sus eventos.

Recibe un callback `handleCardClick` para comunicar el clic sobre una imagen sin depender directamente de la clase encargada del popup.

### `Section`

Responsable de renderizar una colección de elementos dentro de un contenedor.

La clase utiliza genéricos de TypeScript (`Section<T>`) para poder trabajar con diferentes tipos de datos.

### `Popup`

Clase base para las ventanas emergentes.

Contiene la funcionalidad común para:

- Abrir un popup.
- Cerrar un popup.
- Cerrar mediante la tecla `Escape`.
- Cerrar mediante el botón de cierre.
- Cerrar haciendo clic sobre el área sombreada.

### `PopupWithImage`

Hereda de `Popup` y añade la funcionalidad necesaria para mostrar una imagen junto con su correspondiente leyenda.

### `PopupWithForm`

Hereda de `Popup` y administra ventanas emergentes que contienen formularios.

Se encarga de:

- Obtener los valores de los inputs.
- Procesar el evento `submit`.
- Ejecutar un callback con los datos del formulario.
- Reiniciar el formulario después de cerrarlo.

### `FormValidator`

Encapsula la lógica de validación de los formularios.

La configuración de selectores y clases CSS se proporciona mediante el objeto `defaultFormConfig`, permitiendo reutilizar la misma clase con diferentes formularios.

La clase permite:

- Validar los campos de entrada.
- Mostrar y ocultar mensajes de error.
- Activar o desactivar el botón de envío.
- Restablecer el estado de validación.

### `UserInfo`

Responsable de administrar la información del usuario mostrada en la página.

Incluye métodos para:

- Obtener el nombre y la descripción actuales.
- Actualizar esos datos en el DOM.

## TypeScript

El código fuente de la aplicación se encuentra dentro de `src/`.

TypeScript está configurado mediante `tsconfig.json` para utilizar:

```json
{
  "rootDir": "./src",
  "outDir": "./public",
  "allowJs": true,
  "strict": true
}
```

De esta forma, TypeScript toma los archivos fuente desde `src/` y genera los archivos JavaScript compilados dentro de `public/`.

Para compilar el proyecto se puede utilizar:

```bash
tsc
```

Durante el desarrollo también se puede utilizar:

```bash
tsc --watch
```

para recompilar automáticamente después de realizar cambios.

## Estructura del proyecto

```text
web_project_around_es/
│
├── public/
│   ├── blocks/
│   ├── images/
│   ├── pages/
│   ├── vendor/
│   ├── index.html
│   └── index.js
│
├── src/
│   ├── components/
│   │   ├── Card.ts
│   │   ├── FormValidator.ts
│   │   ├── Popup.ts
│   │   ├── PopupWithForm.ts
│   │   ├── PopupWithImage.ts
│   │   ├── Section.ts
│   │   └── UserInfo.ts
│   │
│   ├── types/
│   │   └── types.ts
│   │
│   ├── utils/
│   │   └── constants.ts
│   │
│   └── index.ts
│
├── tsconfig.json
└── README.md
```

## Arquitectura

El proyecto utiliza una arquitectura basada en componentes y clases con responsabilidades independientes.

```text
index.ts
   │
   ├── Section
   │     └── Card
   │
   ├── Popup
   │     ├── PopupWithImage
   │     └── PopupWithForm
   │
   ├── FormValidator
   │
   └── UserInfo
```

Las clases `PopupWithImage` y `PopupWithForm` utilizan herencia para reutilizar el comportamiento común definido por `Popup`.

`Card` utiliza un callback para comunicarse con el popup de imagen, reduciendo el acoplamiento entre las clases.

## Conceptos aplicados

Durante el desarrollo y refactorización del proyecto se aplicaron:

- Programación Orientada a Objetos.
- Clases y constructores.
- Propiedades y métodos públicos y privados.
- Herencia mediante `extends`.
- Reutilización de métodos mediante `super`.
- Sobrescritura de métodos.
- Encapsulamiento.
- Interfaces de TypeScript.
- Tipos personalizados.
- Genéricos.
- Callbacks tipados.
- Manipulación del DOM.
- Eventos del navegador.
- Formularios y eventos `submit` e `input`.
- Validación mediante `validity`.
- Creación de elementos mediante `<template>`.
- Módulos ES mediante `import` y `export`.

## Diseño

La interfaz está diseñada para adaptarse a diferentes tamaños de pantalla mediante CSS responsive.

Para la organización de los estilos CSS se utiliza la metodología **BEM (Block, Element, Modifier)**.

## Autor

**Diego Chiluisa**
