import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Facturas from './views/facturas';
import Home from './components/home'; // Suponiendo que tengas un componente Home

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta para la página principal */}
        <Route path="/facturas" element={<Facturas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
