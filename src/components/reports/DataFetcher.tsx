// DataFetcher.tsx
import { useEffect } from 'react';
import io from 'socket.io-client';

interface Actividad {
  nombre_actividad: string;
  indicador_actividad: string;
  proyeccion_actividad: string;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  gastos_t_humanos: number;
  gasto_b_capital: number;
  total_actividad: number;
  responsables: string[]; // Aquí almacenaremos solo los nombres
}

interface DataFetcherProps {
  setActividad: React.Dispatch<React.SetStateAction<Actividad[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ setActividad, setLoading, setError }) => {
  useEffect(() => {
    const fetchPoaData = async () => {
      try {
        const socket = io('http://localhost:3001'); // Cambia esto si es necesario
        setLoading(true);
        
        socket.emit('get_poa', (response: any) => {
          console.log('Respuesta del servidor:', response);
          if (response.success) {
            const formattedData = response.data.map((item: any) => ({
              nombre_actividad: item.nombre_actividad,
              indicador_actividad: item.indicador_actividad,
              proyeccion_actividad: item.proyeccion_actividad,
              t1: item.t1,
              t2: item.t2,
              t3: item.t3,
              t4: item.t4,
              gastos_t_humanos: item.gastos_t_humanos,
              gasto_b_capital: item.gasto_b_capital,
              total_actividad: item.total_actividad,
              responsables: (() => {
                try {
                  const responsablesArray = JSON.parse(item.responsables);
                  return responsablesArray.map((r: { nombre: string }) => r.nombre);
                } catch (error) {
                  console.error("Error al parsear responsables:", error);
                  return [];
                }
              })(),
            }));

            setActividad(formattedData);
          } else {
            setError('Error al obtener datos de POA');
          }
        });

        setLoading(false);
      } catch (err) {
        setError('Error al conectarse al servidor');
        setLoading(false);
      }
    };

    fetchPoaData();
  }, [setActividad, setLoading, setError]);

  return null;
};

export default DataFetcher;
