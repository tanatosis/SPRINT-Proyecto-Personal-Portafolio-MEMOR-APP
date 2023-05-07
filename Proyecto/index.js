const express = require('express'); //Importa la biblioteca Express
const hbs = require('hbs'); //Importa HBS
const hbsHelpers = require('./helpers');

const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const five = require('johnny-five');
var methodOverride = require('method-override') //Importa la biblioteca method-override que se utiliza para permitir que los métodos HTTP PUT y DELETE se utilicen en formularios HTML.
const app = express();
const bcrypt = require('bcrypt'); //Importa bcrypt

const server = http.createServer(app);
const io = socketIo(server);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs'); // Configura la aplicación Express para usar HBS como motor de plantillas HTML.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method", { methods: ["GET", "POST"] })); //Configura la aplicación Express para utilizar method-override y permitir que los métodos PUT y DELETE se utilicen en formularios HTML.
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de archivos estáticos
app.use(express.static('public'));
//conexión con la carpeta partials
hbs.registerPartials(__dirname + '/views/partials', function(err) {});

// Configurar el directorio de vistas y el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Ruta para el dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        message: 'Bienvenido al Dashboard'
    });
});

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Conexión con Johnny-Five
const { Board } = require('johnny-five');
const { Console } = require('console');
const board = new Board();

let led;

// Cuando la placa Arduino esté lista, se ejecutará este código
board.on("ready", () => {
    console.log("¡Arduino Conectado!");

    // Se define el pin 13 como un LED
    led = new five.Led(8);

    // Apagar el LED al inicio del programa
    led.off();

    // Se definen los pines de los botones
    const buttonOn = new five.Button(2);
    const buttonOff = new five.Button(3);

    // Cuando el botón de encender se presione, se enciende el LED
    buttonOn.on("press", () => {
        led.on();
        console.log("LED encendido");
    });

    // Cuando el botón de apagar se presione, se apaga el LED
    buttonOff.on("press", () => {
        led.off();
        console.log("LED apagado");
    });
});



app.get("/", async(req, res) => {
    //const resultado = await pool.query("select  * from personas");
    //console.log(resultado.rows);
    const resultado = await fetch("http://localhost:4000/api/v1/personas");
    const data = await resultado.json();
    res.render("index", );
});

// Ruta para el dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        message: 'Bienvenido al Dashboard'
    });
});


// Define una ruta para mostrar la página de registro
app.get("/register", async(req, res) => {
    // Realiza una solicitud a la API de personas
    const resultado = await fetch("http://localhost:4000/api/v1/personas");
    // Extrae los datos de la respuesta en formato JSON
    const data = await resultado.json();
    // Renderiza la plantilla 'register' con los datos obtenidos de la API
    res.render("register", { "users": data });
});

// Define una ruta para mostrar la página de edición
app.get("/editar", async(req, res) => {
    // Realiza una solicitud a la API de personas
    const resultado = await fetch("http://localhost:4000/api/v1/personas");
    // Extrae los datos de la respuesta en formato JSON
    const data = await resultado.json();
    // Renderiza la plantilla 'editar' con los datos obtenidos de la API
    res.render("editar", { "users": data });
});


app.post('/register', async(req, res) => {
    const { username, password } = req.body;

    // Validación de datos
    if (!username || !password) {
        return res.render('register', { error: 'Ingrese un nombre de usuario y contraseña válidos.' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log('hashedPassword:', hashedPassword);

    // Enviar la solicitud POST a la API
    try {
        const response = await fetch('http://localhost:4000/api/v1/personas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password: hashedPassword })
        });
        // Extrae los datos de la respuesta en formato JSON
        const data = await response.json();
        // Si la respuesta es exitosa, redirige al usuario a la página de inicio de sesión
        if (response.ok) {
            res.redirect('/login');
        } else {
            // Si la respuesta indica un error, renderiza la plantilla de registro con un mensaje de error
            res.render('register', { error: data.message });
        }
    } catch (error) {
        // Si hay un error en la solicitud, renderiza la plantilla de registro con un mensaje de error
        res.render('register', { error: 'Error al registrar usuario.' });
    }
});




app.get("/login", async(req, res) => {

    const resultado = await fetch("http://localhost:4000/api/v1/personas");
    const data = await resultado.json();
    res.render("login", { "users": data });
});

app.post('/login', async(req, res) => {
    const { username, password } = req.body;

    // Validación de datos
    if (!username || !password) {
        return res.render('login', { error: 'Ingrese un nombre de usuario y contraseña válidos.' });
    }

    try {
        // Obtener el usuario de la API
        const response = await fetch('http://localhost:4000/api/v1/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.success) {
            // El inicio de sesión fue exitoso
            if (data.user.role == 1) {
                res.render('mantenedor2');
            } else {
                res.render('dashboard', { username: data.user.username });
            }
        } else {
            // El inicio de sesión falló
            res.render('login', { error: 'Usuario o contraseña incorrectos.' });
        }
    } catch (err) {
        console.error(err);
        res.render('login', { error: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.' });
    }
});

app.get("/dashboard", async(req, res) => {
    // Realice una solicitud a su API para obtener los datos que necesita mostrar en el dashboard.
    const response = await fetch('http://localhost:4000/api/v1/dashboard');
    const data = await response.json();
    // Renderiza la plantilla 'dashboard' con los datos obtenidos de la API
    res.render('dashboard', { data });
});


// Se define una ruta para encender el LED
app.get('/led/on', (req, res) => {
    led.on();
    res.send('LED encendido');
});

// Se define una ruta para apagar el LED
app.get('/led/off', (req, res) => {
    led.off();
    res.send('LED apagado');
});


hbs.registerHelper('is_admin', function(value) {
    return value === 'admin';
});


//en este get tomo los valores de la API para mostrarlos en una tabla
app.get("/mantenedor", async(req, res) => {

    const resultado = await fetch("http://localhost:4000/api/v1/personas");
    const data = await resultado.json();
    //console.log(data);
    res.render("mantenedor", { "users": data });
});
//defino el puerto
port = 3000;

//muestra mensaje en consola según el puerto utilizado
server.listen(port, () => {
    console.log("Servidor iniciado en el puerto", port);
});