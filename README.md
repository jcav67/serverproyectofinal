# **Proyecto WebGis Mineros de subsistencia - Backend NodeJs**
## trabajo de grado universidad San Buenaventura 2021
## Realizado por
- Arango Valle Juan Camilo  
- Villa Marín Santiago

# Estructura del proyecto
## Controllers
### **auth.js**
- Este controlador realiza el proceso de autenticación de JWT, login y creación de usuario.
### **broker**
- Los controladores encargados de realizar operaciones con la base de datos (CRUD)

## Helpers
### **jwt.js**
- Permite crear token  para la autenticación del usuario

## Middleware
### **validar-campos**
- Validar caracteristicas especiales de los campos (longitud, tipo de dato, cantidad de caracteres...)

## Public
- Vistas del usuario, es el proyecto de Angular compilado en modo de producción para subir al servidor 

## Routes
### **auth.js**
- contiene las rutas para consumo de apis referentes a la autenticación de usuarios
### **broker.js**
- contiene las rutas para la interacción con la base de datos

## Archivos principales
### **databse.js**
- permite conectarse con la base de datos
### **index.js**
- es el archivo de configuración de la aplicación, encargado de inicializar el servidor :V 
### **keys.js**
- Guarda la información de credenciales para poder conectarse a la base de datos

# Consideraciones
<<<<<<< HEAD
- para correr el servidor en forma local se debe ejecutar en el cmd el comando <pre>npm run dev</pre>, previamente se debe tener nodejs instalado. Se puede descargar desde el siguiente enlace: https://nodejs.org/es/ 
=======
- para correr el servidor en forma local se debe ejecutar en el cmd el comando <pre>npm run dev</pre> previamente se debe tener nodejs instalado. Se puede descargar desde el siguiente enlace: https://nodejs.org/es/ 
>>>>>>> d0e2a74dee6035bd37976a29e0ad852329ff2952

- La base de datos funciona en MySQL, se debe ejecutar el script en un gestor de bases de datos de su preferencia. (ver archivo keys.js)

- Instalar las dependencias requeridas <pre>npm install</pre>
