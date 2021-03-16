import { Container } from './styles';
import IncomeImage from '../../assets/income.svg';
import OutcomeImage from '../../assets/outcome.svg';
import TotalImage from '../../assets/total.svg';

export const Summary: React.FC = () => {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={IncomeImage} alt="income dt money" />
        </header>
        <strong>R$ 1000,00</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={OutcomeImage} alt="income dt money" />
        </header>
        <strong>- R$ 1000,00</strong>
      </div>

      <div>
        <header>
          <p>Total</p>
          <img src={TotalImage} alt="income dt money" />
        </header>
        <strong>R$ 500,00</strong>
      </div>
    </Container>
  );
};
