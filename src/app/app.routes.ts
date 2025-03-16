import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inventory', pathMatch: 'full' },
  {
    path: 'inventory',
    loadComponent: () =>
      import('./pages/inventory-management/inventory/inventory.component').then(
        (m) => m.InventoryComponent
      ),
  },
];
