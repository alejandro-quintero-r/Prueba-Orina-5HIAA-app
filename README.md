# Pagina-Prueba-Orina-5HIAA
Plataforma-Prueba-Orina-5HIAA PROYECTO DE GRADO ALEJANDRO QUINTERO: Prueba de Orina 5-HIAA: Diseño e implementación de un sistema de información para el registro y consultoría de resultados

El proyecto se realiza utilizando el conjunto de tecnologias y herramientas MERN en donde se integran las siguientes tecnologias para desarrollar la aplicacion web; Cada letra representa una tecnología específica:

M - MongoDB: es una base de datos NoSQL orientada a documentos que se utiliza para almacenar y recuperar datos de manera eficiente.

E - Express.js: es un framework de desarrollo de aplicaciones web basado en Node.js. Proporciona una estructura y un conjunto de utilidades para construir servidores y manejar solicitudes HTTP de manera sencilla.

R - React: es una biblioteca de JavaScript de código abierto para construir interfaces de usuario interactivas y reutilizables. En este proyecto se utilizo el motor de plantillas Handlebars para una manera eficiente de crear interfaces rápidas
y dinámicas, proporcionando una forma sencilla y flexible de combinar datos y plantillas HTML para crear vistas dinámicas..

N - Node.js: es un entorno de tiempo de ejecución de JavaScript que permite ejecutar código JavaScript en el servidor. Node.js proporciona un entorno escalable y de alto rendimiento para desarrollar aplicaciones web en el lado del servidor. 

En resumen, el stack MERN permite desarrollar aplicaciones web modernas y dinámicas, donde MongoDB se utiliza como base de datos, Express.js como framework de servidor, Handlebars para construir la interfaz de usuario y Node.js para ejecutar el código del servidor.
Esta combinación proporciona una forma eficiente de desarrollar aplicaciones web de pila completa utilizando JavaScript en todos los niveles.

*pasos para ejecutar el proyecto*
Para realizar una ejecucion optima del proyecto se debe seguir los siguientes pasos:

1. Descargar el proyecto en archivo comprimido o ejecutando el comando de git clone en git bash
2. Descomprimir el archivo y abrirlo con Visual Studio Code
3. Eliminar la carpeta de node_modules y el archivo package-lock.json
4. Abrir una terminal y ejecutar el comando "npm install -force" asegurarse de instalar las siguientes dependencias con su respectiva version:
  -"bcryptjs": "^2.4.3"
  -"connect-flash": "^0.1.1"
  -"express": "^4.18.2"
  -"express-handlebars": "^3.1.0"
  -"express-session": "^1.17.2"
  -"handlebars": "^4.5.0"
  -"method-override": "^3.0.0"
  -"mongoose": "^6.0.12"
  -"morgan": "^1.10.0"
  -"passport": "^0.5.0"
  -"passport-local": "^1.0.0"
  -dotenv": "^16.0.3"
  -"nodemon": "^2.0.22"
  
5. Ejecurtar el comando "npm run dev" para ejecutar el proyecto en: localhost:3000
<!DOCTYPE html>
<html>
<head>
    <title>Información de Autenticación</title>
</head>
<body>
    <h2>Pruebas de Diferentes Roles</h2>
    <ul>
        <li><strong>Admi:</strong></li>
        <ul>
            <li>user: administrador@gmail.com</li>
            <li>password: 12345678</li>
        </ul>
        <li><strong>Medico:</strong></li>
        <ul>
            <li>user: medico@gmail.com</li>
            <li>password: 12345678</li>
        </ul>
        <li><strong>Empleado:</strong></li>
        <ul>
            <li>user: empleado@gmail.com</li>
            <li>password: 12345678</li>
        </ul>
    </ul>
    <h2>Información Personal de Pacientes</h2>
    <p>Para agendar una cita, se crearon 3 pacientes con la siguiente información de autenticación y cédula:</p>
    <ul>
        <li><strong>Paciente 1:</strong></li>
        <ul>
            <li>user: paciente1@gmail.com</li>
            <li>password: 12345678</li>
            <li>CC: 26449873</li>
        </ul>
        <li><strong>Paciente 2:</strong></li>
        <ul>
            <li>user: pacienteFrancisco@gmail.com</li>
            <li>password: 12345678</li>
            <li>CC: 91267385</li>
        </ul>
        <li><strong>Paciente 3:</strong></li>
        <ul>
            <li>user: pacienteelizabeth@gmail.com</li>
            <li>password: 12345678</li>
            <li>CC: 55155389</li>
        </ul>
    </ul>
</body>
</html>


NOTA: Si el proyecto ejecutado presenta problemas en alguna pagina, verificar la version de las dependencias instaladas, remitirse al archivo json de este repositorio para verificar las dependencias y su version 
