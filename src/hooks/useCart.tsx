import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}
interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@Liven:cart');
    if (storagedCart) {
      return JSON.parse(storagedCart);
      }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      //Get cart
      const updatedCart = [...cart];
      
      //Check product productExists
      const productExists = updatedCart.find(product => product.id === productId);

      const currentAmount = productExists ? productExists.amount :0;
      const amount = currentAmount + 1;

      if (productExists) {
        productExists.amount = amount;
      }
      else {
        const product = await api.get(`/products/${productId}`);

        const newProduct = {
          ...product.data,
          amount: 1
        }
        updatedCart.push(newProduct);
      }
      setCart(updatedCart);
      localStorage.setItem('@Liven:cart', JSON.stringify(updatedCart));
    } catch (error) {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(product => product.id === productId);

      if(productIndex >=0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
        localStorage.setItem('@Liven:cart', JSON.stringify(updatedCart));
      } else {
        throw Error();
      }
      localStorage.removeItem(JSON.stringify(productId));
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);
      if (productExists) {
        productExists.amount = amount;
        setCart(updatedCart);
        localStorage.setItem('@Liven:cart', JSON.stringify(updatedCart));
      } else {
        throw Error();
      }

    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}