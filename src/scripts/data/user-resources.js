import API_ENDPOINT from '../global/api-endpoint';
import Cookies from '../utils/cookies.';

class UserResources {
  static async partner(params) {
    console.log(`${API_ENDPOINT.PARTNER}?relations=acceptanceRules${params}`);
    const response = await fetch(`${API_ENDPOINT.PARTNER}?relations=acceptanceRules${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.getToken()}`,
      },
    });

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }

  static async detailPartner(id, params) {
    const response = await fetch(`${API_ENDPOINT.DETAIL_PARTNER(id)}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.getToken()}`,
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
        Authorization: `Bearer ${Cookies.getToken()}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.data;
  }
}
export default UserResources;
