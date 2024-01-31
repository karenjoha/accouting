import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
const Facturas = () => {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    axios.get('/api/facturas').then((response) => {
      setFacturas(response.data);
    });
  }, []);

  return (
    <div>
        <h5>facturas</h5>
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
          {facturas.map((factura) => (
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

export default Facturas;
