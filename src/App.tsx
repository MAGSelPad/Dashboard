import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';

function App() {
  

  return (
    <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>
      <Grid>

        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}>Elemento: Encabezado<HeaderUI/></Grid>

        {/* Alertas */}
        <Grid size={12} container sx={{ justifyContent: "right", alignItems: "center" }}>Elemento: Alertas <AlertUI description="No se preveen lluvias"/></Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3  }}>Elemento: Selector</Grid>

        {/* Indicadores */}
        <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>  

        {/* Gráfico */}
        <Grid size={12} sx={{ display: { xs: "none", md: "block"} }}>Elemento: Gráfico</Grid>

        {/* Tabla */}
        <Grid size={12} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

        {/* Información adicional */}
        <Grid size={12}>Elemento: Información adicional</Grid>

      </Grid>
    </Grid>
  )
}

export default App
