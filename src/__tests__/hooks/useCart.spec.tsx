import { renderHook, act } from '@testing-library/react-hooks';
import AxiosMock from 'axios-mock-adapter';

import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useCart, CartProvider } from '../../hooks/useCart';

const apiMock = new AxiosMock(api);

jest.mock('react-toastify');

const mockedToastError = toast.error as jest.Mock;
const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, 'setItem');
const initialStoragedData = [
  {
    id: 1,
    amount:2,
    image:
      'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    price: 109.95,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  },
  {
    id: 2,
    amount:1,
    image:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    price: 22.3,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
  },
];

describe('useCart Hook', () => {
  beforeEach(() => {
    apiMock.reset();

    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify(initialStoragedData));
  });

  it('Deve inicializar o carrinho com o valor localStorage', () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount:2,
          image:
            'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          price: 109.95,
          title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        },
        {
          id: 2,
          amount:1,
          image:
            'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          price: 22.3,
          title: 'Mens Casual Premium Slim Fit T-Shirts',
        },
      ])
    );
  });

  it('Deve adicionar um novo produto', async () => {
    const productId = 3;

    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      amount:1,
    });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      amount:1,
      title: 'Mens Cotton Jacket',
      price: 55.99,
      image:
        'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    });

    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addProduct(productId);
    });

    await waitForNextUpdate({ timeout: 200 });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
         id: 1,
         amount:2,
          image:
            'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          price: 109.95,
          title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        },
        {
          id: 2,
          amount:1,
          image:
            'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          price: 22.3,
          title: 'Mens Casual Premium Slim Fit T-Shirts',
        },
        {
          id: 3,
          amount:1,
          image:
            'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
          price: 55.99,
          title: 'Mens Cotton Jacket',
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@Liven:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('Não deve adicionar um produto que não existe', async () => {
    const productId = 45;

    apiMock.onGet(`products/${productId}`).reply(404);
    apiMock.onGet(`products/${productId}`).reply(404);

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addProduct(productId);
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na adição do produto'
        );
      },
      { timeout: 200 }
    );

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('Deve remover um produto', () => {
    const productId = 2;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeProduct(productId);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount:2,
          image:
            'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          price: 109.95,
          title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@Liven:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('Não deve remover um produto que não existe', () => {
    const productId = 3;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeProduct(productId);
    });

    expect(mockedToastError).toHaveBeenCalledWith('Erro na remoção do produto');
    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('Não deve atualizar um produto que não existe', async () => {
    const productId = 45;

    apiMock.onGet(`products/${productId}`).reply(404);

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 3, productId });
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na alteração de quantidade do produto'
        );
      },
      { timeout: 200 }
    );

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });
});