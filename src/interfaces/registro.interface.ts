export interface Autor {
    nombre: string;
    apellido: string;
    id: number;
  }
  
  export interface Producto {
    id: number;
    nombre: string;
    categoria: string;
  }
  
  export interface ModalData {
    success: boolean;
    message: string;
    autores: Autor[];
    productos: Producto[];
  }