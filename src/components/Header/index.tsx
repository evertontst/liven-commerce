import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import logo from '../../assets/images/logo.png';
import { Container, Content,Cart } from './styles';
import { useCart } from '../../hooks/useCart';

const Header = (): JSX.Element => {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <Container className="headerContent">
      <Content>
        <Link to="/">
          <img src={logo} alt="Liven -  Your Best Tech Partner" title="Liven -  Your Best Tech Partner" />
        </Link>
        <Cart to="/cart">
          <div>
            <strong>Meu carrinho</strong>
            <span data-testid="cart-size">
              {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
            </span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </Cart>
      </Content>
    </Container>
  );
};

export default Header;
