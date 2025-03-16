import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'stockStatusFilter',
})
export class StockStatusFilterPipe implements PipeTransform {
  transform(items: Item[], status: string): Item[] {
    if (!items || !status) {
      return items;
    } else if (status === 'Out of Stock') {
      return items.filter((item) => item.quantity === 0);
    } else if (status === 'Low Stock') {
      return items.filter((item) => item.quantity > 0 && item.quantity < 3);
    } else if (status === 'In Stock') {
      return items.filter((item) => item.quantity >= 3);
    } else {
      return items;
    }
  }
}
