import { Stock } from "./types";
import styles from './StockItem.module.css';
import { useEffect, useState } from "react";

const StockItem = ({ stock }: { stock: Stock }) => {
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  const direction =
    stock.previousPrice === undefined
      ? null
      : stock.price > stock.previousPrice
      ? "up"
      : "down";

  useEffect(() => {
    if (!direction) return;
    setFlash(direction);
  }, [stock.price, direction]);

  const handleAnimationEnd = () => {
    setFlash(null);
  };
  
  const cardClassName = [
    styles.item,
    direction === "up" && styles.up,
    direction === "down" && styles.down,
    flash === "up" && styles.flashUp,
    flash === "down" && styles.flashDown
  ].filter(Boolean).join(" ");

  const priceClassName = [
    styles.price,
    direction === "up" && styles.up,
    direction === "down" && styles.down
  ].filter(Boolean).join(" ");

  return (
    <div className={cardClassName} onAnimationEnd={handleAnimationEnd}>
      <span className={styles.symbol}>{stock.symbol}</span>
      <span className={priceClassName}>
        ${stock.price.toFixed(2)} {direction === "up" ? "▲" : direction === "down" ? "▼" : ""}
       </span>
    </div>
  );
};

export default StockItem;