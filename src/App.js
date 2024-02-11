import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Facturas from './views/facturas';
import Calendario from './views/calendario';
import Home from './components/home';
import Modal from 'react-modal'; // Corregir la importación aquí

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/calendario" element={<Calendario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
