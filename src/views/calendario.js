import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaBell } from 'react-icons/fa';
import '../css/calendario.css';
import ModalCalendario from './modalCalendario';

const Calendario = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventosCercanos, setEventosCercanos] = useState([]);

  useEffect(() => {
    const hoy = new Date();
    const eventosProximos = eventos.filter(evento => (
      (evento.fecha - hoy) / (1000 * 60 * 60 * 24) <= 2
    ));
    setEventosCercanos(eventosProximos);
  }, [selectedDate, eventos]);

  const handleDateChange = (date) => {
    const fechaActual = new Date();

    if (date.getTime() >= fechaActual.getTime()) {
      setSelectedDate(date);
      setModalIsOpen(true);
      setEventoSeleccionado(null);
    } else {
      alert('Por favor, selecciona una fecha igual o posterior a la fecha actual');
    }
  };

  const guardarEvento = (eventoSeleccionado) => {
    // Formatear la fecha al formato 'YYYY-MM-DD'
    const formattedDate = eventoSeleccionado.fecha.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
    const eventoFormateado = { ...eventoSeleccionado, fecha: formattedDate };
  
    console.log('Evento seleccionado para guardar:', eventoFormateado);
  
    fetch('http://localhost:5000/calendario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventoFormateado),
    })
    .then(response => {
      console.log('Respuesta del servidor:', response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al guardar el evento');
      }
    })
    .then(data => {
      console.log('Evento guardado en el servidor', data);
      // Actualiza el estado de eventos solo después de que la solicitud al servidor sea exitosa
      setEventos([...eventos, eventoFormateado]);
    })
    .catch(error => {
      console.error('Error al guardar el evento en el servidor', error);
    });
  };
  


  const agregarEvento = (nuevoEvento) => {
    if (nuevoEvento.trim() !== '') {
      if (eventoSeleccionado !== null) {
        const nuevosEventos = eventos.map((evento, index) =>
          index === eventoSeleccionado ? { fecha: selectedDate, evento: nuevoEvento.trim() } : evento
        );
        setEventos(nuevosEventos);
      } else {
        setEventos([...eventos, { fecha: selectedDate, evento: nuevoEvento.trim() }]);
      }

      // Llama a guardarEvento para guardar el nuevo evento en la base de datos
      guardarEvento({ fecha: selectedDate, evento: nuevoEvento.trim() });

      setModalIsOpen(false);
      setEventoSeleccionado(null);
    } else {
      alert('Por favor, ingresa un nombre para el evento.');
    }
  };

  const handleEditarEvento = (index) => {
    const eventoSeleccionado = eventos[index];
    setSelectedDate(eventoSeleccionado.fecha);
    setEventoSeleccionado(index);
    setModalIsOpen(true);
  };

  const handleEliminarEvento = (index) => {
    const nuevosEventos = eventos.filter((evento, i) => i !== index);
    setEventos(nuevosEventos);
  };

  return (
    <div className="calendario-container">
      <div>
        <button className='button-atras' onClick={() => navigate(-1)}>Volver</button>
      </div>
      <div className="reminder-icon">
        <FaBell className="bell-icon" />
        {eventosCercanos.length > 0 && (
          <div className="reminder-count">{eventosCercanos.length}</div>
        )}
      </div>
      <h5 className="calendario-header">Calendario</h5>
      <div>
        <Calendar className="custom-calendar" onChange={handleDateChange} value={selectedDate} />
      </div>

      <ModalCalendario
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onGuardar={agregarEvento}
        eventoSeleccionado={eventoSeleccionado !== null ? eventos[eventoSeleccionado] : null}
      />

      <h5 className="eventos-header">Eventos del Calendario</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Evento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento, index) => (
            <tr key={index}>
              <td>{evento.fecha.toLocaleDateString()}</td>
              <td>{evento.evento}</td>
              <td>
                <button onClick={() => handleEditarEvento(index)}>Editar</button>
                <button onClick={() => handleEliminarEvento(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendario;
