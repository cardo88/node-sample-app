const express = require('express');
const mysql = require('mysql2');
const app = express();

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
  host: '52.186.74.58', // Cambia esto según la IP de tu servidor de base de datos
  user: 'deploy',
  password: 'Lunes.123',
  database: 'exampledb' // Asegúrate de crear esta base de datos
});

// Conexión a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

// Configuración del servidor
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Ruta principal
app.get('/', (req, res) => {
  const query = 'SELECT * FROM items';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('index', { items: results });
  });
});

// Ruta para agregar un nuevo ítem
app.post('/add', (req, res) => {
  const newItem = req.body.item;
  const query = 'INSERT INTO items (name) VALUES (?)';
  db.query(query, [newItem], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Inicio del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});