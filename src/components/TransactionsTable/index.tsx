import { useTransactionsHook } from '../../TransactionsContext';
import { Container } from './styles';
import Skeleton from 'react-loading-skeleton';

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
                {isLoading ? (
                  <Skeleton />
                ) : (
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.amount)
                )}
              </td>
              <td>{isLoading ? <Skeleton /> : transaction.category}</td>
              <td>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transaction.createdAt)
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
