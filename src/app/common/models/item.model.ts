export interface Item {
  selected?: boolean;
  itemCode: string;
  name: string;
  category: string;
  quantity: number;
  stockStatus: string;
  lastUpdated: Date;
}
