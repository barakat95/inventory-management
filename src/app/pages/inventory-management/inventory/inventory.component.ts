import { Component, effect, inject, signal } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { InventoryFormComponent } from '../inventory-form/inventory-form.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { StoreService } from '../../../common/services/store.service';
import { Item } from '../../../common/models/item.model';
import { DatePipe } from '@angular/common';
import { StockStatusPipe } from '../../../common/pipes/stock-status.pipe';
import { SearchPipe } from '../../../common/pipes/search-pipe.pipe';
import { StockStatusFilterPipe } from '../../../common/pipes/stock-status-filter-pipe.pipe';

@Component({
  selector: 'app-inventory',
  imports: [
    StockStatusPipe,
    ModalComponent,
    InventoryFormComponent,
    DatePipe,
    FormsModule,
    SearchPipe,
    StockStatusFilterPipe
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  storeService = inject(StoreService);
  fb = inject(FormBuilder);
  formGroup!: FormGroup;
  items = signal<Item[]>([]);
  isModalOpen = signal<boolean>(false);
  submitted = signal<boolean>(false);
  searchTerm = '';
  statuses = signal<string[]>(['All', 'In Stock', 'Out of Stock', 'Low Stock']);
  selectedStatus = '';

  openModal(): void {
    this.initializeForm();
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.submitted.set(false);
    this.formGroup.enable();
    this.formGroup.reset();
    this.isModalOpen.set(false);
  }

  constructor() {
    effect(() => {
      this.items.set(this.storeService.items());
    });
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this.fb.group({
      itemCode: ['', Validators.required],
      name: ['', Validators.required],
      category: [null, Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      lastUpdated: [new Date()],
    });
  }

  save(): void {
    this.submitted.set(true);
    if (!this.formGroup.valid) {
      console.error('Form is invalid', this.formGroup.errors);
      return;
    }

    const newItem: Item = this.formGroup.value;
    newItem.lastUpdated = new Date();
    this.storeService.saveItem(newItem);
    this.closeModal();
  }

  patchItem(item: Item): void {
    this.isModalOpen.set(true);
    this.formGroup.patchValue(item);
  }

  deleteItem(item: Item): void {
    this.storeService.deleteItem(item);
  }

  handleAction(action: string, item: Item) {
    switch (action) {
      case 'view':
        this.formGroup.disable();
        this.patchItem(item);
        break;
      case 'edit':
        this.patchItem(item);
        break;
      case 'delete':
        this.deleteItem(item);
        break;
      default:
        console.error('Unknown action:', action);
    }
  }
}
