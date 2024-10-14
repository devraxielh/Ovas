import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import RegresionLineal from './components/RegresionLineal';
import Home from './components/Home';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/regresionlineal" element={<RegresionLineal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;