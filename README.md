<!DOCTYPE html>
<html>
<head>
    <title>Pagina-Prueba-Orina-5HIAA</title>
</head>
<body>
    <h1>Plataforma-Prueba-Orina-5HIAA PROYECTO DE GRADO ALEJANDRO QUINTERO</h1>
    <h2>Prueba de Orina 5-HIAA: Diseño e implementación de un sistema de información para el registro y consultoría de resultados</h2>

    <p>El proyecto se realiza utilizando el conjunto de tecnologías y herramientas MERN, donde se integran las siguientes tecnologías para desarrollar la aplicación web:</p>

    <ul>
        <li><strong>M - MongoDB:</strong> Es una base de datos NoSQL orientada a documentos que se utiliza para almacenar y recuperar datos de manera eficiente.</li>
        <li><strong>E - Express.js:</strong> Es un framework de desarrollo de aplicaciones web basado en Node.js. Proporciona una estructura y un conjunto de utilidades para construir servidores y manejar solicitudes HTTP de manera sencilla.</li>
        <li><strong>R - React:</strong> Es una biblioteca de JavaScript de código abierto para construir interfaces de usuario interactivas y reutilizables. En este proyecto se utilizó el motor de plantillas Handlebars para una manera eficiente de crear interfaces rápidas y dinámicas, proporcionando una forma sencilla y flexible de combinar datos y plantillas HTML para crear vistas dinámicas.</li>
        <li><strong>N - Node.js:</strong> Es un entorno de tiempo de ejecución de JavaScript que permite ejecutar código JavaScript en el servidor. Node.js proporciona un entorno escalable y de alto rendimiento para desarrollar aplicaciones web en el lado del servidor.</li>
    </ul>

    <p>En resumen, el stack MERN permite desarrollar aplicaciones web modernas y dinámicas, donde MongoDB se utiliza como base de datos, Express.js como framework de servidor, Handlebars para construir la interfaz de usuario y Node.js para ejecutar el código del servidor. Esta combinación proporciona una forma eficiente de desarrollar aplicaciones web de pila completa utilizando JavaScript en todos los niveles.</p>

    <h2>Pasos para Ejecutar el Proyecto</h2>

    <p>Para realizar una ejecución óptima del proyecto, sigue los siguientes pasos:</p>

    <ol>
        <li>Descarga el proyecto en archivo comprimido o ejecutando el comando <code>git clone</code> en Git Bash.</li>
        <li>Descomprime el archivo y ábrelo con Visual Studio Code.</li>
        <li>Elimina la carpeta <code>node_modules</code> y el archivo <code>package-lock.json</code>.</li>
        <li>Abre una terminal y ejecuta el comando <code>npm install -force</code>. Asegúrate de instalar las siguientes dependencias con su respectiva versión:</li>
    </ol>

    <pre>
        <code>
            "bcryptjs": "^2.4.3"
            "connect-flash": "^0.1.1"
            "express": "^4.18.2"
            "express-handlebars": "^3.1.0"
            "express-session": "^1.17.2"
            "handlebars": "^4.5.0"
            "method-override": "^3.0.0"
            "mongoose": "^6.0.12"
            "morgan": "^1.10.0"
            "passport": "^0.5.0"
            "passport-local": "^1.0.0"
            "dotenv": "^16.0.3"
            "nodemon": "^2.0.22"
        </code>
    </pre>

    <ol start="5">
        <li>Ejecuta el comando <code>npm run dev</code> para ejecutar el proyecto en <code>localhost:3000</code>.</li>
    </ol>

    <h3>Información de Autenticación</h3>

    <h4>Pruebas de Diferentes Roles</h4>

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

    <h4>Información Personal de Pacientes</h4>

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
NOTA: Si el proyecto ejecutado presenta problemas en alguna página, verificar la versión de las dependencias instaladas, referirse al archivo json de este repositorio para verificar las dependencias y su versión.
