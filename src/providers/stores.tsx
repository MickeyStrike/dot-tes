import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { useMinimizedState } from "../hooks/useMinimizedState";
import { Product } from "../services/productService";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface PurchaseHistoryItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  total: number;
  date: string;
}

export interface GlobalState {
  innerWidth?: number;
  innerHeight?: number;
  isModalOpen: boolean;
  userData: {
    name: string;
    email: string;
    phone: string;
    joinDate: string;
  } | null;
  cart: CartItem[];
  purchaseHistory: PurchaseHistoryItem[];
  totalPurchases: number;
  totalSpent: number;
}

export const initialGlobalState: GlobalState = {
  isModalOpen: false,
  userData: null,
  cart: [],
  purchaseHistory: [],
  totalPurchases: 0,
  totalSpent: 0
};

export interface InitialContext {
  state: GlobalState;
  dispatch: Dispatch<Partial<GlobalState>>;
}

export const GlobalContext = createContext<InitialContext>({
  state: initialGlobalState,
  dispatch: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = useMinimizedState<GlobalState>(initialGlobalState);

  useEffect(() => {
    dispatch({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });

    // Load user data from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      dispatch({
        userData: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          joinDate: '2023-01-01'
        }
      });
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ cart: JSON.parse(savedCart) });
    }

    // Load purchase history from localStorage
    const savedHistory = localStorage.getItem('purchaseHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      dispatch({
        purchaseHistory: history,
        totalPurchases: history.reduce((acc: number, curr: PurchaseHistoryItem) => acc + curr.quantity, 0),
        totalSpent: history.reduce((acc: number, curr: PurchaseHistoryItem) => acc + curr.total, 0)
      });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Save purchase history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('purchaseHistory', JSON.stringify(state.purchaseHistory));
  }, [state.purchaseHistory]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
