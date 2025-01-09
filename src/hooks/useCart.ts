import { Product } from "../services/productService";
import { useGlobalContext } from "../providers/stores";
import { useNavigate } from "react-router-dom";

export const useCart = () => {
  const { state, dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = state.cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      dispatch({
        cart: state.cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      dispatch({
        cart: [...state.cart, { id: Date.now(), product, quantity }]
      });
    }
  };

  const removeFromCart = (productId: number) => {
    dispatch({
      cart: state.cart.filter(item => item.product.id !== productId)
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    dispatch({
      cart: state.cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    });
  };

  const addToPurchaseHistory = (items: { product: Product; quantity: number }[]) => {
    const newPurchases = items.map((item, index) => ({
      id: Date.now() + index,
      productId: item.product.id,
      product: item.product,
      quantity: item.quantity,
      total: item.product.price * item.quantity * 16000, // Convert to IDR
      date: new Date().toISOString()
    }));

    dispatch({
      purchaseHistory: [...state.purchaseHistory, ...newPurchases],
      totalPurchases: state.totalPurchases + newPurchases.reduce((acc, curr) => acc + curr.quantity, 0),
      totalSpent: state.totalSpent + newPurchases.reduce((acc, curr) => acc + curr.total, 0)
    });
  };

  const processPurchase = (items: { product: Product; quantity: number }[]) => {
    if (!state.userData) {
      navigate('/login');
      return false;
    }

    addToPurchaseHistory(items);
    return true;
  };

  const buyNow = (product: Product, quantity: number) => {
    return processPurchase([{ product, quantity }]);
  };

  const checkout = () => {
    if (state.cart.length === 0) return false;
    
    const success = processPurchase(state.cart);
    if (success) {
      clearCart();
    }
    return success;
  };

  const clearCart = () => {
    dispatch({ cart: [] });
  };

  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    buyNow,
    checkout,
    clearCart
  };
};
