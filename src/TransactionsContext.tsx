import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from './services/api';

type ITransaction = {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
};

export const TransactionsContext = createContext<ITransaction[]>([]);

export const TransactionsProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const handleTransactions = useCallback(async () => {
    const response = await api.get('/transactions');
    setTransactions(response.data.transactions);
  }, []);

  useEffect(() => {
    handleTransactions();
  }, [handleTransactions]);

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsHook = () => {
  const context = useContext(TransactionsContext);

  if (!context)
    throw new Error(
      'useTransactionsHook must be used within a TransactionsProvider'
    );

  return context;
};
