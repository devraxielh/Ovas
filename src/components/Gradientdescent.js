import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Scatter } from 'recharts';
import { Button, Slider, Box, Typography, Container, Card, CardContent } from '@mui/material';

const GradientDescentAnimation = () => {
  const [position, setPosition] = useState(4); // Posición inicial de la pelota
  const [learningRate, setLearningRate] = useState(0.1); // Tasa de aprendizaje
  const [isRunning, setIsRunning] = useState(false); // Control de pausa/ejecución
  const [data, setData] = useState([]); // Datos para la gráfica de la trayectoria de la pelota

  // Función de costo
  const costFunction = (x) => (x - 2) ** 2 + 1;
  // Gradiente de la función de costo
  const gradient = (x) => 2 * (x - 2);

  // Función para actualizar la posición de la pelota
  const updatePosition = () => {
    if (isRunning) {
      const newPosition = position - learningRate * gradient(position); // Actualizar la posición
      setPosition(newPosition);
      updateData(newPosition);
    }
  };

  // Actualizar datos para el gráfico
  const updateData = (newPosition) => {
    setData((prevData) => {
      const newData = [...prevData, { x: newPosition, y: costFunction(newPosition) }];
      return newData.slice(-50); // Mantener solo los últimos 50 puntos
    });
  };

  useEffect(() => {
    const interval = setInterval(updatePosition, 300); // Intervalo para simular movimiento de la pelota
    return () => clearInterval(interval);
  }, [position, learningRate, isRunning]);

  // Reiniciar la simulación
  const handleReset = () => {
    setPosition(4);
    setIsRunning(false);
    setData([]);
  };

  // Puntos de la curva de la función de costo
  const curvePoints = Array.from({ length: 100 }, (_, i) => {
    const x = i / 20;
    return { x, y: costFunction(x) };
  });

  return (
    <Container maxWidth="sm">
      <Card elevation={0}>
        <CardContent>
          <Box sx={{ height: 300, marginBottom: 4 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                {/* Curva de la función de costo */}
                <Line type="monotone" dataKey="y" data={curvePoints} stroke="#8884d8" strokeWidth={4} dot={false} />
                {/* Línea que sigue la pelota en el descenso */}
                <Line type="monotone" dataKey="y" data={data} stroke="#ff0000" strokeWidth={4} dot={false} />
                {/* Agregar un punto como "pelota" en el punto actual del descenso */}
                <Scatter data={[{ x: position, y: costFunction(position) }]} fill="red" />
                <XAxis dataKey="x" domain={[0, 5]} type="number" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          {/* Slider para controlar la tasa de aprendizaje */}
          <Typography variant="body1">Tasa de aprendizaje: {learningRate}</Typography>
          <Slider
            value={learningRate}
            min={0.01}
            max={0.5}
            step={0.01}
            onChange={(e, newValue) => setLearningRate(newValue)}
            aria-labelledby="learning-rate-slider"
            valueLabelDisplay="auto"
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? 'Pausar' : 'Iniciar'}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reiniciar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default GradientDescentAnimation;