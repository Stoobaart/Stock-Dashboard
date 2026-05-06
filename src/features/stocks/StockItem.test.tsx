import { render, screen } from "@testing-library/react";
import StockItem from "./StockItem";

const baseStock = { id: "1", symbol: "AAPL", price: 150 };
const increasedStock = { id: "1", symbol: "AAPL", price: 150, previousPrice: 100 };
const decreasedStock = { id: "1", symbol: "AAPL", price: 150, previousPrice: 200 };

describe("StockItem", () => {
  it("renders symbol and price", () => {
    render(<StockItem stock={baseStock} />);

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("$150.00")).toBeInTheDocument();
  });

  it("shows correct price for a stock that has increased in value", () => {
    render(<StockItem stock={increasedStock} />);

    expect(screen.getByText("$150.00 ▲")).toBeInTheDocument();
  });

  it("shows correct price for a stock that has decreased in value", () => {
    render(<StockItem stock={decreasedStock} />);

    expect(screen.getByText("$150.00 ▼")).toBeInTheDocument();
  });
});