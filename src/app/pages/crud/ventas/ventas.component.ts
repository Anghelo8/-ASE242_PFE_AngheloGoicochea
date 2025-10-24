// src/app/components/ventas/ventas.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VentaService } from '../../../services/venta.service';
import { Venta, Cliente, Producto } from '../../../models/venta.model';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  formVenta!: FormGroup;
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  ventas: Venta[] = [];
  total = 0;

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    // Mock de datos (en producción, cargarías desde servicios separados)
    this.clientes = [
      { id: 1, nombre: 'Valery Chumpitaz', correo: 'valery@example.com' },
      { id: 2, nombre: 'Piero Torres', correo: 'piero@example.com' },
      { id: 3, nombre: 'María López', correo: 'maria@example.com' }
    ];

this.productos = [
  { id: 1, nombre: 'Shampoo Capilar', precio: 15 },
  { id: 2, nombre: 'Tijeras Profesionales', precio: 25 },
  { id: 3, nombre: 'Tinte Natural', precio: 20 }
];

    this.formVenta = this.fb.group({
      cliente: [null, Validators.required],
      metodoPago: [null, Validators.required],
      detalles: this.fb.array([])
    });

    this.agregarDetalle();

    // ✅ Cargar ventas del backend
    this.ventaService.listar().subscribe({
      next: (ventas) => {
        this.ventas = ventas;
      },
      error: (err) => {
        console.error('Error al cargar ventas:', err);
      }
    });
  }

  get detalles(): FormArray {
    return this.formVenta.get('detalles') as FormArray;
  }

  agregarDetalle(): void {
    const detalleForm = this.fb.group({
      producto: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      subtotal: [0]
    });
    this.detalles.push(detalleForm);
  }

  eliminarDetalle(index: number): void {
    this.detalles.removeAt(index);
    this.calcularTotal();
  }

  calcularSubtotal(index: number): void {
    const detalle = this.detalles.at(index);
    const producto = detalle.get('producto')?.value as Producto | null;
    const cantidad = Number(detalle.get('cantidad')?.value || 0);

    if (producto) {
      const subtotal = producto.precio * cantidad;
      detalle.get('subtotal')?.setValue(subtotal, { emitEvent: false });
    }

    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.detalles.controls.reduce((acc, curr) => {
      return acc + (Number(curr.get('subtotal')?.value) || 0);
    }, 0);
  }

  guardar(): void {
    if (this.formVenta.invalid) {
      alert('⚠️ Por favor complete todos los campos obligatorios.');
      return;
    }

    const venta: Venta = {
      cliente: this.formVenta.value.cliente,
      metodoPago: this.formVenta.value.metodoPago,
      fecha: new Date().toISOString().split('T')[0], // Formato: "2025-10-24"
      total: this.total,
      detalles: this.formVenta.value.detalles.map((d: any) => ({
        producto: d.producto,
        cantidad: d.cantidad,
        subtotal: d.subtotal
      }))
    };

    // ✅ Enviar al backend
    this.ventaService.crear(venta).subscribe({
      next: (ventaGuardada) => {
        this.ventas.push(ventaGuardada);
        alert('✅ Venta registrada correctamente');
        this.formVenta.reset();
        this.detalles.clear();
        this.agregarDetalle();
        this.total = 0;
      },
      error: (err) => {
        console.error('Error al guardar venta:', err);
        alert('❌ Error al registrar la venta. Revise la consola.');
      }
    });
  }
}