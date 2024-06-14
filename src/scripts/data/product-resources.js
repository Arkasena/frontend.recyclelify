import API_ENDPOINT from '../global/api-endpoint';
import Cookies from '../utils/cookies.';

class ProductResources {
  static async product(params) {
    console.log(`${API_ENDPOINT.PRODUCT}?${params}`);
    const response = await fetch(`${API_ENDPOINT.PRODUCT}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.getCookie('authToken')}`,
      },
    });
    console.log(response);
    const responseJson = await response.json();
    return responseJson;
  }

  static async detailProduct(id) {
    console.log(API_ENDPOINT.DETAIL_PRODUCT(id));
    const response = await fetch(API_ENDPOINT.DETAIL_PRODUCT(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.getCookie('authToken')}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.data;
  }
}
export default ProductResources;
