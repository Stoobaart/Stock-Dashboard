import './App.css';
import StockList from './features/stocks/StockList';
import { useStocks } from './features/stocks/useStocks';

function App() {
  useStocks();
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>

      <header>
        <h1>Stock Dashboard Exercise</h1>
        <StockList />
      </header>
    </div>
  );
}

export default App;
