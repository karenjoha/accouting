import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
const Calendario = () => {
  const [calendario, setCalendario] = useState([]);

  useEffect(() => {
    axios.get('/api/calendario').then((response) => {
      setCalendario(response.data);
    });
  }, []);

  return (
    <div>
        <h5>calendario</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Descripción</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {calendario.map((factura) => (
            <tr key={factura.id}>
              <td>{factura.id}</td>
              <td>{factura.fecha}</td>
              <td>{factura.cliente}</td>
              <td>{factura.descripcion}</td>
              <td>{factura.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Calendario;
