import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData() : OpenMeteoResponse | undefined {
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=wind_speed_10m,temperature_2m,relative_humidity_2m,apparent_temperature&timezone=America%2FChicago';

    const [data, setData] = useState<OpenMeteoResponse>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const jsonData: OpenMeteoResponse = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        void fetchData();
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return data;
}


