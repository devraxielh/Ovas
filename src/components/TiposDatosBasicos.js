import React, { useState } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Box } from '@mui/material';

const TiposDeDatos = () => {
  const [tipoActual, setTipoActual] = useState('entero');
  const [valor, setValor] = useState(42);

  const tipos = {
    entero: {
      nombre: 'Entero',
      descripcion: 'Números enteros sin parte decimal',
      ejemplos: [42, -7, 0, 1000],
      color: 'primary.main',
      explicacionDetallada: `Los enteros son números sin parte decimal. Pueden ser positivos, negativos o cero. Se utilizan para contar objetos, representar índices en listas o arrays, y en muchas operaciones matemáticas. En la mayoría de los lenguajes de programación, tienen un rango limitado determinado por la cantidad de bits usados para almacenarlos.

Ejemplos de uso:
- Contar elementos: 'Tengo 3 manzanas'
- Índices de arrays: 'El elemento en la posición 2'
- Años: '2024'`
    },
    decimal: {
      nombre: 'Decimal',
      descripcion: 'Números con parte decimal',
      ejemplos: [3.14, -0.5, 2.0, 1.414],
      color: 'secondary.main',
      explicacionDetallada: `Los números decimales, también conocidos como números de punto flotante, representan valores con una parte fraccionaria. Se usan para cálculos que requieren precisión más allá de los números enteros. Sin embargo, debido a cómo se almacenan en la computadora, pueden tener pequeños errores de redondeo en cálculos muy precisos.

Ejemplos de uso:
- Mediciones precisas: '3.14159 (pi)'
- Cálculos financieros: '19.99 (precio)'
- Cálculos científicos: '9.8 m/s² (gravedad)'`
    },
    cadena: {
      nombre: 'Cadena de texto',
      descripcion: 'Secuencia de caracteres',
      ejemplos: ['Hola', 'Python', '123', 'a'],
      color: 'warning.main',
      explicacionDetallada: `Las cadenas de texto son secuencias de caracteres. Pueden contener letras, números, símbolos y espacios. Se utilizan para representar texto en programación. Las cadenas suelen estar delimitadas por comillas simples o dobles.

Ejemplos de uso:
- Nombres: 'Juan Pérez'
- Mensajes: 'Hola, ¿cómo estás?'
- Códigos: 'ABC123'
- Almacenar datos: 'juan@email.com'`
    },
    booleano: {
      nombre: 'Booleano',
      descripcion: 'Valor lógico verdadero o falso',
      ejemplos: [true, false],
      color: 'error.main',
      explicacionDetallada: `Los booleanos representan valores de verdad lógica. Solo tienen dos posibles valores: verdadero (true) o falso (false). Se utilizan en estructuras de control de flujo, como condicionales y bucles, y en operaciones lógicas.

Ejemplos de uso:
- Estados: 'estaEncendido = true'
- Condiciones: 'if (esMayorDeEdad)'
- Flags: 'haCompletadoTarea = false'
- Comparaciones: '5 > 3 (resulta en true)'`
    }
  };

  const cambiarTipo = (nuevoTipo) => {
    setTipoActual(nuevoTipo);
    setValor(tipos[nuevoTipo].ejemplos[0]);
  };

  const cambiarValor = () => {
    const ejemplos = tipos[tipoActual].ejemplos;
    const indiceActual = ejemplos.indexOf(valor);
    const nuevoIndice = (indiceActual + 1) % ejemplos.length;
    setValor(ejemplos[nuevoIndice]);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Card sx={{ boxShadow: 'none' }}>
        <CardContent sx={{ bgcolor: tipos[tipoActual].color, color: 'white', p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            {tipos[tipoActual].nombre}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {tipos[tipoActual].descripcion}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {String(valor)}
          </Typography>
          <Button onClick={cambiarValor} variant="contained" fullWidth sx={{ mt: 2 }}>
            Cambiar Valor
          </Button>
        </CardContent>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Explicación Detallada:
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {tipos[tipoActual].explicacionDetallada}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
          {Object.keys(tipos).map((tipo) => (
            <Button
              key={tipo}
              onClick={() => cambiarTipo(tipo)}
              variant={tipoActual === tipo ? 'contained' : 'outlined'}
              color={tipoActual === tipo ? 'primary' : 'inherit'}
            >
              {tipos[tipo].nombre}
            </Button>
          ))}
        </CardActions>
      </Card>
    </Box>
  );
};

export default TiposDeDatos;