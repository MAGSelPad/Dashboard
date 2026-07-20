import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
  data?: OpenMeteoResponse;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'time', headerName: 'Hora', width: 180 },
  { field: 'temperature', headerName: 'Temperatura (°C)', width: 180, type: 'number' },
  { field: 'humidity', headerName: 'Humedad (%)', width: 160, type: 'number' },
  { field: 'wind', headerName: 'Viento (km/h)', width: 160, type: 'number' },
];

export default function TableUI({ data }: TableUIProps) {
  if (!data) {
    return <Typography>Cargando tabla de Open-Meteo...</Typography>;
  }

  const maxRows = Math.min(data.hourly.time.length, 24);
  const rows = data.hourly.time.slice(0, maxRows).map((time, index) => ({
    id: index + 1,
    time: new Date(time).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    temperature: data.hourly.temperature_2m[index],
    humidity: data.hourly.relative_humidity_2m[index],
    wind: data.hourly.wind_speed_10m[index],
  }));

  return (
    <Box sx={{ height: 430, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
