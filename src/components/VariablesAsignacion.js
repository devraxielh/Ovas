import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { AlertCircle, Check } from 'lucide-react';

const PythonVariablesAnimation = () => {
  const [step, setStep] = useState(0);
  const [variableName, setVariableName] = useState('');
  const [variableValue, setVariableValue] = useState('');
  const [isValidName, setIsValidName] = useState(true);

  const steps = [
    {
      title: "Variables en Python",
      content: "En Python, una variable es un nombre que se refiere a un valor almacenado en la memoria del ordenador.",
      code: "# Ejemplo de variables en Python\nnombre = 'Juan'\nedad = 25\naltura = 1.75",
    },
    {
      title: "Asignación de variables",
      content: "En Python, usamos el símbolo '=' para asignar valores a las variables.",
      code: "# Asignación de variables\nx = 10\ny = 'Hola'\nz = 3.14",
    },
    {
      title: "Reglas para nombrar variables",
      content: "1. Debe comenzar con una letra o guion bajo (_).\n2. Puede contener letras, números y guiones bajos.\n3. No puede contener espacios ni caracteres especiales.\n4. Python distingue entre mayúsculas y minúsculas.\n5. No puede ser una palabra reservada de Python.",
      code: "# Nombres válidos\nmi_variable = 5\n_variable = 'texto'\nVariable123 = True\n\n# Nombres inválidos\n2variable = 10  # No puede comenzar con número\nmi-variable = 20  # No puede contener guiones\nclass = 'Hola'  # No puede ser palabra reservada",
    },
    {
      title: "Práctica: Nombra una variable",
      content: "Intenta crear un nombre de variable válido en Python:",
      code: "# Escribe tu nombre de variable aquí\n{variableName} = ",
    },
    {
      title: "Práctica: Asigna un valor",
      content: "Ahora, asigna un valor a tu variable:",
      code: "# Asigna un valor a tu variable\n{variableName} = {variableValue}",
    },
  ];

  useEffect(() => {
    const isValid = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(variableName);
    setIsValidName(isValid);
  }, [variableName]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', bgcolor: 'background.default' }}>
      <Card sx={{ boxShadow: 'none' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {steps[step].title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {steps[step].content}
          </Typography>
          <Box component="pre" sx={{ bgcolor: 'grey.900', color: 'white', p: 2, borderRadius: 2, overflowX: 'auto', mb: 4 }}>
            <code>{steps[step].code.replace('{variableName}', variableName).replace('{variableValue}', variableValue)}</code>
          </Box>
          {step === 3 && (
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                label="Nombre de la variable"
                value={variableName}
                onChange={(e) => setVariableName(e.target.value)}
                error={!isValidName}
                helperText={!isValidName ? "Recuerda las reglas para nombrar variables en Python." : ""}
                variant="outlined"
              />
              {variableName && (
                <Alert severity={isValidName ? "success" : "error"} sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AlertCircle className="h-4 w-4" />
                    &nbsp;{isValidName ? "Nombre válido" : "Nombre inválido"}
                  </Typography>
                  <Typography variant="body2">
                    {isValidName
                      ? "¡Buen trabajo! Este es un nombre de variable válido en Python."
                      : "Recuerda las reglas para nombrar variables en Python."}
                  </Typography>
                </Alert>
              )}
            </Box>
          )}
          {step === 4 && (
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                label="Valor de la variable"
                value={variableValue}
                onChange={(e) => setVariableValue(e.target.value)}
                variant="outlined"
              />
              {variableValue && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Check className="h-4 w-4" />
                    &nbsp;Asignación correcta
                  </Typography>
                  <Typography variant="body2">
                    Has asignado el valor "{variableValue}" a la variable {variableName}.
                  </Typography>
                </Alert>
              )}
            </Box>
          )}
        </CardContent>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={handlePrev}
            disabled={step === 0}
            variant="contained"
            color="primary"
          >
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={step === steps.length - 1}
            variant="contained"
            color="primary"
          >
            Siguiente
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PythonVariablesAnimation;