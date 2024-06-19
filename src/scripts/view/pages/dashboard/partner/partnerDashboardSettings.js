import UserResources from '../../../../data/user-resources';
import Auth from '../../../../utils/auth';
import Cookies from '../../../../utils/cookies.';
import { setLayoutDashboard } from '../../../templates/template-creator';

const partnerDashboardSettings = {
  async render() {
    return `
    <section class="pb-10 px-[32px] py-[25px] bg-gray-50 w-full">
      <div class="w-full bg-white rounded-2xl p-6 flex flex-col gap-6" id="content">
        <partner-dashboard-menu-tab-setting></partner-dashboard-menu-tab-setting>
        <div class="w-full h-20 flex justify-center items-center" id="loading">
            <div class="loading"></div>
        </div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    Auth.isPartner();
    setLayoutDashboard(2);
    const content = document.querySelector('#content');
    const loading = document.querySelector('#loading');
    try {
      const partner = await UserResources.detailPartner(Cookies.getUserId(), 'relations=acceptanceRules');
      loading.remove();
      content.innerHTML += `<partner-setting-profile></partner-setting-profile>
       <setting-account class="hidden"></setting-account>
       <open-to-receive-trash class="hidden"></open-to-receive-trash>`;
      const settingProfile = document.querySelector('partner-setting-profile');
      const settingAccount = document.querySelector('setting-account');
      const openReceive = document.querySelector('open-to-receive-trash');
      const menuTabSetting = document.querySelector('partner-dashboard-menu-tab-setting');
      const trash = {};
      (partner.acceptanceRules).forEach((item) => {
        const plasticName = item.plastic.name;
        switch (plasticName) {
          case 'PETE':
            trash.peteMin = item.minimumTransactionWeight;
            trash.petePrice = item.pricePerKilogram;
            trash.peteChecked = item.status === 'ACTIVE';
            break;
          case 'HDPE':
            trash.hdpeMin = item.minimumTransactionWeight;
            trash.hdpePrice = item.pricePerKilogram;
            trash.hdpeChecked = item.status === 'ACTIVE';
            break;
          case 'PVC':
            trash.pvcMin = item.minimumTransactionWeight;
            trash.pvcPrice = item.pricePerKilogram;
            trash.pvcChecked = item.status === 'ACTIVE';
            break;
          case 'LDPE':
            trash.ldpeMin = item.minimumTransactionWeight;
            trash.ldpePrice = item.pricePerKilogram;
            trash.ldpeChecked = item.status === 'ACTIVE';
            break;
          case 'PP':
            trash.ppMin = item.minimumTransactionWeight;
            trash.ppPrice = item.pricePerKilogram;
            trash.ppChecked = item.status === 'ACTIVE';
            break;
          case 'PS':
            trash.psMin = item.minimumTransactionWeight;
            trash.psPrice = item.pricePerKilogram;
            trash.psChecked = item.status === 'ACTIVE';
            break;
          default:
            break;
        }
      });
      openReceive.trashData = trash;
      const partnerData = {
        profilePicture: partner.photo,
        username: partner.username,
        fullname: partner.name,
        address: partner.address.split('+')[0].toString(),
        city: partner.address.split('+')[1].toString(),
        province: partner.address.split('+')[2].toString(),
        phone: (partner.phoneNumber).replace('+62', '0'),
        website: partner.website ? partner.website : '',
        email: partner.email,
        description: partner.description ? partner.description : '',
      };
      settingProfile.settingProfileData = partnerData;
      menuTabSetting.addEventListener('tab-changed', (event) => {
        const { status } = event.detail;
        if (status === 'Profil') {
          settingProfile.classList.remove('hidden');
          settingAccount.classList.add('hidden');
          openReceive.classList.add('hidden');
        } else if (status === 'Akun') {
          settingProfile.classList.add('hidden');
          openReceive.classList.add('hidden');
          settingAccount.classList.remove('hidden');
        } else if (status === 'Formulir Kesediaan Menerima Sampah') {
          settingProfile.classList.add('hidden');
          settingAccount.classList.add('hidden');
          openReceive.classList.remove('hidden');
        }
      });
    } catch (error) {
      const alert = document.createElement('error-alert');
      alert.alertData = {
        header: 'Terjadi kesalahan',
        desc: `${error}<br>Silahkan muat ulang!`,
        button: 'Tutup',
        link: null,
      };
      document.querySelector('main').append(alert);
    }
  },
};

export default partnerDashboardSettings;
