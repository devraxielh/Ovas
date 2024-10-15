import React, { useState, useEffect, useCallback } from 'react';
import { IconButton, Slider, Typography, Box, Paper, Grid, CircularProgress } from '@mui/material';
import { PlayArrow, Pause, Replay } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const NeuralNetworkAnimation = () => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState(0.9);
  const [weights, setWeights] = useState([0.1, 0.1]);
  const [bias, setBias] = useState(-0.1);
  const [output, setOutput] = useState(0);
  const [error, setError] = useState(0);
  const [target, setTarget] = useState(0.1);
  const [history, setHistory] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [iterationCount, setIterationCount] = useState(0);

  const sigmoid = (x) => 1 / (1 + Math.exp(-x));

  const forwardPropagation = useCallback(() => {
    const weightedSum = input * weights[0] + weights[1] + bias;
    const newOutput = sigmoid(weightedSum);
    setOutput(newOutput);
    const newError = target - newOutput;
    setError(newError);
    return { newOutput, newError };
  }, [input, weights, bias, target]);

  const backPropagation = useCallback(() => {
    const learningRate = 0.1;
    const newWeights = weights.map((w, i) =>
      w + learningRate * error * (i === 0 ? input : 1)
    );
    const newBias = bias + learningRate * error;
    setWeights(newWeights);
    setBias(newBias);
    return { newWeights, newBias };
  }, [weights, bias, error, input]);

  useEffect(() => {
    const { newOutput, newError } = forwardPropagation();
    setHistory((prev) => [
      ...prev,
      { iteration: iterationCount, input, output: newOutput, error: newError },
    ].slice(-50));
  }, [input, weights, bias, target, forwardPropagation, iterationCount]);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setStep((prevStep) => (prevStep + 1) % 3);
        if (step === 2) {
          const { newWeights, newBias } = backPropagation();
          setInput(Math.random());
          forwardPropagation();
          setIterationCount((prev) => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, step, backPropagation, forwardPropagation]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
    setInput(0.9);
    setWeights([0.1, 0.1]);
    setBias(-0.1);
    setTarget(0.1);
    setHistory([]);
    setIterationCount(0);
    forwardPropagation();
  };

  return (
    <Paper elevation={0} sx={{ margin: 'auto', maxWidth: '800px' }}>
      <Box display="flex" justifyContent="center" mb={4}>
        <IconButton onClick={handlePlayPause} color={isPlaying ? 'secondary' : 'primary'}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={handleReset} color="default">
          <Replay />
        </IconButton>
      </Box>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={3}>
          <Typography gutterBottom>Entrada: {input.toFixed(2)}</Typography>
          <Slider
            value={input}
            onChange={(e, value) => setInput(value)}
            min={0}
            max={1}
            step={0.01}
            disabled={isPlaying}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography gutterBottom>Peso 1: {weights[0].toFixed(2)}</Typography>
          <Slider
            value={weights[0]}
            onChange={(e, value) => setWeights([value, weights[1]])}
            min={-1}
            max={1}
            step={0.01}
            disabled={isPlaying}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography gutterBottom>Peso 2: {weights[1].toFixed(2)}</Typography>
          <Slider
            value={weights[1]}
            onChange={(e, value) => setWeights([weights[0], value])}
            min={-1}
            max={1}
            step={0.01}
            disabled={isPlaying}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography gutterBottom>Sesgo: {bias.toFixed(2)}</Typography>
          <Slider
            value={bias}
            onChange={(e, value) => setBias(value)}
            min={-1}
            max={1}
            step={0.01}
            disabled={isPlaying}
          />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Box position="relative" display="inline-flex" flexDirection="column" alignItems="center">
          <Typography variant="body2" gutterBottom>Entrada</Typography>
          <CircularProgress variant="determinate" value={input * 100} size={80} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div" color="textSecondary">
              {`${Math.round(input * 100)}`}
            </Typography>
          </Box>
        </Box>

        <Box position="relative" display="inline-flex" flexDirection="column" alignItems="center" ml={4} mr={4}>
          <Typography variant="body2" gutterBottom>Salida</Typography>
          <CircularProgress variant="determinate" value={output * 100} size={80} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div" color="textSecondary">
              {`${Math.round(output * 100)}`}
            </Typography>
          </Box>
        </Box>

        <Box position="relative" display="inline-flex" flexDirection="column" alignItems="center">
          <Typography variant="body2" gutterBottom>Objetivo</Typography>
          <CircularProgress variant="determinate" value={target * 100} size={80} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div" color="textSecondary">
              {`${Math.round(target * 100)}`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="body1" align="center">
        Error: {error.toFixed(4)}
      </Typography>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Historial de Entrenamiento
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <XAxis dataKey="iteration" />
            <YAxis domain={[-1, 1]} />
            <Tooltip />
            <Line type="monotone" dataKey="output" stroke="#8884d8" name="Salida" />
            <Line type="monotone" dataKey="error" stroke="#82ca9d" name="Error" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default NeuralNetworkAnimation;