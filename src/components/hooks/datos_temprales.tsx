import { useCallback } from 'react';
import { Socket } from 'socket.io-client';

interface SaveTempStateData {
  id_registro: string;
  id_tarea: number;
  jsonData: string;
  id_funcionario: number;
}

interface SaveTempStateResponse {
  success: boolean;
  message: string;
}

export const useSaveTempState = (socket: Socket) => {
  const saveTempState = useCallback(
    (data: SaveTempStateData): Promise<SaveTempStateResponse> => {
      console.log('Data:', data);
      return new Promise((resolve, reject) => {
        socket.emit(
          'guardar_estado_temporal',
          data,
          (response: SaveTempStateResponse) => {
            if (response.success) {
              resolve(response);
            } else {
              reject(new Error(response.message));
            }
          }
        );
      });
    },
    [socket]
  );

  return { saveTempState };
};