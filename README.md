# Around The U.S.

Aplicación web interactiva desarrollada como parte del programa de desarrollo web. Permite administrar un perfil de usuario, compartir tarjetas de lugares, dar y quitar «me gusta» y visualizar imágenes en ventanas emergentes.

El proyecto utiliza **TypeScript, Programación Orientada a Objetos (POO) e integración con una API REST**. Los datos del perfil, el avatar y las tarjetas se obtienen del servidor; sus modificaciones se guardan mediante solicitudes HTTP.

## Demo

[Ver el proyecto en GitHub Pages](https://diechilui86.github.io/web_project_around/)

## Funcionalidades

- Cargar el nombre, la descripción y el avatar del usuario desde el servidor.
- Cargar las tarjetas del servidor después de recibir la información del usuario.
- Editar y guardar el nombre y la descripción del perfil.
- Actualizar el avatar mediante una URL de imagen.
- Agregar tarjetas indicando un nombre y una URL de imagen.
- Mostrar la papelera únicamente en las tarjetas creadas por el usuario actual.
- Solicitar confirmación antes de eliminar una tarjeta.
- Eliminar la tarjeta de la página después de recibir una respuesta correcta del servidor.
- Dar y quitar «me gusta» y actualizar el corazón con el estado devuelto por la API.
- Visualizar imágenes y sus títulos en un popup.
- Cerrar los popups mediante el botón de cierre, la tecla `Escape` o un clic sobre el fondo.
- Validar los formularios con la API nativa de validación de HTML.
- Mostrar errores y desactivar el botón de envío cuando algún campo sea inválido.
- Reiniciar la validación y recalcular el botón al abrir los formularios.
- Mostrar «Guardando...» durante el envío de los formularios de perfil, tarjeta y avatar.
- Registrar los errores de las solicitudes en la consola.
- Crear tarjetas mediante un elemento `<template>`.

## Tecnologías utilizadas

- HTML5 y CSS3.
- Diseño responsive y metodología BEM.
- Fuentes locales en formato WOFF2.
- TypeScript y JavaScript ES6+.
- Programación Orientada a Objetos.
- DOM API y HTML Constraint Validation API.
- ES Modules (`import` / `export`).
- Interfaces, genéricos y callbacks tipados.
- Herencia y encapsulamiento.
- Fetch API, JSON y API REST.
- `async` / `await`, `Promise.all()` y `try...catch...finally`.
- Git, GitHub y GitHub Pages.

## Programación Orientada a Objetos

### `Api`

Centraliza las solicitudes al servidor. Recibe la URL base y los encabezados de autorización y contenido. Su método privado genérico `checkResponse<T>()` comprueba `res.ok`, interpreta la respuesta JSON y lanza un error cuando la solicitud falla.

Incluye los métodos `getUserInfo()`, `getInitialCards()`, `editProfile()`, `createCard()`, `toggleLike()`, `deleteCard()` y `updateAvatar()`.

### `Card`

Genera una tarjeta desde el template, configura su título e imagen y registra sus eventos. Conserva el ID, el propietario y el estado del like; compara el propietario con el ID del usuario para mostrar o retirar la papelera.

Recibe callbacks para abrir imágenes, solicitar la eliminación y alternar likes. Actualiza el estado visual del corazón con la respuesta del servidor, sin importar directamente la API ni crear popups.

### `Section`

Administra un contenedor de elementos. Utiliza el genérico `Section<T>`, un callback de renderizado y los métodos `renderItems()` y `addItem()`. Este último inserta elementos al principio del contenedor.

### `Popup`

Clase abstracta que concentra la apertura y el cierre de ventanas emergentes. Gestiona el botón de cierre, el clic en el fondo y la tecla `Escape`, añadiendo y retirando los listeners al abrir y cerrar.

### `PopupWithImage`

Hereda de `Popup` y muestra una imagen con su texto alternativo y leyenda.

### `PopupWithForm`

Hereda de `Popup`, obtiene los valores de los campos y ejecuta un callback al enviar el formulario. Espera al controlador asíncrono antes de cerrar y reinicia el formulario al cerrarlo.

Se utiliza para editar el perfil, crear tarjetas y actualizar el avatar.

### `PopupWithConfirmation`

Hereda de `Popup` y ejecuta un callback al pulsar «Sí». Espera al controlador antes de cerrar la confirmación de eliminación.

### `FormValidator`

Encapsula la validación con una configuración reutilizable de selectores y clases CSS. Valida campos, muestra u oculta errores y controla el estado del botón de envío.

- `enableValidation()`: registra los eventos e inicializa el botón.
- `resetValidation()`: reinicia el formulario, limpia los errores y recalcula el botón.
- `updateButtonState()`: recalcula el botón después de rellenar campos desde JavaScript.

### `UserInfo`

Administra el nombre y la descripción mostrados en la página y conserva el ID del usuario recibido del servidor. Expone `getUserInfo()`, `setUserInfo()` y `getUserId()`.

### `UserAvatar`

Administra la imagen de perfil mediante `getAvatarUrl()` y `setAvatarUrl()`. Registra el clic sobre el avatar y ejecuta el callback que abre su formulario.

## Integración con la API

URL base: `https://around-api.es.tripleten-services.com/v1`.

| Operación | Método | Ruta |
| --- | --- | --- |
| Obtener usuario | GET | `/users/me` |
| Obtener tarjetas | GET | `/cards` |
| Editar perfil | PATCH | `/users/me` |
| Crear tarjeta | POST | `/cards` |
| Dar «me gusta» | PUT | `/cards/:cardId/likes` |
| Quitar «me gusta» | DELETE | `/cards/:cardId/likes` |
| Eliminar tarjeta | DELETE | `/cards/:cardId` |
| Actualizar avatar | PATCH | `/users/me/avatar` |

Las solicitudes incluyen el encabezado `authorization` y `Content-Type: application/json`. Los cuerpos se convierten con `JSON.stringify()`.

La carga inicial utiliza `Promise.all()` para obtener usuario y tarjetas en paralelo. Una vez recibidas ambas respuestas, se actualiza el perfil y se renderizan las tarjetas con el ID del usuario disponible.

Los controladores actualizan los datos visibles después de esperar la API. Los errores se procesan mediante `try...catch`, y el texto de los botones se restaura mediante `finally`.

## TypeScript

El código fuente está en `src/` y el JavaScript compilado se genera en `public/`. La configuración incluye:

```json
{
  "rootDir": "./src",
  "outDir": "./public",
  "module": "es6",
  "target": "es2022",
  "strict": true,
  "allowJs": true,
  "verbatimModuleSyntax": true,
  "isolatedModules": true
}
```

Las interfaces separan los datos de entrada de las respuestas del servidor:

| Interfaz | Uso |
| --- | --- |
| `CardFormData` | Nombre y enlace enviados para crear una tarjeta. |
| `CardData` | Tarjeta completa: ID, propietario, fecha y estado del like. |
| `UserFormData` | Nombre y descripción del formulario; `job` se envía a la API como `about`. |
| `UserData` | Respuesta del usuario con nombre, descripción, avatar e ID. |
| `ConfigObject` | Configuración de la validación. |
| `ApiOptions` | URL base y encabezados de la API. |

## Desarrollo local

Necesitas Git, Node.js y el compilador de TypeScript. El repositorio no incluye actualmente un `package.json` ni scripts de npm.

Clona el repositorio:

```bash
git clone https://github.com/diechilui86/web_project_around.git
cd web_project_around
```

Si no tienes el compilador instalado:

```bash
npm install --global typescript
```

Compila desde la raíz:

```bash
tsc
```

Para recompilar durante el desarrollo:

```bash
tsc --watch
```

Abre `public/index.html` mediante un servidor HTTP local, por ejemplo con Live Server de VS Code. El proyecto utiliza módulos ES.

Antes de publicar cambios de TypeScript, recompila y añade también los archivos actualizados de `public/` al commit. La configuración de la API se encuentra en `src/utils/constants.ts`.

## Estructura del proyecto

| Ruta | Contenido |
| --- | --- |
| `src/index.ts` | Instancias, callbacks, eventos y coordinación de la aplicación. |
| `src/components/` | Las diez clases: `Api`, `Card`, `Section`, `Popup`, `PopupWithForm`, `PopupWithImage`, `PopupWithConfirmation`, `FormValidator`, `UserInfo` y `UserAvatar`. |
| `src/types/types.ts` | Interfaces compartidas. |
| `src/utils/constants.ts` | Configuración de validación, selectores e instancia de API. |
| `public/index.html` | Página, template de tarjeta y cinco popups. |
| `public/index.css` | Importaciones de estilos. |
| `public/blocks/` | Estilos CSS por bloque. |
| `public/images/` | Imágenes e iconos SVG. |
| `public/vendor/` | Normalize.css, estilos de fuentes y archivos WOFF2. |
| `public/components/`, `public/types/`, `public/utils/` | Módulos JavaScript compilados. |
| `public/index.js` | Entrada compilada de la aplicación. |
| `tsconfig.json` | Configuración del compilador. |
| `.gitignore` | Exclusión de `node_modules/` y `.DS_Store`. |
| `README.md` | Documentación del proyecto. |

## Arquitectura

`index.ts` coordina las instancias y conecta los componentes mediante callbacks. `Api` se instancia una vez en `constants.ts`; `UserInfo` conserva la identidad del usuario y `Section` administra la lista de tarjetas.

Cada tarjeta tiene su propia instancia de `Card`, y cada formulario validado tiene una instancia de `FormValidator`. Las tres subclases de `Popup` reutilizan el comportamiento común mediante herencia. Los elementos de los popups están definidos en HTML.

## Conceptos aplicados

- Clases, constructores, métodos y propiedades públicas, privadas y protegidas.
- Herencia, `super` y sobrescritura de métodos.
- Interfaces, tipos de función y genéricos.
- Callbacks para reducir el acoplamiento entre componentes.
- Eventos `click`, `submit`, `input` y `keydown`.
- Validación mediante `validity` y `validationMessage`.
- Inserción de tarjetas con `<template>`, `cloneNode()` y `prepend()`.
- Actualización de textos mediante `textContent`.
- Solicitudes HTTP con Fetch API y serialización JSON.
- Flujo asíncrono, carga paralela y manejo de errores.
- Comparación del propietario de una tarjeta con el usuario actual.

## Diseño

La interfaz utiliza media queries, Flexbox y CSS Grid para adaptar la distribución a diferentes tamaños de pantalla. Los estilos se organizan con la metodología **BEM (Block, Element, Modifier)**.

Incluye fuentes Inter locales, Normalize.css, iconos SVG y estados visuales para botones, errores de validación, likes y edición del avatar.

## Autor

**Diego Chiluisa S.**
