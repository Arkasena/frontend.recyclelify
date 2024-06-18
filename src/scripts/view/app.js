import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import Auth from '../utils/auth';
import Cookies from '../utils/cookies.';

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log(url);
    const publicRoutes = ['/', '/login', '/register', '/register?', '/404', '/about-us', '/help', '/find-partner', '/catalog', '/find-partner/:id', '/catalog/:id', '/find-partner?', '/catalog?'];
    const loginRegister = ['/login', '/register'];
    let page = routes[url];
    if (!page) {
      page = routes['/404'];
    }
    if (Cookies.getToken() && loginRegister.includes(url)) {
      try {
        await Auth.isNotLogin();
      } catch (error) {
        console.error(error);
        return;
      }
    }
    if (!publicRoutes.includes(url) && page !== routes['/404']) {
      try {
        await Auth.isLogin();
      } catch (error) {
        console.error(error);
        return;
      }
    }
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}
export default App;
