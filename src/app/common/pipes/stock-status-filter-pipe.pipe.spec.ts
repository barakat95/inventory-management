import { Item } from '../models/item.model';
import { StockStatusFilterPipe } from './stock-status-filter-pipe.pipe';

describe('StockStatusFilterPipe', () => {
  let pipe: StockStatusFilterPipe;

  beforeEach(() => {
    pipe = new StockStatusFilterPipe();
  });

  const items: Item[] = [
    {
      itemCode: 'A1',
      name: 'Item 1',
      category: 'Category 1',
      quantity: 0,
      stockStatus: 'Out of Stock',
      lastUpdated: new Date(),
    },
    {
      itemCode: 'A2',
      name: 'Item 2',
      category: 'Category 2',
      quantity: 1,
      stockStatus: 'Low Stock',
      lastUpdated: new Date(),
    },
    {
      itemCode: 'A3',
      name: 'Item 3',
      category: 'Category 3',
      quantity: 5,
      stockStatus: 'In Stock',
      lastUpdated: new Date(),
    },
  ];

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all items when no status is provided', () => {
    expect(pipe.transform(items, '')).toEqual(items);
  });

  it('should filter items with quantity 0 as Out of Stock', () => {
    expect(pipe.transform(items, 'Out of Stock')).toEqual([
      {
        itemCode: 'A1',
        name: 'Item 1',
        category: 'Category 1',
        quantity: 0,
        stockStatus: 'Out of Stock',
        lastUpdated: new Date(),
      },
    ]);
  });

  it('should filter items with quantity between 0 and 3 as Low Stock', () => {
    expect(pipe.transform(items, 'Low Stock')).toEqual([
      {
        itemCode: 'A2',
        name: 'Item 2',
        category: 'Category 2',
        quantity: 1,
        stockStatus: 'Low Stock',
        lastUpdated: new Date(),
      },
    ]);
  });

  it('should filter items with quantity 3 or more as In Stock', () => {
    expect(pipe.transform(items, 'In Stock')).toEqual([
      {
        itemCode: 'A3',
        name: 'Item 3',
        category: 'Category 3',
        quantity: 5,
        stockStatus: 'In Stock',
        lastUpdated: new Date(),
      },
    ]);
  });

  it('should return an empty array when given an empty item list', () => {
    expect(pipe.transform([], 'In Stock')).toEqual([]);
  });
});
