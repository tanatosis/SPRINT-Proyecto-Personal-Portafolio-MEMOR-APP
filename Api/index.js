const express = require("express"); // Importando el módulo express
const pg = require("pg"); // Importando el módulo pg (PostgreSQL)
const bcrypt = require("bcrypt"); // Importando el módulo bcrypt para el hash de contraseñas

const app = express(); // Creando una instancia del módulo express
const { Pool } = pg; // Desestructurando el objeto Pool del módulo pg
app.use(express.json()); // Analizando los cuerpos de las solicitudes entrantes como JSON

const pool = new pg.Pool({ // Creando un nuevo pool de conexiones con PostgreSQL
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '864069',
    port: 5432,
});

port = 4000
app.listen(port, () => {
    console.log('conectado al puerto', port);
})

app.get("/api/v1/personas", async(req, res) => {
    const resultado = await pool.query("SELECT u.id, u.username, u.password, u.email, SUM(cd.watts) as total_consumo FROM users u LEFT JOIN areas a ON u.id = a.id_usuario LEFT JOIN consumo_diario cd ON cd.id_area = a.id_area GROUP BY u.id ORDER BY id");
    res.json(resultado.rows);
});





app.post("/api/v1/personas", async(req, res) => {
    const { username, password } = req.body; // Extrayendo el nombre de usuario y la contraseña del cuerpo de la solicitud
    const hashedPassword = await bcrypt.hash(password, 10); // Hasheando la contraseña usando bcrypt

    // Insertando el nuevo usuario en la base de datos y devolviendo el id del nuevo usuario
    const resultado = await pool.query("insert into users (username, password) values($1,$2) RETURNING id", [username, hashedPassword]);

    res.json({ id: resultado.rows[0].id }); // Enviando el id del nuevo usuario como respuesta en formato JSON
});

app.post("/api/v1/login", async(req, res) => {
    const { username, password } = req.body; // Extrayendo el nombre de usuario y la contraseña del cuerpo de la solicitud

    // Obteniendo el usuario con el nombre de usuario dado de la base de datos
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
        // Si no se encuentra ningún usuario con el nombre de usuario dado, enviando un mensaje de error como respuesta
        res.json({ success: false, message: 'Usuario o contraseña incorrectos.' });
    } else {
        // Validando la contraseña usando bcrypt
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            // Si la contraseña es válida, enviando la información del usuario como respuesta
            res.json({ success: true, user: { id: user.id, username: user.username, role: user.id_rol } });
        } else {
            // Si la contraseña no es válida, enviando un mensaje de error como respuesta
            res.json({ success: false, message: 'Usuario o contraseña incorrectos.' });
        }
    }
});