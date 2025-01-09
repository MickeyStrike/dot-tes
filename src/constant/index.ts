export const CONSTANTS = {
  RAJA_ONGKIR: {
    BASE_URL: "https://api.rajaongkir.com/starter",
    API_KEY: "1dn53sdK7e844a9a7b314c35pGb5b11M",
    ENDPOINTS: {
      PROVINCES: "/province",
      CITIES: "/city",
      COSTS: "/cost"
    }
  },
  PRODUCT: {
    BASE_URL: "https://dummyjson.com",
    ENDPOINTS: {
      PRODUCTS: "/products",
      CATEGORIES: "/products/categories",
      SEARCH: "/products/search"
    }
  }
} as const;