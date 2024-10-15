import React, { useState, useEffect, useCallback } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const KMeansClustering = () => {
  const [points, setPoints] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [k, setK] = useState(3);
  const [iterations, setIterations] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'magenta', 'lime'];

  useEffect(() => {
    initializePoints();
    initializeCentroids();
  }, [k]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        runIteration();
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, points, centroids]);

  const initializePoints = () => {
    const newPoints = Array.from({ length: 50 }, () => ({
      x: Math.random() * 400,
      y: Math.random() * 400,
      cluster: null,
    }));
    setPoints(newPoints);
  };

  const initializeCentroids = () => {
    const newCentroids = Array.from({ length: k }, () => ({
      x: Math.random() * 400,
      y: Math.random() * 400,
    }));
    setCentroids(newCentroids);
  };

  const assignPointsToClusters = useCallback(() => {
    return points.map((point) => {
      const distances = centroids.map((centroid, index) => ({
        index,
        distance: Math.sqrt(
          Math.pow(centroid.x - point.x, 2) + Math.pow(centroid.y - point.y, 2)
        ),
      }));
      const closestCentroid = distances.reduce((min, current) =>
        current.distance < min.distance ? current : min
      );
      return { ...point, cluster: closestCentroid.index };
    });
  }, [points, centroids]);

  const updateCentroids = useCallback(() => {
    return centroids.map((_, index) => {
      const clusterPoints = points.filter((point) => point.cluster === index);
      if (clusterPoints.length === 0) return centroids[index];
      const sumX = clusterPoints.reduce((sum, point) => sum + point.x, 0);
      const sumY = clusterPoints.reduce((sum, point) => sum + point.y, 0);
      return {
        x: sumX / clusterPoints.length,
        y: sumY / clusterPoints.length,
      };
    });
  }, [points, centroids]);

  const runIteration = useCallback(() => {
    const newPoints = assignPointsToClusters();
    const newCentroids = updateCentroids();
    setPoints(newPoints);
    setCentroids(newCentroids);
    setIterations((prev) => prev + 1);
  }, [assignPointsToClusters, updateCentroids]);

  const resetClustering = () => {
    initializePoints();
    initializeCentroids();
    setIterations(0);
    setIsRunning(false);
  };

  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  const handleKChange = (event) => {
    const newK = parseInt(event.target.value, 10);
    if (newK > 0 && newK <= 10) {
      setK(newK);
      resetClustering();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        <Typography variant="body1">Número de clusters (K):</Typography>
        <TextField
          type="number"
          variant="outlined"
          value={k}
          onChange={handleKChange}
          inputProps={{ min: 1, max: 10, style: { textAlign: 'center' } }}
          size="small"
          sx={{ width: '80px' }}
        />
      </Box>

      <Box sx={{ border: '1px solid #bdbdbd', borderRadius: '8px', marginTop: '16px' }}>
        <svg
          width="100%" // El ancho será 100% del contenedor
          height="400" // Puedes ajustar la altura como necesites
          viewBox="0 0 400 400" // Ajusta el viewBox para que se escale correctamente
        >
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={point.cluster !== null ? colors[point.cluster % colors.length] : 'gray'}
            />
          ))}
          {centroids.map((centroid, index) => (
            <circle
              key={`centroid-${index}`}
              cx={centroid.x}
              cy={centroid.y}
              r="10"
              fill={colors[index % colors.length]}
              stroke="black"
              strokeWidth="2"
            />
          ))}
        </svg>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={toggleRunning}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={resetClustering}>
          Reiniciar
        </Button>
      </Box>

      <Typography variant="body1" align="center" marginTop={2}>
        Iteraciones: {iterations}
      </Typography>

    </Container>
  );
};

export default KMeansClustering;