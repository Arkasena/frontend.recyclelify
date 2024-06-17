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
    const publicRoutes = ['/', '/login', '/register', '/register?', '/404', '/about-us', '/help'];
    const loginRegister = ['/login', '/register'];
    let page = routes[url];
    if (!page) {
      page = routes['/404'];
    }
    if (Cookies.getToken() && loginRegister.includes(url)) {
      window.location.hash = '#/';
      setTimeout(() => {
        const alert = document.createElement('error-alert');
        alert.alertData = {
          header: 'Aksi Gagal!',
          desc: 'Anda sudah Login, Tidak dapat <span class="text-red-400">Login/Register</span> kembali.',
          button: 'Tutup',
          link: null,
        };
        document.querySelector('main').append(alert);
      }, 0);
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
