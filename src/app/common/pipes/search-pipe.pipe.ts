import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: Item[], searchTerm: string): Item[] {
    if (!items || !searchTerm) {
      return items;
    }

    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
