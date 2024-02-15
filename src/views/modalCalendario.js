// En tu componente ModalCalendario.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import '../css/modal.css'



const ModalCalendario = ({ isOpen, onClose, onGuardar }) => {
  const [nuevoEvento, setNuevoEvento] = useState('');

  const handleGuardar = () => {
    onGuardar(nuevoEvento);
    setNuevoEvento('');
  };

  return (
    <Modal className="custom-modal"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Agregar Evento"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2 className='title' >Agregar Evento</h2>
        <button className='close-button' onClick={onClose}>X</button>
      </div>
      <label className='subtitle'>Evento:</label><br></br>
      <input
      className='input'
        type="text"
        id="evento"
        value={nuevoEvento}
        onChange={(e) => setNuevoEvento(e.target.value)}
      /><br></br>
      <button className='saved-button' onClick={handleGuardar}>Guardar Evento</button>
    </Modal>
  );
};

export default ModalCalendario;
