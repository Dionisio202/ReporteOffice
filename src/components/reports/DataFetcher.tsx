// DataFetcher.tsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const DataFetcher = () => {
  const [poaData, setPoaData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPoaData = async () => {
    try {
      // Conexión al servidor WebSocket en localhost:3001
      const socket = io('http://localhost:3001'); // Cambia aquí a la URL de tu servidor WebSocket
      socket.emit('get_poa', (response: any) => {
        if (response.success) {
          const formattedData = formatPoaData(response.data);
          setPoaData(formattedData);
        } else {
          setError('Error al obtener datos de POA');
        }
      });
    } catch (err) {
      setError('Error al conectarse al servidor');
    }
  };

  // Formatea los datos recibidos de la base de datos
  const formatPoaData = (data: any[]) => {
    return data.map(item => ({
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
      responsables: JSON.parse(item.responsables),
    }));
  };

  useEffect(() => {
    fetchPoaData();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {poaData.map((poa, index) => (
            <li key={index}>
              {poa.nombre_actividad} - {poa.indicador_actividad}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataFetcher;
