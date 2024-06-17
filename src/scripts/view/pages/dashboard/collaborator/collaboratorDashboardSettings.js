import UserResources from '../../../../data/user-resources';
import Cookies from '../../../../utils/cookies.';
import { setLayoutDashboard } from '../../../templates/template-creator';

const collaboratorDashboardSettings = {
  async render() {
    return `
    <section class="pb-10 px-[32px] py-[25px] bg-gray-50 w-full">
            <div class="w-full bg-white rounded-2xl p-6 flex flex-col gap-6" id="content">
                <collaborator-dashboard-menu-tab-setting></collaborator-dashboard-menu-tab-setting>
                <div class="w-full h-20 flex justify-center items-center" id="loading">
            <div class="loading"></div>
        </div>
            </div>
        </section>
    `;
  },

  async afterRender() {
    setLayoutDashboard(1);
    const content = document.querySelector('#content');
    const loading = document.querySelector('#loading');
    try {
      const partner = await UserResources.detailPartner(Cookies.getUserId());
      loading.remove();
      content.innerHTML += `<collaborator-setting-profile></collaborator-setting-profile>
                <setting-account class="hidden"></setting-account>`;
      const settingProfile = document.querySelector('collaborator-setting-profile');
      const settingAccount = document.querySelector('setting-account');
      const menuTabSetting = document.querySelector('collaborator-dashboard-menu-tab-setting');
      const profileData = {
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
      settingProfile.settingProfileData = profileData;
      menuTabSetting.addEventListener('tab-changed', (event) => {
        const { status } = event.detail;
        if (status === 'Profil') {
          settingProfile.classList.remove('hidden');
          settingAccount.classList.add('hidden');
        } else if (status === 'Akun') {
          settingProfile.classList.add('hidden');
          settingAccount.classList.remove('hidden');
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

export default collaboratorDashboardSettings;
