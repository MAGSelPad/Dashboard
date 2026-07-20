import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

// Estrategia para convertir la opción seleccionada en un objeto
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'guayaquil': { latitude: -2.1962, longitude: -79.8862 },
  'quito': { latitude: -0.2298, longitude: -78.525 },
  'cuenca': { latitude: -2.8953, longitude: -78.9963 },
  'manta': { latitude: -0.9494, longitude: -80.7314 },
};

export default function useFetchData(selectedOption: string | null): OpenMeteoResponse | undefined {

  // Parametrice la opción seleccionada en la URL del requerimiento asíncrono
  const cityConfig = selectedOption != null ? CITY_COORDS[selectedOption] : CITY_COORDS["guayaquil"];
  const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&current=wind_speed_10m,temperature_2m,relative_humidity_2m,apparent_temperature&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=America%2FChicago`;

  const [data, setData] = useState<OpenMeteoResponse>();


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData: OpenMeteoResponse = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    void fetchData();
  }, [URL]);// El efecto secundario depende de la opción seleccionada

  return data;
}


