import { Component, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-form',
  imports: [ReactiveFormsModule],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.css',
})
export class InventoryFormComponent {
  formGroup = input<FormGroup>(new FormGroup({}));
  submitted = input<boolean>(false);
  categories = signal<any>(['Electronics', 'Books', 'Food', 'Clothing']);
}
