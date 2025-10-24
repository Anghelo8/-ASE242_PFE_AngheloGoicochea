export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion?: string;
  imagenUrl?: string;
  stock: number;
}
