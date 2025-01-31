# To-Do App - Documentación de la Aplicación

## 1. Descripción General

La To-Do App es una aplicación web que permite a los usuarios gestionar sus tareas de manera eficiente mediante un CRUD (Crear, Leer, Actualizar, Eliminar). Los usuarios pueden agregar tareas, verlas, editarlas, marcarlas como completadas o eliminarlas.

**Funcionalidades principales:**

- **Ver tareas:** Mostrar una lista de tareas obtenidas desde la base de datos.
- **Agregar tarea:** Permitir al usuario agregar nuevas tareas mediante un formulario.
- **Editar tarea:** Modificar las tareas existentes (título y descripción).
- **Eliminar tarea:** Eliminar tareas que ya no sean necesarias.
- **Marcar tarea como completada:** Permitir al usuario marcar una tarea como completada.

![image](https://github.com/user-attachments/assets/e3ab1b63-004e-4a01-bcd5-be942e660f71)


## 2. Tecnologías Utilizadas

**Frontend:**

- React con Next.js y TypeScript para la interfaz de usuario.
- Tailwind CSS para el diseño de la interfaz (alternativamente, puedes usar CSS puro si prefieres).
- Fetch API para consumir la API del backend.

**Backend:**

- Next.js API Routes para manejar las solicitudes RESTful.
- Supabase como base de datos (PostgreSQL) para almacenar las tareas.

**Base de Datos:**

- PostgreSQL para almacenar las tareas de los usuarios, usando la tabla `tasks`.

## 3. Funcionalidad Detallada

**Frontend:**

- **Página principal:**
    - Muestra la lista de tareas obtenidas desde el backend.
    - Incluye un formulario para agregar nuevas tareas.
    - Los botones de cada tarea permiten editarla, eliminarla o marcarla como completada.
- **Formulario de tareas:**
    - Permite ingresar el título de la tarea (máximo 100 caracteres) y una descripción opcional.
    - Un botón de "Agregar tarea" crea una nueva tarea.
    - Las tareas existentes se pueden editar y guardar mediante un botón de "Actualizar".
- **Botones de acción:**
    - **Eliminar tarea:** Elimina una tarea de la lista.
    - **Editar tarea:** Abre el formulario con los datos actuales de la tarea para editarla.
    - **Completada:** Permite marcar una tarea como completada (cambiando el valor del campo `completed`).

## 4. Cómo Correr el Proyecto (Paso a Paso)

**Requisitos previos:**

- Tener instalado Node.js (recomendado versión 16 o superior).
- Tener acceso a Supabase para configurar la base de datos.

**Pasos para ejecutar el proyecto:**

1. **Clonar el repositorio:**
   Si aún no tienes el código, clónalo desde tu repositorio:
   ```
   git clone https://github.com/javiezapata/TaskNextJsReact.git
   ```
2. **Instalar depedencias**
   Dentro de la carpeta del proyecto, instala todas las dependencias necesarias con npm o yarn:
   ```
   npm install
   yarn install
   ```
2. **Configurar Supabase:**
   Crea una cuenta en Supabase.

   Crea un nuevo proyecto y obtén las claves API para tu base de datos PostgreSQL.

   Crea la tabla tasks en la base de datos con la siguiente estructura SQL:
   ```
   CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100),
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
    );
   ```
   Crea un archivo .env para las variables de entorno en la raiz del proyecto.

    ```
    NEXT_PUBLIC_SUPABASE_URL='[https://your-project.supabase.co]'; // Reemplaza con tu URL de Supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY='your-public-anon-key'; // Reemplaza con tu clave anónima
   ```

    En caso de no poder obtenerlo estas son mis claves
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://efgosannhoplueyociww.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmZ29zYW5uaG9wbHVleW9jaXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMDczNzYsImV4cCI6MjA1Mzc4MzM3Nn0.cOmzXq1k76uElFAScPNZw2O8Ed0Yc2CqhzJALi1ELdI
  ```

   
