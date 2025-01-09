import useFrontendInstance from './instance';
import { CONSTANTS } from '../constant';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetProductsParams {
  limit?: number;
  skip?: number;
  category?: string;
}

const useProductServices = () => {
  const instance = useFrontendInstance(CONSTANTS.PRODUCT.BASE_URL);

  return {
    getAllProducts: ({ limit = 10, skip = 0 }: GetProductsParams = {}) =>
      instance.get<ProductsResponse>(CONSTANTS.PRODUCT.ENDPOINTS.PRODUCTS, {
        params: { limit, skip }
      }),

    getProductsByCategory: (category: string) =>
      instance.get<ProductsResponse>(
        `${CONSTANTS.PRODUCT.ENDPOINTS.PRODUCTS}/category/${category}`
      ),

    getAllCategories: () =>
      instance.get<string[]>(
        CONSTANTS.PRODUCT.ENDPOINTS.CATEGORIES
      ),

    getProductBySearch: (query: string) =>
      instance.get<ProductsResponse>(
        `${CONSTANTS.PRODUCT.ENDPOINTS.SEARCH}?q=${query}`
      ),

    getProductById: (id: string | number) =>
      instance.get<Product>(
        `${CONSTANTS.PRODUCT.ENDPOINTS.PRODUCTS}/${id}`
      )
  };
};

export default useProductServices;
