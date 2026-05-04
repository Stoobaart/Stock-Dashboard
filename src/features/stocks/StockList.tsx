import { useSelector } from "react-redux";
import StockItem from "./StockItem";
import { RootState } from "../../store/store";
import styles from './StockList.module.css';

const StockList = () => {
  const { stocks, loading, error } = useSelector((state: RootState) => state.stocks);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.list}>
      {stocks.map(stock => (
        <StockItem key={stock.id} stock={stock} />
      ))}
    </div>
  );
}

export default StockList;