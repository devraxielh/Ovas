import React, { useState, useEffect } from 'react';
import { ArrowForward } from '@mui/icons-material';
import { Box, TextField, Typography, Grid, Slider, Icon } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const NeuralNetwork = () => {
  const [weights, setWeights] = useState([0.5, 0.5, 0.5]);
  const [input, setInput] = useState([0, 0, 0]);
  const [output, setOutput] = useState(0);
  const [weightedSum, setWeightedSum] = useState(0);

  const updateWeight = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = parseFloat(value);
    setWeights(newWeights);
  };

  const updateInput = (index, value) => {
    const newInput = [...input];
    newInput[index] = parseInt(value);
    setInput(newInput);
  };

  useEffect(() => {
    const sum = input.reduce((acc, val, idx) => acc + val * weights[idx], 0);
    setWeightedSum(sum);
    setOutput(sum > 1 ? 1 : 0);
  }, [input, weights]);

  return (
    <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            {input.map((val, idx) => (
              <Box key={idx} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <TextField
                  type="number"
                  inputProps={{ min: 0, max: 1, step: 1 }}
                  value={val}
                  onChange={(e) => updateInput(idx, e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ width: '4rem', mr: 2 }}
                />
                <CircleIcon fontSize="large" color="primary" />
              </Box>
            ))}
          </Grid>
        </Grid>
        <ArrowForward fontSize="large" color="action" />
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <CircleIcon fontSize="large" color="success" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Salida: {output}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Pesos:
      </Typography>

      {/* Distribuir sliders en 3 columnas */}
      <Grid container spacing={2}>
        {weights.map((weight, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Typography gutterBottom>W{idx + 1}:</Typography>
            <Slider
              value={weight}
              onChange={(e, value) => updateWeight(idx, value)}
              aria-labelledby={`weight-slider-${idx}`}
              step={0.1}
              min={-1}
              max={1}
              valueLabelDisplay="auto"
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Explicación:
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Esta es una representación simplificada de una red neuronal con tres entradas y una salida.
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        1. Las entradas (0 o 1) se multiplican por sus respectivos pesos.
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        2. Se suman estos productos: {input.map((val, idx) => `${val} * ${weights[idx]}`).join(' + ')} = {weightedSum.toFixed(2)}
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        3. Si la suma es mayor que 1, la salida es 1; de lo contrario, es 0.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        4. En este caso: {weightedSum.toFixed(2)} {weightedSum > 1 ? '> 1, por lo tanto la salida es 1' : '≤ 1, por lo tanto la salida es 0'}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        Ajusta los valores de entrada (0 o 1) y los pesos para ver cómo cambia la salida.
      </Typography>
    </Box>
  );
};

export default NeuralNetwork;