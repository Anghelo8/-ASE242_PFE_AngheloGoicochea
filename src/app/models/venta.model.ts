export interface Cliente {
  id: number;
  nombre: string;
  correo?: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

export interface DetalleVenta {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

export interface Venta {
  id?: number;
  cliente: Cliente;
  fecha: string;
  metodoPago: string;
  total: number;
  detalles: DetalleVenta[];
}