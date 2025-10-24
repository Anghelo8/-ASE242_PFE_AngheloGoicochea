import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Producto } from '../../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  formProducto!: FormGroup;
  productos: Producto[] = [];
  editando = false;
  productoSeleccionadoId?: number;

  constructor(private fb: FormBuilder, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.formProducto = this.fb.group({
      nombre: [''],
      precio: [''],
      categoria: [''],
      descripcion: [''],
      imagenUrl: ['']
    });
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.listar().subscribe({
      next: data => (this.productos = data),
      error: err => console.error('Error al cargar productos', err)
    });
  }

  guardar(): void {
    const producto: Producto = this.formProducto.value;

    if (this.editando && this.productoSeleccionadoId) {
      this.productoService.actualizar(this.productoSeleccionadoId, producto).subscribe(() => {
        this.resetForm();
        this.cargarProductos();
      });
    } else {
      this.productoService.crear(producto).subscribe(() => {
        this.resetForm();
        this.cargarProductos();
      });
    }
  }

  editar(producto: Producto): void {
    this.formProducto.patchValue(producto);
    this.productoSeleccionadoId = producto.id;
    this.editando = true;
  }

  eliminar(id?: number): void {
    if (id && confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productoService.eliminar(id).subscribe(() => this.cargarProductos());
    }
  }

  resetForm(): void {
    this.formProducto.reset();
    this.editando = false;
    this.productoSeleccionadoId = undefined;
  }
}
