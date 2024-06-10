import page404 from '../view/pages/404';
import bantuan from '../view/pages/bantuan';
import blank from '../view/pages/blank';
import detailKatalog from '../view/pages/katalog/detail-katalog';
import detailKatalogEdit from '../view/pages/katalog/detail-katalog-edit';
import detailMitra from '../view/pages/mitra/detail-mitra';
import editProduct from '../view/pages/katalog/edit-product';
import formJualSampah from '../view/pages/mitra/form-jual-sampah';
import katalog from '../view/pages/katalog/katalog';
import landingPage from '../view/pages/landing-page';
import login from '../view/pages/login-register/login';
import mitra from '../view/pages/mitra/mitra';
import profilSaya from '../view/pages/profil-saya';
import registerAccount from '../view/pages/login-register/register-account';
import registerRadio from '../view/pages/login-register/register-radio';
import tambahProduk from '../view/pages/katalog/tambah-produk';
import tentangKami from '../view/pages/tentang-kami';

// Collaborator dashboard
import collaboratorDashboard from '../view/pages/dashboard/collaborator/collaboratorDashboard';
import collaboratorDashboardStatistic from '../view/pages/dashboard/collaborator/collaboratorDashboardStatistic';
import collaboratorDashboardNotification from '../view/pages/dashboard/collaborator/collaboratorDashboardNotification';
import collaboratorDashboardSettings from '../view/pages/dashboard/collaborator/collaboratorDashboardSettings';
import collaboratorDashboardTransaction from '../view/pages/dashboard/collaborator/collaboratorDashboardTransaction';

// Partner dashboard
import partnerDashboard from '../view/pages/dashboard/partner/partnerDashboard';
import partnerDashboardStatistic from '../view/pages/dashboard/partner/partnerDashboardStatistic';
import partnerDashboardSelingTransaction from '../view/pages/dashboard/partner/partnerDashboardSelingTransaction';
import partnerDashboardBuyingTransaction from '../view/pages/dashboard/partner/partnerDashboardBuyingTransaction';
import partnerDashboardNotification from '../view/pages/dashboard/partner/partnerDashboardNotification';
import partnerDashboardSettings from '../view/pages/dashboard/partner/partnerDashboardSettings';

// Transaction detail
import collaboratorTransactionDetail from '../view/pages/transaction-detail/collaborator-transaction-detail';
import partnerTransactionDetail from '../view/pages/transaction-detail/partner-transaction-detail';

const routes = {
  '/': landingPage,
  '/login': login,
  '/register': registerRadio,
  '/register?': registerAccount,
  '/test': blank,
  '/find-partner': mitra,
  '/find-partner?': mitra,
  '/find-partner/:id': detailMitra,
  '/find-partner/:id/form': formJualSampah,
  '/catalog': katalog,
  '/catalog?': katalog,
  '/catalog/:id': detailKatalog,
  '/about-us': tentangKami,
  '/help': bantuan,
  // Collaborator
  '/collaborator/dashboard/statistic': collaboratorDashboardStatistic,
  '/collaborator/dashboard/transaction': collaboratorDashboardTransaction,
  '/collaborator/dashboard/notification': collaboratorDashboardNotification,
  '/collaborator/dashboard/settings': collaboratorDashboardSettings,
  '/collaborator/dashboard': collaboratorDashboard,
  // Partner
  '/partner/dashboard': partnerDashboard,
  '/partner/dashboard/statistic': partnerDashboardStatistic,
  '/partner/dashboard/selling-transaction': partnerDashboardSelingTransaction,
  '/partner/dashboard/buying-transaction': partnerDashboardBuyingTransaction,
  '/partner/dashboard/notification': partnerDashboardNotification,
  '/partner/dashboard/settings': partnerDashboardSettings,
  '/my-profile': profilSaya,
  '/my-profile/add-product': tambahProduk,
  '/my-product/:id': detailKatalogEdit,
  '/my-product/:id/edit': editProduct,
  '/404': page404,
  // Transaction-detail
  '/collaborator/dashboard/transaction/:id': collaboratorTransactionDetail,
  '/partner/dashboard/transaction/:id': partnerTransactionDetail,
};

export default routes;
