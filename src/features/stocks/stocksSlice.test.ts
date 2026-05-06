import reducer, {
  setStocks,
  updateStock,
  setLoading,
  setError,
} from "./stocksSlice";

describe("stocksSlice", () => {
  const initialState = {
    stocks: [],
    loading: false,
    error: null,
  };

  it("should handle setLoading", () => {
    const state = reducer(initialState, setLoading());

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle setStocks", () => {
    const mockStocks = [
      { id: "1", symbol: "AAPL", price: 100 },
    ];

    const state = reducer(initialState, setStocks(mockStocks));

    expect(state.stocks).toEqual(mockStocks);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("should handle updateStock and set previousPrice", () => {
    const startState = {
      ...initialState,
      stocks: [
        { id: "1", symbol: "AAPL", price: 100 },
      ],
    };

    const state = reducer(
      startState,
      updateStock({ id: "1", symbol: "AAPL", price: 110 })
    );

    expect(state.stocks[0].price).toBe(110);
    expect(state.stocks[0].previousPrice).toBe(100);
  });

  it("should handle setError", () => {
    const state = reducer(initialState, setError("Failed"));

    expect(state.error).toBe("Failed");
    expect(state.loading).toBe(false);
  });
});