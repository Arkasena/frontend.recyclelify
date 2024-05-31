import bantuan from '../view/pages/bantuan';
import blank from '../view/pages/blank';
import dashboard from '../view/pages/dashboard';
import detailKatalog from '../view/pages/detail-katalog';
import detailMitra from '../view/pages/detail-mitra';
import formJualSampah from '../view/pages/form-jual-sampah';
import katalog from '../view/pages/katalog';
import landingPage from '../view/pages/landing-page';
import login from '../view/pages/login';
import mitra from '../view/pages/mitra';
import registerAccount from '../view/pages/register-account';
import registerRadio from '../view/pages/register-radio';
import tentangKami from '../view/pages/tentang-kami';

/* eslint-disable no-undef */
const routes = {
  '/': landingPage,
  '/login': login,
  '/register': registerRadio,
  '/register?': registerAccount,
  '/test': blank,
  '/partner': mitra,
  '/partner?': mitra,
  '/partner/:id': detailMitra,
  '/partner/:id/form': formJualSampah,
  '/catalog': katalog,
  '/catalog?': katalog,
  '/catalog/:id': detailKatalog,
  '/dashboard': dashboard,
  '/about-us': tentangKami,
  '/help': bantuan,
};
export default routes;
