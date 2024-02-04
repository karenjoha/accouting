import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Facturas from './views/facturas';
import Calendario from './views/calendario';
import Home from './components/home'; // Suponiendo que tengas un componente Home

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
