import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
  data?: OpenMeteoResponse;
}

export default function ChartUI({ data }: ChartUIProps) {
  if (!data) {
    return <Typography>Cargando gráfico de Open-Meteo...</Typography>;
  }

  const maxPoints = Math.min(data.hourly.time.length, 24);
  const labels = data.hourly.time.slice(0, maxPoints).map((time) =>
    new Date(time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  );

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Pronóstico horario de temperatura y humedad
      </Typography>
      <LineChart
        height={340}
        series={[
          { data: data.hourly.temperature_2m.slice(0, maxPoints), label: `Temperatura (${data.hourly_units.temperature_2m})` },
          { data: data.hourly.relative_humidity_2m.slice(0, maxPoints), label: `Humedad (${data.hourly_units.relative_humidity_2m})` },
        ]}
        xAxis={[{ scaleType: 'point', data: labels }]}
      />
    </>
  );
}
