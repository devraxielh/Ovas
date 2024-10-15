import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { ArrowRight, Check, FileText, DollarSign } from 'lucide-react';

const ContratoPasos = [
  { titulo: "Oferta", descripcion: "El vendedor ofrece un bien o servicio", icono: FileText },
  { titulo: "Negociación", descripcion: "Las partes discuten los términos", icono: ArrowRight },
  { titulo: "Aceptación", descripcion: "El comprador acepta la oferta", icono: Check },
  { titulo: "Pago", descripcion: "El comprador realiza el pago acordado", icono: DollarSign },
  { titulo: "Entrega", descripcion: "El vendedor entrega el bien o servicio", icono: ArrowRight },
];

const SimulacionContrato = () => {
  const [pasoActual, setPasoActual] = useState(0);

  const avanzarPaso = () => {
    if (pasoActual < ContratoPasos.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      setPasoActual(0);
    }
  };

  const PasoActual = ContratoPasos[pasoActual];
  const IconoActual = PasoActual.icono;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '16px' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <CardHeader
          title="Simulación de Contrato de Compra-Venta"
          subheader={`Paso ${pasoActual + 1} de ${ContratoPasos.length}`}
        />
        <CardContent style={{ textAlign: 'center' }}>
          {IconoActual && <IconoActual style={{ width: '64px', height: '64px', color: '#1976d2', marginBottom: '16px' }} />}
          <Typography variant="h5" component="div" gutterBottom>
            {PasoActual.titulo}
          </Typography>
          <Typography variant="body1">
            {PasoActual.descripcion}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={avanzarPaso}>
            {pasoActual === ContratoPasos.length - 1 ? "Reiniciar" : "Siguiente Paso"}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SimulacionContrato;