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
  isLoading: boolean;
};

export const TransactionsContext = createContext<TransactionsContextState>(
  {} as TransactionsContextState
);

export const TransactionsProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTransactions = useCallback(async () => {
    setIsLoading((prevState) => !prevState);
    const response = await api.get('/transactions');
    setTransactions(response.data.transactions);
    setIsLoading((prevState) => !prevState);
  }, []);

  const createTransaction = async (transactionInput: TransactionInput) => {
    setIsLoading((prevState) => !prevState);
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
    setIsLoading((prevState) => !prevState);
  };

  useEffect(() => {
    handleTransactions();
  }, [handleTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, isLoading }}
    >
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
