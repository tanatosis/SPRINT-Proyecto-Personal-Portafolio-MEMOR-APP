const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('hbs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar el directorio de vistas y el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Página de Inicio',
        message: 'Bienvenido a la Página de Inicio'
    });
});

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
const board = new Board();



// Configura una función de devolución de llamada para cuando la placa esté lista para su uso
board.on("ready", () => {

    // Imprime un mensaje en la consola cuando se establece la conexión con el Arduino
    console.log("¡Arduino Conectado!");

    // Inicializa las variables "counter", "power", "totalMoneySpent" y "costPerWatt"
    let counter = 0;
    let power = 0;
    let totalMoneySpent = 0;
    const costPerWatt = 0.005;

    // Establece un temporizador de intervalo de 2 segundos para actualizar el consumo de energía y el costo total
    setInterval(() => {

        // Agrega un número aleatorio entre 200 y 500 a la variable "power"
        power += Math.floor(Math.random() * (500 - 200 + 1) + 200)

        // Resta un número aleatorio entre 50 y 150 a la variable "power"
        power -= Math.floor(Math.random() * (150 - 50 + 1) + 50);

        // Calcula el costo del consumo de energía durante el intervalo de tiempo de 2 segundos
        const moneySpent = power * costPerWatt;

        // Suma el costo a la variable "totalMoneySpent" para rastrear el costo total de la energía consumida
        totalMoneySpent += moneySpent;

        // Imprime el consumo de energía y el costo total en la consola
        console.log(`Consumo de watts: ${power}, Dinero gastado total: $${totalMoneySpent.toFixed(2)}`);

        // Incrementa el contador en uno
        counter++;

        // Emite un evento "counter" utilizando la biblioteca Socket.IO
        io.emit("counter", counter);

    }, 2000);
});





// Iniciar el servidor
port = 3000
server.listen(port, () => {
    console.log('Servidor corriendo en el puerto', port);
});