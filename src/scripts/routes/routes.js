import bantuan from '../view/pages/bantuan';
import blank from '../view/pages/blank';
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
  '/about-us': tentangKami,
  '/help': bantuan,

  // Collaborator
  '/collaborator-dashboard-statistic': collaboratorDashboardStatistic,
  '/collaborator-dashboard-transaction': collaboratorDashboardTransaction,
  '/collaborator-dashboard-notification': collaboratorDashboardNotification,
  '/collaborator-dashboard-settings': collaboratorDashboardSettings,
  '/collaborator-dashboard': collaboratorDashboard,

  // Partner
  '/partner-dashboard': partnerDashboard,
  '/partner-dashboard-statistic': partnerDashboardStatistic,
  '/partner-dashboard-selling-transaction': partnerDashboardSelingTransaction,
  '/partner-dashboard-buying-transaction': partnerDashboardBuyingTransaction,
  '/partner-dashboard-notification': partnerDashboardNotification,
  '/partner-dashboard-settings': partnerDashboardSettings,
};

export default routes;
