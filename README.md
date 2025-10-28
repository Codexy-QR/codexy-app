<div align="center">

# 📱 Codexy App (Móvil)

*Repositorio oficial de la Aplicación Móvil (Operativa)* de *Codexy App, construida con **Ionic* y *Angular*.

</div>

---

## 🧭 Tabla de Contenidos
- [Descripción del Proyecto](#-1-descripción-del-proyecto)
- [Características Principales](#-2-características-principales)
- [Pila Tecnológica](#-3-pila-tecnológica)
- [Cómo Empezar (Instalación)](#-4-cómo-empezar-instalación)
- [Scripts Disponibles](#-5-scripts-disponibles)
- [Estructura de Carpetas](#-6-estructura-de-carpetas)
- [Conexión al Backend](#-7-conexión-al-backend)
- [Roles de Usuario (Móvil)](#-8-roles-de-usuario-móvil)
- [Equipo de Desarrollo](#-9-equipo-de-desarrollo)
- [Repositorios del Ecosistema](#-10-repositorios-del-ecosistema)

---

## 📝 1. Descripción del Proyecto

Este repositorio contiene el código fuente de la *aplicación móvil operativa de Codexy App*.  
Está diseñada para *operarios y personal en terreno*, permitiendo:

- Iniciar sesión.
- Visualizar tareas de inventario asignadas.
- Escanear códigos QR de artículos.
- Registrar conteos físicos y condiciones de los ítems.

---

## ✨ 2. Características Principales

- *Autenticación de Usuario:* inicio de sesión seguro para operarios.  
- *Listado de Tareas:* visualización de las tareas asignadas.  
- *Escaneo de Códigos QR:* uso de la cámara mediante Capacitor.  
- *Conteo Físico:* interfaz intuitiva para ingresar cantidades.  
- *Registro de Condición:* marcar artículos como Bueno, Dañado, etc.  
- *Sincronización:* envío de datos del conteo hacia *codexy-api (Backend)*.

---

## 🛠 3. Pila Tecnológica

| Tecnología | Propósito |
|-------------|------------|
| *Ionic* | Framework principal para desarrollo híbrido. |
| *Angular* | Framework base sobre el que corre Ionic. |
| *Capacitor* | Runtime nativo para acceder a cámara y sensores. |
| *TypeScript* | Lenguaje de programación principal. |
| *Tailwind CSS* | Framework de estilos. |
| *RxJS* | Programación reactiva y manejo de estado. |

---

## 🚀 4. Cómo Empezar (Instalación)

### Prerrequisitos
- Node.js (v18+ recomendado)  
- Angular CLI → npm install -g @angular/cli  
- Ionic CLI → npm install -g @ionic/cli  
- Android Studio (para builds nativas de Android)  
- Xcode (para builds nativas de iOS, requiere macOS)

### Pasos de Instalación

1. *Clonar el repositorio*
   ```bash
   git clone https://github.com/Codexy-QR/codexy-app.git
Navegar al directorio

bash
Copiar código
cd codexy-app
Instalar dependencias

bash
Copiar código
npm install
Configurar el entorno
Crea src/environments/environment.ts (basado en environment.example.ts si existe):

ts
Copiar código
export const environment = {
  production: false,
  apiUrl: 'http://192.168.1.X:7000/api' // URL del backend en tu red local
};
⚠ Importante: si pruebas en un dispositivo móvil, no uses localhost.
Usa la IP local de tu máquina (ej. 192.168.1.10).

Sincronizar Capacitor

bash
Copiar código
ionic cap sync
Ejecutar en navegador (modo desarrollo)

bash
Copiar código
ionic serve
Abre en http://localhost:8100

Ejecutar en dispositivo Android

bash
Copiar código
ionic cap run android -l --external
📜 5. Scripts Disponibles
Comando	Descripción
ionic serve	Levanta el servidor de desarrollo en el navegador.
ionic build	Compila la aplicación web.
ionic cap sync	Sincroniza los assets web con plataformas nativas.
ionic cap run android	Ejecuta la app en dispositivo/emulador Android.
ionic cap run ios	Ejecuta la app en dispositivo/emulador iOS.

📁 6. Estructura de Carpetas
java
Copiar código
src/
├── app/
│   ├── components/   → Componentes compartidos (header, qr-scanner)
│   ├── pages/        → Páginas principales (login, task-list, scan)
│   ├── services/     → Servicios (auth.service, data.service)
│   ├── interfaces/   → Interfaces TypeScript (User, Task, Item)
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── ...
│
├── assets/          → Imágenes, fuentes, etc.
├── environments/    → Archivos de entorno (.dev y .prod)
├── theme/           → Variables globales y estilos (global.scss)
├── index.html
├── main.ts
└── ...
🔗 7. Conexión al Backend
La aplicación móvil consume la API REST codexy-api.
Para desarrollo, el backend debe estar ejecutándose y accesible desde el dispositivo.

less
Copiar código
[ 📱 App Móvil (Este Repo) ]
             |
             v
[ 🌐 API REST (codexy-api) ]
             |
             v
[ 🗃 Base de Datos (codexy-db) ]
👥 8. Roles de Usuario (Móvil)
👤 Operativo (Operario): ejecuta tareas, escanea ítems y registra conteos.

✔ Verificador: confirma conteos (puede coincidir con el Jefe de Zona).

🧑‍💻 9. Equipo de Desarrollo
Nombre	Rol	Contacto
Juan Manuel Gutiérrez Fierro	Líder / Dev. Backend y Frontend	[@juan-gutierrez]
Rubén Felipe Tovar	Coordinador / Dev. Backend y Frontend	[@ruben-tovar]
Isabella Carrera Cabrera	Monitora / Dev. Frontend	[@isabella-carrera]

📂 10. Repositorios del Ecosistema
Repositorio	Descripción
📦 codexy-api	Backend (API en C# .NET).
🖥 codexy-portal	Portal Web (Frontend en Angular).
📱 codexy-app	Este repositorio. Aplicación móvil (Ionic).
🗃 codexy-db	Scripts y modelo de base de datos (SQL Server).
📖 codexy-docs	Documentación central del proyecto.