# Around The U.S.

Proyecto web interactivo desarrollado como parte del aprendizaje de desarrollo web. La aplicación permite a los usuarios editar su perfil, agregar y eliminar tarjetas de lugares, marcar tarjetas como favoritas y visualizar imágenes en ventanas emergentes.

## 🚀 Demo

[Ver proyecto en GitHub Pages](https://diechilui86.github.io/web_project_around_es/)

## 📸 Descripción

**Around The U.S.** es una aplicación web inspirada en una red social para compartir lugares y fotografías.

El proyecto comenzó como una implementación basada en HTML y CSS y posteriormente se incorporó JavaScript para añadir interactividad y validación de formularios.

## ✨ Funcionalidades

- Editar el nombre y la descripción del perfil.
- Agregar nuevas tarjetas con nombre y enlace a una imagen.
- Eliminar tarjetas.
- Marcar y desmarcar tarjetas como favoritas.
- Abrir las imágenes en una ventana emergente.
- Cerrar ventanas emergentes mediante:
  - Botón de cierre.
  - Tecla `Escape`.
  - Clic fuera del contenido del popup.

- Validación de formularios mediante las APIs nativas de validación de HTML.
- Mostrar mensajes de error personalizados.
- Activar y desactivar los botones de envío según la validez de los campos.
- Restablecer el estado de validación al cerrar los formularios.
- Creación dinámica de tarjetas mediante `<template>`.

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- DOM API
- HTML Form Validation API
- JavaScript Modules (`import` / `export`)
- Git
- GitHub Pages

## 📂 Estructura del proyecto

```text
web_project_around_es/
│
├── images/
│   └── imágenes utilizadas en el proyecto
│
├── pages/
│   └── index.css
│
├── scripts/
│   ├── index.js
│   └── validate.js
│
├── index.html
└── README.md
```

## 🧠 Conceptos de JavaScript practicados

Durante el desarrollo del proyecto se trabajaron diferentes conceptos fundamentales de JavaScript:

- Selección y manipulación del DOM.
- Funciones y parámetros.
- Eventos y `event listeners`.
- `event.target` y `event.currentTarget`.
- Creación y modificación de elementos HTML.
- `<template>` y `cloneNode()`.
- Arrays y métodos como `forEach()` y `every()`.
- Formularios y eventos `submit` e `input`.
- Validación mediante `validity.valid`.
- `validationMessage`.
- `form.checkValidity()`.
- `form.reset()`.
- Módulos de JavaScript mediante `import` y `export`.
- Gestión de ventanas emergentes.
- Manejo de eventos de teclado.

## 📱 Diseño

La interfaz está diseñada para adaptarse a diferentes tamaños de pantalla mediante CSS responsive.

El proyecto sigue una metodología basada en **BEM** para la organización y nomenclatura de las clases CSS.

## 🔄 Próximas mejoras

Algunas mejoras que podrían incorporarse posteriormente:

- Conectar la aplicación con una API.
- Guardar los datos del usuario y las tarjetas en un servidor.
- Implementar persistencia de datos.
- Añadir confirmación antes de eliminar una tarjeta.
- Mejorar la accesibilidad de las ventanas emergentes.
- Añadir animaciones y transiciones adicionales.
- Permitir cambiar la imagen de perfil.

## 📚 Objetivo del proyecto

El objetivo principal de este proyecto es poner en práctica los conocimientos adquiridos de **HTML, CSS y JavaScript**, especialmente la manipulación del DOM, el manejo de eventos, los formularios y la validación de datos.

---

**Autor:** Diego Chiluisa
