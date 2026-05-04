import { createSlice } from '@reduxjs/toolkit';
import { StocksState } from './types';

const initialState: StocksState = {
  stocks: [],
  loading: false,
  error: null
};

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setStocks(state, action) {
      state.stocks = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateStock(state, action) {
      const updatedStock = action.payload;
      const existingStock = state.stocks.find(stock => stock.id === updatedStock.id);

      if (existingStock) {
        existingStock.previousPrice = existingStock.price;
        existingStock.price = updatedStock.price;
      }
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setStocks, updateStock, setLoading, setError } = stocksSlice.actions;
export default stocksSlice.reducer;