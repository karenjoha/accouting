import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/facturasmodal.css'
const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fecha: '',
    cliente: '',
    descripcion: '',
    total: 0,
  });
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('/api/facturas').then((response) => {
      setFacturas(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Aquí puedes enviar los datos del formulario al servidor, por ejemplo, usando axios.post
    // Una vez que la factura se ha creado con éxito, puedes cerrar el modal y actualizar la lista de facturas
    setShowModal(false);
    // Aquí podrías realizar alguna acción con los datos del formulario
    console.log('Datos del formulario:', formData);
  };

  return (
    <div>
            <div>
        <button className='button-atras' onClick={() => navigate(-1)}>Volver</button>
      </div>
      <h1 class="title" >Facturas</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>Crear Factura</Button>

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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formCliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Control type="text" name="cliente" value={formData.cliente} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formTotal">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" name="total" value={formData.total} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Facturas;
