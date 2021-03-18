import Logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

type HeaderProps = {
  onOpenNewTransactionModal: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  onOpenNewTransactionModal,
}) => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="dt money" />
        <button type="submit" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
};
