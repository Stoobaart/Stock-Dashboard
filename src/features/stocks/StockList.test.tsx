import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./stocksSlice";
import type { StocksState } from "./types"; 
import StockList from "./StockList";

type RootState = {
  stocks: StocksState;
};

const renderWithStore = (preloadedState: RootState) => {
  const store = configureStore({
    reducer: {
      stocks: stocksReducer
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <StockList />
    </Provider>
  );
};

describe("StockList", () => {
  it("shows loading state", () => {
    renderWithStore({
      stocks: {
        stocks: [],
        loading: true,
        error: null,
      },
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    renderWithStore({
      stocks: {
        stocks: [],
        loading: false,
        error: "Failed to fetch",
      },
    });

    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("renders stock items", () => {
    renderWithStore({
      stocks: {
        stocks: [
          { id: "1", symbol: "AAPL", price: 100 },
        ],
        loading: false,
        error: null,
      },
    });

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });
});