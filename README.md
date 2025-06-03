```markdown
# Frontend: Aplicación Web de Noticias

Esta es la aplicación web cliente construida con React, TypeScript y Vite. Es la interfaz de usuario que interactúa con la API de noticias para permitir la gestión completa de artículos (Crear, Leer, Actualizar, Eliminar).

---

## 🚀 Cómo Empezar

Sigue estos pasos para levantar la aplicación frontend en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

* **Node.js**: Versión 18.x o superior.
* **npm**: Versión 9.x o superior.
* El **Backend** del proyecto debe estar corriendo. Asegúrate de que el servidor API esté iniciado y accesible en `http://localhost:3000` (o el puerto que hayas configurado en el backend).

### Instalación

1.  **Navega a la carpeta del frontend** en tu terminal:
    ```bash
    cd mfnews-frontend
    ```
2.  **Instala todas las dependencias** del proyecto:
    ```bash
    npm install
    ```

### Ejecución de la Aplicación

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
La aplicación se compilará y se abrirá automáticamente en tu navegador predeterminado. Generalmente, estará disponible en http://localhost:5173.

🛠 Tecnologías Utilizadas

React: La librería principal de JavaScript para construir interfaces de usuario interactivas y declarativas.
TypeScript: Un superset de JavaScript que añade tipado estático. Mejora la robustez del código, facilita la detección de errores en tiempo de desarrollo y la escalabilidad del proyecto.
Vite: Una herramienta de construcción frontend moderna y extremadamente rápida. Proporciona un servidor de desarrollo instantáneo y un rendimiento de compilación optimizado.
React Router DOM v6: La librería estándar para el enrutamiento y la navegación dentro de aplicaciones React de una sola página (SPA).
Axios: Un cliente HTTP basado en promesas. Se utiliza para realizar solicitudes a la API RESTful del backend de forma sencilla y eficiente.
React-Bootstrap: Una reimplementación completa de los componentes de Bootstrap como componentes de React. Permite construir interfaces de usuario responsivas y atractivas de manera rápida.
React-Bootstrap-Icons: Una librería de íconos SVG diseñados específicamente para integrarse con Bootstrap y React, ofreciendo una amplia variedad de íconos ligeros.
Bootstrap: El popular framework CSS que proporciona un diseño responsivo y predefinido, acelerando el desarrollo de la interfaz de usuario.

📂 Estructura de Archivos Clave
src/App.tsx: El componente principal que encapsula la lógica global de la aplicación, el manejo de estados de alto nivel y la estructura de enrutamiento principal.
src/main.tsx: El punto de entrada de la aplicación React, donde se renderiza el componente App dentro del DOM.
src/pages/: Contiene los componentes que representan las vistas principales de la aplicación (por ejemplo, NewsListPage para el listado de noticias, NewsDetailPage para los detalles de una noticia).
src/components/: Almacena componentes React reutilizables, divididos en:
common/: Para componentes genéricos que pueden usarse en cualquier parte (ej. Modal, Spinner, NotificationToast, ConfirmationModal).
news/: Para componentes específicos relacionados con la funcionalidad de noticias (ej. Header, NewsForm).
src/api/newsService.ts: Módulo encargado de todas las llamadas a la API del backend, aislando la lógica de comunicación con la API.
src/types/: Contiene las definiciones de tipos de TypeScript para las estructuras de datos usadas en la aplicación (ej. News.ts).
index.html: La plantilla HTML principal donde se monta la aplicación React.
vite.config.ts: El archivo de configuración de Vite, donde se definen plugins, opciones de desarrollo y optimizaciones para el proceso de compilación.
package.json y package-lock.json: Gestionan las dependencias del proyecto.
tsconfig.json, tsconfig.app.json, tsconfig.node.json: Archivos de configuración de TypeScript para el proyecto.

✨ Características Principales
Interfaz de Usuario Intuitiva: Diseño limpio y profesional gracias a la integración con Bootstrap, garantizando una experiencia de usuario agradable.
Gestión Completa de Noticias (CRUD): Permite a los usuarios realizar todas las operaciones fundamentales sobre los artículos de noticias:
Listado de Noticias: Muestra todas las noticias disponibles en una vista organizada.
Visualización Detallada: Acceso a la información completa de cada noticia.
Creación de Noticias: Formulario interactivo para añadir nuevos artículos.
Edición de Noticias: Capacidad de modificar el contenido de noticias existentes.
Eliminación de Noticias: Funcionalidad para borrar noticias permanentemente.
Notificaciones al Usuario (Toast): Proporciona feedback visual instantáneo a través de mensajes "toast" para acciones exitosas, errores o información relevante.
Modales Dinámicos: Utiliza componentes modales para formularios de creación/edición de noticias y para solicitudes de confirmación antes de operaciones críticas como la eliminación.
Diseño Responsivo: La interfaz se adapta correctamente a diferentes tamaños de pantalla (desktops, tablets, móviles).
