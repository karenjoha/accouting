const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  req.setLocale('es-CO');
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'accounting'
});

connection.connect(error => {
  if (error) {
    console.error('Error de conexión a MySQL:', error);
  } else {
    console.log('Conexión a MySQL exitosa');
  }
});

// Endpoint para guardar un evento en la base de datos
app.post('accounting/calendario', (req, res) => {
    const { fecha, evento } = req.body;
    const query = 'INSERT INTO calendario (fecha, evento) VALUES (?, STR_TO_DATE(?, "%Y-%m-%d"))';
    connection.query(query, [fecha, evento], (error, results) => {
      if (error) {
        console.error('Error al guardar el evento:', error);
        res.status(500).json({ message: 'Error al guardar el evento' });
      } else {
        res.status(201).json({ message: 'Evento guardado correctamente' });
      }
    });
  });
  

// Endpoint para obtener todos los eventos de la base de datos
app.get('/calendario', (req, res) => {
  const query = 'SELECT * FROM calendario';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener eventos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
