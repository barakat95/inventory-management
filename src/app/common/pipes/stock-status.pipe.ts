import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus',
})
export class StockStatusPipe implements PipeTransform {
  transform(value: number): unknown {
    if (value === 0) {
      return 'Out of Stock';
    } else if (value < 3) {
      return 'Low Stock';
    } else {
      return 'In Stock';
    }
  }
}
