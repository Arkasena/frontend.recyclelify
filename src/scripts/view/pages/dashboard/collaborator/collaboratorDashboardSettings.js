import { setLayoutDashboard } from '../../../templates/template-creator';

const collaboratorDashboardSettings = {
  async render() {
    return `
    <section class="pb-10 px-[32px] py-[25px] bg-gray-50 w-full">
      <div class="w-full bg-white rounded-2xl p-6 flex flex-col gap-6">
       <collaborator-dashboard-menu-tab-setting></collaborator-dashboard-menu-tab-setting>
       <collaborator-setting-profile></collaborator-setting-profile>
       <setting-account class="hidden"></setting-account>
      </div>
    </section>
    `;
  },

  async afterRender() {
    setLayoutDashboard(1);
    const menuTabSetting = document.querySelector('collaborator-dashboard-menu-tab-setting');
    const settingProfile = document.querySelector('collaborator-setting-profile');
    const settingAccount = document.querySelector('setting-account');

    // Data
    const profileData = {
      fullname: 'John Doe',
      address: '123 Main Street',
      city: 'Anytown',
      province: 'Some Province',
      phone: '123-456-7890',
    };

    // Set data into form
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
  },
};

export default collaboratorDashboardSettings;
