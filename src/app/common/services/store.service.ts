import { Injectable, signal } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  items = signal<Item[]>([]);

  saveItem(updatedItem: Item): void {
    this.items.update((items) => {
      const index = items.findIndex(
        (item) => item.itemCode === updatedItem.itemCode
      );
      return index !== -1
        ? items.map((item) =>
            item.itemCode === updatedItem.itemCode ? { ...updatedItem } : item
          )
        : [...items, updatedItem];
    });
  }

  deleteItem(item: Item) {
    this.items.update((items) =>
      items.filter((i) => i.itemCode !== item.itemCode)
    );
  }
}
