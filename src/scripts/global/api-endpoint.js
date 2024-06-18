import CONFIG from './config';

const API_ENDPOINT = {
  LOGIN: `${CONFIG.BASE_URL}api/login`,
  PARTNER: `${CONFIG.BASE_URL}api/users`,
  CHANGE_PASSWORD: (id) => `${CONFIG.BASE_URL}api/reset-password/${id}`,
  DETAIL_PARTNER: (id) => `${CONFIG.BASE_URL}api/users/${id}`,
  ACCEPTANCE_RULES: (id) => `${CONFIG.BASE_URL}api/acceptance-rules?partnerId=${id}`,
  PRODUCT: `${CONFIG.BASE_URL}api/products`,
  DETAIL_PRODUCT: (id) => `${CONFIG.BASE_URL}api/products/${id}`,
  PRODUCT_CATEGORIES: `${CONFIG.BASE_URL}api/products-categories`,
  TRANSACTIONS: `${CONFIG.BASE_URL}api/transactions`,
  UPDATE_ACC_RULES: `${CONFIG.BASE_URL}api/acceptance-rules`,
};
export default API_ENDPOINT;
