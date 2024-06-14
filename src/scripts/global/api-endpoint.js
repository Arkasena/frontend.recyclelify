import CONFIG from './config';

const API_ENDPOINT = {
  LOGIN: `${CONFIG.BASE_URL}api/login`,
  PARTNER: `${CONFIG.BASE_URL}api/users`,
  DETAIL_PARTNER: (id) => `${CONFIG.BASE_URL}api/users/${id}`,
  ACCEPTANCE_RULES: (id) => `${CONFIG.BASE_URL}api/acceptance-rules?partnerId=${id}`,
  PRODUCT: `${CONFIG.BASE_URL}api/products`,
  DETAIL_PRODUCT: (id) => `${CONFIG.BASE_URL}api/products/${id}`,
};
export default API_ENDPOINT;
