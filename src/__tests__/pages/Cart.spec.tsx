import { render, fireEvent } from '@testing-library/react';

import { useCart } from '../../hooks/useCart';
import Cart from '../../pages/Cart';

const mockedRemoveProduct = jest.fn();
const mockedUpdateProductAmount = jest.fn();
const mockedUseCartHook = useCart as jest.Mock;

jest.mock('../../hooks/useCart');

describe('Cart Page', () => {
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          amount: 1,
          id: 1,
          image:
            'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          price: 109.95,
          title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        },
        {
          amount: 2 ,  
          id: 2,
          image:
            'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          price: 22.3,
          title: 'Mens Casual Premium Slim Fit T-Shirts',
        },
      ],
      removeProduct: mockedRemoveProduct,
      updateProductAmount: mockedUpdateProductAmount,
    });
  });

  it('Deve aumentar/diminuir uma quantidade de produto', () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    const [incrementFirstProduct] = getAllByTestId('increment-product');
    const [, decrementSecondProduct] = getAllByTestId('decrement-product');
    const [firstProductAmount, secondProductAmount] = getAllByTestId(
      'product-amount'
    );

    expect(firstProductAmount).toHaveDisplayValue('1');
    expect(secondProductAmount).toHaveDisplayValue('2');

    fireEvent.click(incrementFirstProduct);
    fireEvent.click(decrementSecondProduct);

    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 2,
      productId: 1,
    });
    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 1,
      productId: 2,
    });

    mockedUseCartHook.mockReturnValueOnce({
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
    });

    rerender(<Cart />);

    expect(firstProductAmount).toHaveDisplayValue('2');
    expect(secondProductAmount).toHaveDisplayValue('1');
  });

  it('Não deve diminuir uma quantidade de produto quando o valor é 1', () => {
    const { getAllByTestId } = render(<Cart />);

    const [decrementFirstProduct] = getAllByTestId('decrement-product');
    const [firstProductAmount] = getAllByTestId('product-amount');

    expect(firstProductAmount).toHaveDisplayValue('1');

    fireEvent.click(decrementFirstProduct);

    expect(decrementFirstProduct).toHaveProperty('disabled');
    expect(mockedUpdateProductAmount).not.toHaveBeenCalled();
  });

  it('Deve remover um produto', () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    const [removeFirstProduct] = getAllByTestId('remove-product');
    const [firstProduct, secondProduct] = getAllByTestId('product');

    expect(firstProduct).toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();

    fireEvent.click(removeFirstProduct);

    expect(mockedRemoveProduct).toHaveBeenCalledWith(1);

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 1,
          id: 2,
          image:
            'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          price: 22.3,
          title: 'Mens Casual Premium Slim Fit T-Shirts',
        },
      ],
    });

    rerender(<Cart />);

    expect(firstProduct).not.toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();
  });
});