import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientesComponent } from './pages/crud/clientes/clientes.component';
import { ProductosComponent } from './pages/crud/productos/productos.component';
import { VentasComponent } from './pages/crud/ventas/ventas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent},
  { path: 'ventas', component:  VentasComponent}
];
