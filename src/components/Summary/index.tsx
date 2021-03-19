import { Container } from './styles';
import IncomeImage from '../../assets/income.svg';
import OutcomeImage from '../../assets/outcome.svg';
import TotalImage from '../../assets/total.svg';
import { useTransactionsHook } from '../../TransactionsContext';
import { formatCurrency } from '../../util/format';
import Skeleton from 'react-loading-skeleton';

export const Summary: React.FC = () => {
  const { transactions, isLoading } = useTransactionsHook();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={IncomeImage} alt="income dt money" />
        </header>
        <strong>
          {isLoading ? <Skeleton /> : formatCurrency(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={OutcomeImage} alt="outcome dt money" />
        </header>
        <strong>
          {isLoading ? <Skeleton /> : formatCurrency(summary.withdraws)}
        </strong>
      </div>
      <div>
        <header>
          <p>Total</p>
          <img src={TotalImage} alt="income dt money" />
        </header>
        <strong>
          {isLoading ? <Skeleton /> : formatCurrency(summary.total)}
        </strong>
      </div>
    </Container>
  );
};
