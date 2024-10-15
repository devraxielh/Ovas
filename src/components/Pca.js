import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PCAExplanation = () => {
  const [data, setData] = useState([]);
  const [pcaData, setPcaData] = useState([]);
  const [angle, setAngle] = useState(0);
  const [numPoints, setNumPoints] = useState(50); // Nueva opción para controlar el número de puntos

  useEffect(() => {
    generateData(numPoints); // Generar datos según el número de puntos
  }, [numPoints]);

  useEffect(() => {
    applyPCA();
  }, [data, angle]);

  const generateData = (points) => {
    const newData = [];
    for (let i = 0; i < points; i++) {
      newData.push({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      });
    }
    setData(newData);
  };

  const applyPCA = () => {
    const radians = (angle * Math.PI) / 180;
    const newPcaData = data.map(point => ({
      x: point.x * Math.cos(radians) + point.y * Math.sin(radians),
      y: -point.x * Math.sin(radians) + point.y * Math.cos(radians),
    }));
    setPcaData(newPcaData);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <p className="mb-4 text-gray-700">
        Este gráfico muestra cómo el Análisis de Componentes Principales (PCA) transforma los datos. 
        Los puntos azules representan los datos originales, mientras que los puntos verdes muestran 
        los datos tras aplicar una rotación PCA. Usa el deslizador para ajustar el ángulo y observar 
        cómo los datos cambian.
      </p>

      <div className="mb-4">
        <label htmlFor="angleSlider" className="block mb-2 font-medium">Ángulo de rotación: {angle}°</label>
        <input
          type="range"
          id="angleSlider"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="numPointsSlider" className="block mb-2 font-medium">Número de puntos: {numPoints}</label>
        <input
          type="range"
          id="numPointsSlider"
          min="10"
          max="100"
          value={numPoints}
          onChange={(e) => setNumPoints(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="X" unit="" />
          <YAxis type="number" dataKey="y" name="Y" unit="" />
          <ZAxis range={[64, 144]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Datos originales" data={data} fill="#8884d8" />
          <Scatter name="Datos PCA" data={pcaData} fill="#82ca9d" />
        </ScatterChart>
      </ResponsiveContainer>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => generateData(numPoints)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generar nuevos datos
        </button>
        <button
          onClick={() => setAngle(0)} // Opción para reiniciar el ángulo
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reiniciar ángulo
        </button>
      </div>
    </div>
  );
};

export default PCAExplanation;