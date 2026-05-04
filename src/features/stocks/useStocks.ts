import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";
import axios from "axios";
import { setError, setLoading, setStocks, updateStock } from "./stocksSlice";
import { subscribeToStockUpdates } from "../../services/mockStockService";
import { Stock } from "./types";

export const useStocks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isStockArray = (data: unknown): data is Stock[] => {
    return Array.isArray(data);
  };

  useEffect(() => {

    const fetchStocks = async () => {
      dispatch(setLoading());

      try {
        const res = await axios.get('/stocks.json');
        
        if (!isStockArray(res.data)) {
          throw new Error();
        }

        dispatch(setStocks(res.data));
      } catch (error) {
        dispatch(setError('Failed to fetch stocks'));
      }
    };

    fetchStocks();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = subscribeToStockUpdates((stock) => {
      dispatch(updateStock(stock));
    });

    return unsubscribe;
  }, [dispatch]);
};