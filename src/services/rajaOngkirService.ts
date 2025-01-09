import useFrontendInstance from './instance';
import { CONSTANTS } from '../constant';

export interface Province {
  province_id: string;
  province: string;
}

export interface City {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

export interface Cost {
  service: string;
  description: string;
  cost: {
    value: number;
    etd: string;
    note: string;
  }[];
}

export interface ShippingCostParams {
  origin: string;
  destination: string;
  weight: number;
  courier: string;
}

const useRajaOngkirServices = () => {
  const instance = useFrontendInstance(CONSTANTS.RAJA_ONGKIR.BASE_URL);

  // Add API key to all requests
  // instance.interceptors.request.use((config) => {
  //   config.headers['key'] = CONSTANTS.RAJA_ONGKIR.API_KEY;
  //   return config;
  // });

  // Unwrap Raja Ongkir response
  instance.interceptors.response.use((response) => {
    if (response.data?.rajaongkir?.status?.code === 200) {
      return response.data.rajaongkir.results;
    }
    return response;
  });

  return {
    getProvinces: () =>
      instance.get<Province[]>(CONSTANTS.RAJA_ONGKIR.ENDPOINTS.PROVINCES, { headers: { key: CONSTANTS.RAJA_ONGKIR.API_KEY } }),

    getCities: (provinceId?: string) =>
      instance.get<City[]>(CONSTANTS.RAJA_ONGKIR.ENDPOINTS.CITIES, {
        params: provinceId ? { province: provinceId } : undefined,
        headers: { key: CONSTANTS.RAJA_ONGKIR.API_KEY }
      }),

    getCitiesByProvince: (provinceId: string) =>
      instance.get<City[]>(CONSTANTS.RAJA_ONGKIR.ENDPOINTS.CITIES, {
        params: { province: provinceId },
        headers: { key: CONSTANTS.RAJA_ONGKIR.API_KEY }
      }),

    calculateShippingCost: (params: ShippingCostParams) =>
      instance.post<Cost[]>(CONSTANTS.RAJA_ONGKIR.ENDPOINTS.COSTS, params, {
        headers: { key: CONSTANTS.RAJA_ONGKIR.API_KEY }
      })
  };
};

export default useRajaOngkirServices;
