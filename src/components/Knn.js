import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';

const KNNAnimation = () => {
  const [points, setPoints] = useState([]);
  const [newPoint, setNewPoint] = useState(null);
  const [k, setK] = useState(3);
  const [neighbors, setNeighbors] = useState([]);
  const [predictedClass, setPredictedClass] = useState(null);
  const [manualX, setManualX] = useState('');
  const [manualY, setManualY] = useState('');
  const [explanation, setExplanation] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
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

    return `El punto es clasificado como ${colors[predictedClass]}. De los ${k} vecinos más cercanos:
    ${counts[0] || 0} son de clase roja, ${counts[1] || 0} son de clase azul`;
  };

  const handleManualClassification = () => {
    const x = parseFloat(manualX);
    const y = parseFloat(manualY);
    if (!isNaN(x) && !isNaN(y)) {
      classifyPoint(x, y);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '1vh' }}>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onClick={handleCanvasClick}
        style={{ border: '1px solid #ccc' }}
      />
      <div className="flex items-center space-x-2" style={{ marginTop: '16px' }}>
        <TextField
          label="K"
          type="number"
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
          inputProps={{ min: 1, max: 20 }}
          size="small"
        />
        <Button variant="contained" onClick={generatePoints}>
          Generar Nuevos Datos
        </Button>
      </div>
      {explanation ? (
        <div style={{ marginTop: '1px', width: '90%', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px', textAlign: 'center' }}>
          <Typography component="pre">
            {explanation}
          </Typography>
        </div>
      ) : (
        <div style={{ marginTop: '1px', width: '90%', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px', textAlign: 'center' }}>
          <Typography component="p">
            Presiona en el canvas para clasificar un nuevo punto
          </Typography>
        </div>
      )}
    </div>
  );
};

export default KNNAnimation;