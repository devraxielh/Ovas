import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import RegresionLineal from './components/RegresionLineal';
import Knn from './components/Knn';
import Tree from './components/Tree';
import Kmeans from './components/Kmeans';
import Pca from './components/Pca';
import Crossvalidation from './components/Crossvalidation';
import EvaluationRegresion from './components/EvaluationRegresion';
import Home from './components/Home';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/regresionlineal" element={<RegresionLineal />} />
          <Route path="/knn" element={<Knn />} />
          <Route path="/tree" element={<Tree />} />
          <Route path="/kmeans" element={<Kmeans />} />
          <Route path="/pca" element={<Pca />} />
          <Route path="/crossvalidation" element={<Crossvalidation />} />
          <Route path="/evaluationregresion" element={<EvaluationRegresion />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;