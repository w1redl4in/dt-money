import Logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

export const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="dt money" />
        <button type="submit">Nova transação</button>
      </Content>
    </Container>
  );
};
