import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button, Typography, Box, Slider } from '@mui/material';

const RegresionLinealInteractiva = () => {
  const [datos, setDatos] = useState([]);
  const [pendiente, setPendiente] = useState(1);
  const [intercepto, setIntercepto] = useState(0);

  useEffect(() => {
    generarDatos();
  }, []);

  const generarDatos = () => {
    const nuevosDatos = [{ x: 0, y: 0 }]; // Aseguramos que el primer punto sea (0,0)
    for (let i = 1; i < 20; i++) {
      const x = i + Math.random() * 2 - 1; // Valores de x entre i-1 e i+1
      const y = 2 * x + Math.random() * 4 - 2; // Valores de y alrededor de y = 2x con algo de dispersión
      nuevosDatos.push({ x, y });
    }
    setDatos(nuevosDatos);
  };

  const calcularRegresion = () => {
    const n = datos.length;
    const sumX = datos.reduce((sum, point) => sum + point.x, 0);
    const sumY = datos.reduce((sum, point) => sum + point.y, 0);
    const sumXY = datos.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumX2 = datos.reduce((sum, point) => sum + point.x * point.x, 0);

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    setPendiente(m);
    setIntercepto(b);
  };

  const lineaRegresion = [
    { x: 0, y: intercepto },
    { x: 20, y: pendiente * 20 + intercepto },
  ];

  return (
    <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Regresión Lineal Interactiva
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={generarDatos}>
          Generar Nuevos Datos
        </Button>
        <Button variant="contained" color="secondary" onClick={calcularRegresion}>
          Calcular Regresión
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1">Pendiente: {pendiente.toFixed(2)}</Typography>
        <Slider
          value={pendiente}
          onChange={(event, newValue) => setPendiente(newValue)}
          min={0}
          max={5}
          step={0.1}
          valueLabelDisplay="auto"
          aria-labelledby="slider-pendiente"
        />
        <Typography variant="body1">Intercepto: {intercepto.toFixed(2)}</Typography>
        <Slider
          value={intercepto}
          onChange={(event, newValue) => setIntercepto(newValue)}
          min={-5}
          max={5}
          step={0.1}
          valueLabelDisplay="auto"
          aria-labelledby="slider-intercepto"
        />
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            name="X"
            domain={[0, 'dataMax']}
            tickFormatter={(tick) => tick.toFixed(2)}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Y"
            domain={[0, 'dataMax']}
            tickFormatter={(tick) => tick.toFixed(2)}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Datos" data={datos} fill="#8884d8" />
          <Scatter name="Línea de Regresión" data={lineaRegresion} line={{ stroke: '#ff7300' }} />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RegresionLinealInteractiva;