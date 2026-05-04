export interface Stock {
  id: string;
  symbol: string;
  price: number;
  previousPrice?: number;
}