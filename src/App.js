import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import regresion_lineal_interactiva from './components/regresion_lineal_interactiva';
import RegresionLineal from './components/RegresionLineal';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/RegresionLineal" element={<RegresionLineal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;