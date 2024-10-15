import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MetricasClasificacion = () => {
  const [vp, setVP] = useState(80);
  const [fp, setFP] = useState(20);
  const [fn, setFN] = useState(10);
  const [vn, setVN] = useState(90);

  const [precision, setPrecision] = useState(0);
  const [recall, setRecall] = useState(0);
  const [f1Score, setF1Score] = useState(0);

  useEffect(() => {
    const calcularMetricas = () => {
      const nuevaPrecision = vp / (vp + fp);
      const nuevoRecall = vp / (vp + fn);
      const nuevoF1Score = 2 * ((nuevaPrecision * nuevoRecall) / (nuevaPrecision + nuevoRecall));

      setPrecision(nuevaPrecision);
      setRecall(nuevoRecall);
      setF1Score(nuevoF1Score);
    };

    calcularMetricas();
  }, [vp, fp, fn, vn]);

  const data = [
    { name: 'Precisión', valor: precision },
    { name: 'Recall', valor: recall },
    { name: 'F1-Score', valor: f1Score },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Métricas de Clasificación Interactivas</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Matriz de Confusión</h2>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2 font-semibold">Predicho Positivo</td>
                <td className="border border-gray-300 p-2 font-semibold">Predicho Negativo</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Real Positivo</td>
                <td className="border border-gray-300 p-2">
                  <input 
                    type="number" 
                    value={vp} 
                    onChange={(e) => setVP(parseInt(e.target.value))}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input 
                    type="number" 
                    value={fn} 
                    onChange={(e) => setFN(parseInt(e.target.value))}
                    className="w-full p-1 border rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Real Negativo</td>
                <td className="border border-gray-300 p-2">
                  <input 
                    type="number" 
                    value={fp} 
                    onChange={(e) => setFP(parseInt(e.target.value))}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input 
                    type="number" 
                    value={vn} 
                    onChange={(e) => setVN(parseInt(e.target.value))}
                    className="w-full p-1 border rounded"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Métricas Calculadas</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="valor" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Explicaciones</h2>
        <ul className="list-disc pl-5">
          <li><strong>Precisión:</strong> La proporción de verdaderos positivos sobre el total de predicciones positivas. Fórmula: VP / (VP + FP)</li>
          <li><strong>Recall (Sensibilidad):</strong> La proporción de verdaderos positivos sobre el total de positivos reales. Fórmula: VP / (VP + FN)</li>
          <li><strong>F1-Score:</strong> La media armónica de la precisión y el recall. Fórmula: 2 * ((Precisión * Recall) / (Precisión + Recall))</li>
          <li><strong>Matriz de Confusión:</strong> Tabla que muestra los verdaderos positivos (VP), falsos positivos (FP), verdaderos negativos (VN) y falsos negativos (FN).</li>
        </ul>
      </div>
    </div>
  );
};

export default MetricasClasificacion;
