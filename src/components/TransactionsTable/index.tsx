import { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';
import { api } from '../../services/api';

type ITransaction = {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
};

export const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const handleTransactions = useCallback(async () => {
    const response = await api.get('/transactions');
    setTransactions(response.data.transactions);
  }, []);

  useEffect(() => {
    handleTransactions();
  }, [handleTransactions]);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
