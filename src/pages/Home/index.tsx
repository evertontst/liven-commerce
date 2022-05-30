import { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList, ProductImage } from './styles';
import { api } from '../../services/api';
import { priceBRL } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  
  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    return sumAmount = {
      ...sumAmount,
      [product.id]: product.amount
    }
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      const response = await api.get<Product[]>('products?limit=9');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: priceBRL(product.price)
      }))
      setProducts(data); 
      setIsLoading(false);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <>{isLoading && <LoadingSpinner />}
      <ProductList>
        
        {products.map(product => {
          return (
            <li key={product.id} >
              <ProductImage><span><img src={product.image} alt={product.title} /></span></ProductImage>
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
              <button
                type="button"
                data-testid="add-product-button"
              onClick={() => handleAddProduct(product.id)}
              >
                <div data-testid="cart-product-quantity">
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {cartItemsAmount[product.id] || 0}
                </div>

                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          )
        })}
      </ProductList>
    </>
  );
};

export default Home;
