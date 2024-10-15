import React, { useState, useEffect, useRef } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const KNNAnimation = () => {
  const [points, setPoints] = useState([]);
  const [newPoint, setNewPoint] = useState(null);
  const [k, setK] = useState(3);
  const [neighbors, setNeighbors] = useState([]);
  const [predictedClass, setPredictedClass] = useState(null);
  const [manualX, setManualX] = useState('');
  const [manualY, setManualY] = useState('');
  const [explanation, setExplanation] = useState('');
  const canvasRef = useRef(null);

  const colors = ['red', 'blue'];

  const generatePoints = () => {
    const newPoints = Array.from({ length: 20 }, () => ({
      x: Math.random() * 400,
      y: Math.random() * 400,
      class: Math.random() > 0.5 ? 0 : 1,
    }));
    setPoints(newPoints);
    setNewPoint(null);
    setNeighbors([]);
    setPredictedClass(null);
    setExplanation('');
  };

  useEffect(() => {
    generatePoints();
  }, []);

  useEffect(() => {
    drawCanvas(points, newPoint, neighbors);
  }, [points, newPoint, neighbors]);

  const drawCanvas = (points, newPoint = null, neighbors = []) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach((point) => {
      ctx.fillStyle = colors[point.class];
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    if (newPoint) {
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(newPoint.x, newPoint.y, 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }

    neighbors.forEach((neighbor, i) => {
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(neighbor.x, neighbor.y, 10, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.fillStyle = 'black';
      ctx.font = '12px Arial';
      ctx.fillText(`${i + 1}`, neighbor.x + 15, neighbor.y + 15);
    });
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    classifyPoint(x, y);
  };

  const classifyPoint = (x, y) => {
    setNewPoint({ x, y });
    const newNeighbors = findNeighbors({ x, y });
    setNeighbors(newNeighbors);
    const classified = classifyNewPoint(newNeighbors);
    setPredictedClass(classified);

    const explanation = generateExplanation(newNeighbors, classified);
    setExplanation(explanation);
  };

  const findNeighbors = (point) => {
    return points
      .map((p) => ({
        ...p,
        distance: Math.sqrt((p.x - point.x) ** 2 + (p.y - point.y) ** 2),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, k);
  };

  const classifyNewPoint = (neighbors) => {
    const classCounts = neighbors.reduce((acc, neighbor) => {
      acc[neighbor.class] = (acc[neighbor.class] || 0) + 1;
      return acc;
    }, {});

    return Number(Object.keys(classCounts).reduce((a, b) =>
      classCounts[a] > classCounts[b] ? a : b
    ));
  };

  const generateExplanation = (neighbors, predictedClass) => {
    const counts = neighbors.reduce((acc, n) => {
      acc[n.class] = (acc[n.class] || 0) + 1;
      return acc;
    }, {});

    return `El nuevo punto fue clasificado como ${colors[predictedClass]}.\n
    De los ${k} vecinos más cercanos:
    ${counts[0] || 0} son de clase roja
    ${counts[1] || 0} son de clase azul
    La clase mayoritaria es ${colors[predictedClass]}, por lo tanto, esa es la clasificación asignada.`;
  };

  const handleManualClassification = () => {
    const x = parseFloat(manualX);
    const y = parseFloat(manualY);
    if (!isNaN(x) && !isNaN(y)) {
      classifyPoint(x, y);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onClick={handleCanvasClick}
        className="border border-gray-300"
      />
      <div className="flex items-center space-x-2">
        <label htmlFor="k-value" className="font-medium">K:</label>
        <Input
          id="k-value"
          type="number"
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
          min={1}
          max={20}
          className="w-16"
        />
        <Button onClick={generatePoints}>Generar Nuevos Datos</Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          placeholder="X"
          value={manualX}
          onChange={(e) => setManualX(e.target.value)}
          className="w-20"
        />
        <Input
          type="number"
          placeholder="Y"
          value={manualY}
          onChange={(e) => setManualY(e.target.value)}
          className="w-20"
        />
        <Button onClick={handleManualClassification}>Clasificar</Button>
      </div>
      {newPoint && (
        <div className="text-lg font-semibold">
          Clase predicha: {colors[predictedClass]}
        </div>
      )}
      {explanation && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold mb-2">Explicación:</h3>
          <pre className="whitespace-pre-wrap">{explanation}</pre>
        </div>
      )}
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cómo usar la animación KNN</AlertDialogTitle>
            <AlertDialogDescription>
              1. Haz clic en "Generar Nuevos Datos" para crear un nuevo conjunto de puntos.
              2. Haz clic en el lienzo para agregar un nuevo punto o usa el formulario para introducir coordenadas.
              3. Los K vecinos más cercanos se resaltarán en amarillo.
              4. Ajusta el valor de K para ver cómo cambia la clasificación.
              5. La clase predicha y una explicación se mostrarán debajo del lienzo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Entendido</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default KNNAnimation;
