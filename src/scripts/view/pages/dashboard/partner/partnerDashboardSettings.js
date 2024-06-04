import { setLayoutDashboard } from '../../../templates/template-creator';

const partnerDashboardSettings = {
  async render() {
    return `
    <section class="pb-10 px-[32px] py-[25px] bg-gray-50 w-full">
      <div class="w-full bg-white rounded-2xl p-6 flex flex-col gap-6">
       <partner-dashboard-menu-tab-setting></partner-dashboard-menu-tab-setting>
       <partner-setting-profile></partner-setting-profile>
       <setting-account class="hidden"></setting-account>
       <open-to-receive-trash class="hidden"></open-to-receive-trash>
      </div>
    </section>
    `;
  },

  async afterRender() {
    setLayoutDashboard(2);
    const menuTabSetting = document.querySelector('partner-dashboard-menu-tab-setting');
    const settingProfile = document.querySelector('partner-setting-profile');
    const settingAccount = document.querySelector('setting-account');
    const openReceive = document.querySelector('open-to-receive-trash');

    // Dummy data
    const partnerData = {
      fullname: 'Jane Smith',
      address: '456 Oak Street',
      city: 'Othertown',
      province: 'Another Province',
      phone: '987-654-3210',
      website: 'https://example.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };

    // Set data ke form
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
  },
};

export default partnerDashboardSettings;
