import { useTransactionsHook } from '../../TransactionsContext';
import { Container } from './styles';
import Skeleton from 'react-loading-skeleton';
import { formatCurrency, formatDate } from '../../util/format';

export const TransactionsTable: React.FC = () => {
  const { transactions, isLoading } = useTransactionsHook();

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
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{isLoading ? <Skeleton /> : transaction.title}</td>
              <td className={transaction.type}>
                {isLoading ? <Skeleton /> : formatCurrency(transaction.amount)}
              </td>
              <td>{isLoading ? <Skeleton /> : transaction.category}</td>
              <td>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  formatDate(new Date(transaction.createdAt))
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
