import API_ENDPOINT from '../global/api-endpoint';
import Cookies from '../utils/cookies.';

class ProductResources {
  static async product(params) {
    console.log(`${API_ENDPOINT.PRODUCT}?${params}`);
    const response = await fetch(`${API_ENDPOINT.PRODUCT}?relations=categories&${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.getToken()}`,
      },
    });
    const responseJson = await response.json();
    return responseJson;
  }

  static async detailProduct(id, params) {
    const response = await fetch(`${API_ENDPOINT.DETAIL_PRODUCT(id)}?${params}`, {
      method: 'GET', // ini methodnya
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.getToken()}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.data;
  }
}
export default ProductResources;
