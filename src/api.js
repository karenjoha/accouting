const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'accounting',
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    process.exit();
  }

  console.log('Conexión a la base de datos establecida');
});

app.get('/api/facturas', (req, res) => {
  connection.query('SELECT * FROM facturas', (err, rows) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(rows);
    }
  });
});

app.listen(3000, () => {
  console.log('API REST escuchando en el puerto 3000');
});
