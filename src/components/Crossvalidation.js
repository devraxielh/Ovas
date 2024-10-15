import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid, Card, CardContent, Box } from '@mui/material';

const CrossValidationAnimation = () => {
  const [step, setStep] = useState(0);
  const [fold, setFold] = useState(0);
  const [k, setK] = useState(5);
  const [dataPoints, setDataPoints] = useState(20);
  
  const colors = ['#2196f3', '#4caf50', '#f44336', '#ffeb3b', '#9c27b0', '#e91e63', '#3f51b5', '#ff9800', '#009688', '#00bcd4'];

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        if (fold < k - 1) {
          setFold(fold + 1);
        } else {
          setStep(3);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, fold, k]);

  const renderDataPoints = () => {
    return Array(dataPoints).fill().map((_, i) => (
      <Box
        key={i}
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          backgroundColor: step >= 1 && Math.floor(i / (dataPoints / k)) === fold ? colors[fold % colors.length] : '#e0e0e0',
          color: '#fff',
        }}
      >
        {i + 1}
      </Box>
    ));
  };

  const stepDescriptions = [
    "Inicialmente, tenemos nuestro conjunto de datos completo.",
    `Dividimos los datos en ${k} subconjuntos (folds) iguales.`,
    `Iteramos a través de cada fold, usándolo como conjunto de prueba mientras los demás son el conjunto de entrenamiento.`,
    "Finalmente, promediamos los resultados de todas las iteraciones para obtener una estimación más robusta del rendimiento del modelo."
  ];

  const handleKChange = (event) => {
    const newK = parseInt(event.target.value);
    if (newK > 0 && newK <= 10) {
      setK(newK);
      setStep(0);
      setFold(0);
    }
  };

  const handleDataPointsChange = (event) => {
    const newDataPoints = parseInt(event.target.value);
    if (newDataPoints > 0 && newDataPoints <= 50) {
      setDataPoints(newDataPoints);
      setStep(0);
      setFold(0);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', p: 4 }} elevation={0}>
      <CardContent>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={6}>
            <TextField
              label="Valor de k"
              type="number"
              variant="outlined"
              value={k}
              onChange={handleKChange}
              fullWidth
              inputProps={{ min: 2, max: 10 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Puntos de datos"
              type="number"
              variant="outlined"
              value={dataPoints}
              onChange={handleDataPointsChange}
              fullWidth
              inputProps={{ min: 10, max: 50 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          {renderDataPoints()}
        </Grid>

        <Typography variant="body1" align="center" gutterBottom>
          {stepDescriptions[step]}
        </Typography>

        <Box textAlign="center" sx={{ mt: 4 }}>
          {step < 3 ? (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setStep(step + 1)}
              size="large"
            >
              {step === 0 ? "Iniciar" : "Siguiente Paso"}
            </Button>
          ) : (
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => {setStep(0); setFold(0);}}
              size="large"
            >
              Reiniciar
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CrossValidationAnimation;