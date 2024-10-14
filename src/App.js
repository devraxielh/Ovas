import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegresionLineal from './components/RegresionLineal';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/regresionlineal" element={<RegresionLineal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;