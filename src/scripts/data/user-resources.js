import API_ENDPOINT from '../global/api-endpoint';
import Cookies from '../utils/cookies.';

class UserResources {
  static async partner(params) {
    console.log(`${API_ENDPOINT.PARTNER}?relations=acceptanceRules${params}`);
    const response = await fetch(`${API_ENDPOINT.PARTNER}?relations=acceptanceRules&${params}`, {
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

  static async detailPartner(id) {
    const response = await fetch(API_ENDPOINT.DETAIL_PARTNER(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.getCookie('authToken')}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.data;
  }

  static async acceptanceRules(id) {
    console.log(API_ENDPOINT.ACCEPTANCE_RULES(id));
    const response = await fetch(API_ENDPOINT.ACCEPTANCE_RULES(id), {
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
export default UserResources;
