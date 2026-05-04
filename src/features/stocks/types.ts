export type Stock = {
  id: string;
  symbol: string;
  price: number;
  previousPrice?: number;
}

export type StocksState = {
  stocks: Stock[]
  loading: boolean;
  error: string | null;
}