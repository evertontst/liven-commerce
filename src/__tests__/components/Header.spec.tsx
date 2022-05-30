import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import Header from '../../components/Header';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock('../../hooks/useCart', () => {
  return {
    useCart: () => ({
      cart: [
        {
          amount: 2,
          id: 1,
          image:
            'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          price: 109.95,
          title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        },
        {
          amount: 1,
          id: 2,
          image:
            'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          price: 22.3,
          title: 'Mens Casual Premium Slim Fit T-Shirts',
        },
      ],
    }),
  };
});

describe('Header Component', () => {
  it('Deve processar a quantidade de produtos adicionados ao carrinho', () => {
    const { getByTestId } = render(<Header />);

    const cartSizeCounter = getByTestId('cart-size');
    expect(cartSizeCounter).toHaveTextContent('2 itens');
  });
});
