import { Stock } from "./types";
import styles from './StockItem.module.css';


const StockItem = ({ stock }: { stock: Stock }) => {
  const direction =
    stock.previousPrice === undefined
      ? null
      : stock.price > stock.previousPrice
      ? 'up'
      : 'down';
  
  const cardClassName = [
    styles.item,
    direction === "up" && `${styles.up} ${styles.flashUp}`,
    direction === "down" && `${styles.down} ${styles.flashDown}`
  ].filter(Boolean).join(" ");

  const priceClassName = [
    styles.price,
    direction === "up" && styles.up,
    direction === "down" && styles.down
  ].filter(Boolean).join(" ");
  
  const flashKey = stock.price;

  return (
    <div
      key={flashKey}
      className={cardClassName}
    >
      <span className={styles.symbol}>{stock.symbol}</span>
      <span className={priceClassName}>
         ${stock.price.toFixed(2)}
       </span>
    </div>
  );
};

export default StockItem;