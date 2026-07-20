import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { useState } from 'react';


function App() {

  

  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Comunique la opción seleccionada al hook useFetchData
  const dataFetcherOutput = useFetchData(selectedOption);

  return (
    <Grid container spacing={5} sx={{ justifyContent: 'left', alignItems: 'center' }}>


      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid size={12} container sx={{ justifyContent: 'right', alignItems: 'center' }}>
        <AlertUI description="No se preveen lluvias" />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI onOptionSelect={setSelectedOption} />
      </Grid>

      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 9 }}>

        <Grid container size={{ xs: 12, md: 12 }} spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Temperatura (2m)'
                description={`${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`}
              />)}
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Temperatura Aparente'
                description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`}
              />)}
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Velocidad del Viento'
                description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`}
              />)}
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Humedad Relativa'
                description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`}
              />)}
          </Grid>
        </Grid>

      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
        Elemento: Gráfico
        {dataFetcherOutput && <ChartUI data={dataFetcherOutput} />}
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
        Elemento: Tabla
        {dataFetcherOutput && <TableUI data={dataFetcherOutput} />}
      </Grid>

      {/* Información adicional */}
      <Grid size={12}>
        Elemento: Información adicional
      </Grid>

    </Grid>

  )
}

export default App
