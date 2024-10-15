import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Slider, Button, Typography, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PCAExplanation = () => {
  const [data, setData] = useState([]);
  const [pcaData, setPcaData] = useState([]);
  const [angle, setAngle] = useState(0);
  const [numPoints, setNumPoints] = useState(50);

  useEffect(() => {
    generateData(numPoints);
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
    <Card sx={{ padding: 2 }}>
      <CardContent>
        
        <Typography variant="body1" gutterBottom>
          Este gráfico muestra cómo el Análisis de Componentes Principales (PCA) transforma los datos. 
          Los puntos azules representan los datos originales, mientras que los puntos verdes muestran 
          los datos tras aplicar una rotación PCA. Usa los controles para ajustar el ángulo y el número de puntos.
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2">¿Qué es PCA?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              El Análisis de Componentes Principales (PCA) es una técnica estadística que se utiliza para reducir 
              la dimensionalidad de los datos al transformarlos en un nuevo sistema de coordenadas. Este sistema 
              está orientado de tal manera que las nuevas coordenadas (componentes principales) maximizan la 
              varianza en los datos. Esto permite visualizar los datos de forma simplificada y encontrar patrones 
              más fácilmente.
            </Typography>
            <Typography variant="body2" gutterBottom>
              En este ejemplo, el gráfico visualiza los puntos originales y sus versiones transformadas, aplicando 
              una rotación que simula lo que hace el PCA. Cambiando el ángulo, puedes ver cómo los datos son 
              proyectados en nuevas direcciones.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Typography gutterBottom>Ángulo de rotación: {angle}°</Typography>
        <Slider
          value={angle}
          onChange={(e, newValue) => setAngle(newValue)}
          aria-labelledby="angle-slider"
          min={0}
          max={360}
          sx={{ marginBottom: 2 }}
        />

        <Typography gutterBottom>Número de puntos: {numPoints}</Typography>
        <Slider
          value={numPoints}
          onChange={(e, newValue) => setNumPoints(newValue)}
          aria-labelledby="numPoints-slider"
          min={10}
          max={100}
          sx={{ marginBottom: 2 }}
        />

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

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Button variant="contained" color="primary" onClick={() => generateData(numPoints)}>
            Generar nuevos datos
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setAngle(0)}>
            Reiniciar ángulo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PCAExplanation;