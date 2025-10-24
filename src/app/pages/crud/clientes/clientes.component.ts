import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // ✅ CAMBIO 1: Importamos ReactiveFormsModule y clases necesarias
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ CAMBIO 2: Reemplazamos FormsModule por ReactiveFormsModule
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  // ✅ CAMBIO 3: Eliminamos clienteActual y declaramos un FormGroup
  formCliente!: FormGroup;

  editando = false;
  clienteSeleccionadoId?: number; // ✅ CAMBIO 4: Usamos un ID para saber qué cliente se edita

  constructor(
    private fb: FormBuilder,           // ✅ CAMBIO 5: Inyectamos FormBuilder
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();      // ✅ CAMBIO 6: Creamos el formulario reactivo
    this.cargarClientes();
  }

  inicializarFormulario(): void {
    // ✅ CAMBIO 7: Definimos los controles y validaciones aquí, no en el HTML
    this.formCliente = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  cargarClientes(): void {
    this.clienteService.listar().subscribe(data => this.clientes = data);
  }

  guardar(): void {
    // ✅ CAMBIO 8: Validamos el formulario desde el FormGroup
    if (this.formCliente.invalid) return;

    const cliente: Cliente = this.formCliente.value; // ✅ CAMBIO 9: Obtenemos los datos desde el formulario

    if (this.editando && this.clienteSeleccionadoId) {
      this.clienteService.actualizar(this.clienteSeleccionadoId, cliente).subscribe(() => {
        this.resetForm();
        this.cargarClientes();
      });
    } else {
      this.clienteService.crear(cliente).subscribe(() => {
        this.resetForm();
        this.cargarClientes();
      });
    }
  }

  editar(cliente: Cliente): void {
    // ✅ CAMBIO 10: Usamos patchValue() para rellenar el formulario con los datos del cliente
    this.formCliente.patchValue({
      nombre: cliente.nombre,
      correo: cliente.correo
    });
    this.clienteSeleccionadoId = cliente.id;
    this.editando = true;
  }

  eliminar(id?: number): void {
    if (id && confirm('¿Seguro que deseas eliminar este cliente?')) {
      this.clienteService.eliminar(id).subscribe(() => this.cargarClientes());
    }
  }

  resetForm(): void {
    // ✅ CAMBIO 11: Reset del formulario reactivo
    this.formCliente.reset();
    this.editando = false;
    this.clienteSeleccionadoId = undefined;
  }
}

