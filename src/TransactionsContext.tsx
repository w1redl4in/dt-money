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

type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

type TransactionsContextState = {
  transactions: ITransaction[];
  createTransaction: (trasaction: TransactionInput) => Promise<void>;
};

export const TransactionsContext = createContext<TransactionsContextState>(
  {} as TransactionsContextState
);

export const TransactionsProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const handleTransactions = useCallback(async () => {
    const response = await api.get('/transactions');
    setTransactions(response.data.transactions);
  }, []);

  const createTransaction = async (trasaction: TransactionInput) => {
    await api.post('transactions', trasaction);
  };

  useEffect(() => {
    handleTransactions();
  }, [handleTransactions]);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
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
