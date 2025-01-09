import axios from 'axios';

const useFrontendInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    return config;
  });
  instance.interceptors.response.use(
    undefined,
    (err) => {
      return Promise.reject(err);
    }
  );

  return instance;
};

export default useFrontendInstance;
