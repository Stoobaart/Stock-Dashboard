import './App.css';
import StockList from './features/stocks/StockList';
import { useStocks } from './features/stocks/useStocks';

function App() {
  useStocks();
  
  return (
    <>
      <header>
        <h1>Stock Dashboard</h1>
      </header>
      <main>
        <StockList />
      </main>
    </>
  );
}

export default App;
