import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Slider, Typography, Box, Grid, Card, CardContent, CardHeader } from '@mui/material';

const ModelEvaluationMetrics = () => {
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(0);

  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 5 },
  ];

  const predictedData = data.map(point => ({
    ...point,
    yPred: slope * point.x + intercept
  }));

  const calculateMetrics = () => {
    const n = data.length;
    let sumErrors = 0;
    let sumErrorsSquared = 0;
    let sumY = 0;
    let sumYSquared = 0;

    data.forEach((point, i) => {
      const error = point.y - predictedData[i].yPred;
      sumErrors += Math.abs(error);
      sumErrorsSquared += error * error;
      sumY += point.y;
      sumYSquared += point.y * point.y;
    });

    const mae = sumErrors / n;
    const mse = sumErrorsSquared / n;
    const rmse = Math.sqrt(mse);

    const yMean = sumY / n;
    const totalSS = sumYSquared - n * yMean * yMean;
    const residualSS = sumErrorsSquared;
    const r2 = 1 - (residualSS / totalSS);

    return { mae, mse, rmse, r2 };
  };

  const metrics = calculateMetrics();

  return (
    <Box sx={{ padding: 0 }}>
      <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>Pendiente: {slope.toFixed(2)}</Typography>
          <Slider
            value={slope}
            onChange={(event, value) => setSlope(value)}
            max={3}
            min={-1}
            step={0.1}
            aria-labelledby="slope-slider"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>Intercepto: {intercept.toFixed(2)}</Typography>
          <Slider
            value={intercept}
            onChange={(event, value) => setIntercept(value)}
            max={5}
            min={-5}
            step={0.1}
            aria-labelledby="intercept-slider"
          />
        </Grid>
      </Grid>

      {/* Centrar el gráfico */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <LineChart width={500} height={300} data={predictedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" name="Datos reales" />
          <Line type="monotone" dataKey="yPred" stroke="#82ca9d" name="Predicción" />
        </LineChart>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader title="MAE" subheader="Error Absoluto Medio" />
            <CardContent>
              <Typography variant="h5">{metrics.mae.toFixed(4)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader title="MSE" subheader="Error Cuadrático Medio" />
            <CardContent>
              <Typography variant="h5">{metrics.mse.toFixed(4)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader title="RMSE" subheader="Raíz del Error Cuadrático Medio" />
            <CardContent>
              <Typography variant="h5">{metrics.rmse.toFixed(4)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader title="R²" subheader="Coeficiente de Determinación" />
            <CardContent>
              <Typography variant="h5">{metrics.r2.toFixed(4)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModelEvaluationMetrics;