Pagina-Prueba-Orina-5HIAA
Plataforma-Prueba-Orina-5HIAA PROYECTO DE GRADO ALEJANDRO QUINTERO: Prueba de Orina 5-HIAA: Diseño e implementación de un sistema de información para el registro y consultoría de resultados.

El proyecto se realiza utilizando el conjunto de tecnologías y herramientas MERN, donde se integran las siguientes tecnologías para desarrollar la aplicación web:

M - MongoDB: Es una base de datos NoSQL orientada a documentos que se utiliza para almacenar y recuperar datos de manera eficiente.
E - Express.js: Es un framework de desarrollo de aplicaciones web basado en Node.js. Proporciona una estructura y un conjunto de utilidades para construir servidores y manejar solicitudes HTTP de manera sencilla.
R - React: Es una biblioteca de JavaScript de código abierto para construir interfaces de usuario interactivas y reutilizables. En este proyecto se utilizó el motor de plantillas Handlebars para una manera eficiente de crear interfaces rápidas y dinámicas, proporcionando una forma sencilla y flexible de combinar datos y plantillas HTML para crear vistas dinámicas.
N - Node.js: Es un entorno de tiempo de ejecución de JavaScript que permite ejecutar código JavaScript en el servidor. Node.js proporciona un entorno escalable y de alto rendimiento para desarrollar aplicaciones web en el lado del servidor.
En resumen, el stack MERN permite desarrollar aplicaciones web modernas y dinámicas, donde MongoDB se utiliza como base de datos, Express.js como framework de servidor, Handlebars para construir la interfaz de usuario y Node.js para ejecutar el código del servidor. Esta combinación proporciona una forma eficiente de desarrollar aplicaciones web de pila completa utilizando JavaScript en todos los niveles.

Pasos para Ejecutar el Proyecto
Para realizar una ejecución óptima del proyecto, sigue los siguientes pasos:

Descarga el proyecto en archivo comprimido o ejecutando el comando git clone en Git Bash.
Descomprime el archivo y ábrelo con Visual Studio Code.
Elimina la carpeta node_modules y el archivo package-lock.json.
Abre una terminal y ejecuta el comando npm install -force. Asegúrate de instalar las siguientes dependencias con su respectiva versión:
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
Ejecuta el comando npm run dev para ejecutar el proyecto en localhost:3000.
Información de Autenticación

Pruebas de Diferentes Roles
Admi:
user: administrador@gmail.com
password: 12345678
Medico:
user: medico@gmail.com
password: 12345678
Empleado:
user: empleado@gmail.com
password: 12345678
Información Personal de Pacientes
Para agendar una cita, se crearon 3 pacientes con la siguiente información de autenticación y cédula:

Paciente 1:
user: paciente1@gmail.com
password: 12345678
CC: 26449873
Paciente 2:
user: pacienteFrancisco@gmail.com
password: 12345678
CC: 91267385
Paciente 3:
user: pacienteelizabeth@gmail.com
password: 12345678
CC: 55155389
NOTA: Si el proyecto ejecutado presenta problemas en alguna página, verificar la versión de las dependencias instaladas, referirse al archivo json de este repositorio para verificar las dependencias y su versión.
