import { setLayoutDashboard } from '../../../templates/template-creator';

const partnerDashboardBuyingTransaction = {
  async render() {
    return `
      <section class="flex px-[32px] py-[25px] bg-gray-50 w-full">
        <div class="w-full bg-white rounded-2xl p-6">
          <dashboard-menu-tab-buying-transaction></dashboard-menu-tab-buying-transaction>
          <buying-transaction-list></buying-transaction-list>
        </div>
      </section>
    `;
  },

  async afterRender() {
    setLayoutDashboard(2);
    const TransactionListComponent = document.querySelector('buying-transaction-list');

    const dummyData = [
      {
        company_image: 'https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj',
        company_name: 'PT Asri Indah',
        price: 150000,
        status: 'Tawaran',
        date: '23 April 2024',
        weight: 30,
        detail_transaction: '#',
      },
      {
        company_image: 'https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj',
        company_name: 'PT Asri Indah',
        price: 150000,
        status: 'Selesai',
        date: '23 April 2024',
        weight: 30,
        detail_transaction: '#',
      },
      {
        company_image: 'https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj',
        company_name: 'PT Asri Indah',
        price: 150000,
        status: 'Gagal',
        date: '23 April 2024',
        weight: 30,
        detail_transaction: '#',
      },
    ];

    const generateTransactionItems = (status) => {
      const transactionList = TransactionListComponent.querySelector('#buying-transaction-list');
      transactionList.innerHTML = '';
      dummyData.forEach((data) => {
        if (data.status === status) {
          const transactionItem = document.createElement('div');
          transactionItem.classList.add('w-full', 'h-full', 'grid', 'grid-cols-12', 'px-8', 'py-4', 'mt-4', 'hover:bg-gray-100', 'rounded-lg');
          transactionItem.innerHTML = `
            <div class="flex flex-row col-span-3 gap-4 items-center">
              <img src="${data.company_image}" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
              <p class="text-sm font-regular break-words">${data.company_name}</p>
            </div>
            <div class="grid grid-cols-4 col-span-5">
              <p class="flex items-center justify-center text-sm font-regular text-gray-400 break-words">${data.date}</p>
              <p class="flex items-center justify-center text-sm font-regular break-words">${data.weight} kg</p>
              <p class="flex items-center justify-center text-sm font-regular break-words">Rp. ${data.price}</p>
              <p class="flex items-center justify-center text-sm font-regular break-words">${data.status}</p>
            </div>
            <div class="grid grid-cols-3 col-span-4 justify-end">
              ${data.status === 'Tawaran' ? `
                <div class="flex justify-center">
                  <bordered-button name="Terima" linkTo="${data.detail_transaction}"></bordered-button>
                </div>
                <div class="flex justify-center">
                  <bordered-button name="Tolak" linkTo="${data.detail_transaction}"></bordered-button>
                </div>
              ` : ''}
              <div class="flex ${data.status === 'Tawaran' ? 'justify-end' : 'justify-center col-span-3'}">
                <bordered-button name="Lihat Detail" linkTo="${data.detail_transaction}"></bordered-button>
              </div>
            </div>
          `;
          transactionList.append(transactionItem);
        }
      });
    };

    generateTransactionItems('Tawaran');

    const menuTabComponent = document.querySelector('dashboard-menu-tab-buying-transaction');
    menuTabComponent.addEventListener('tab-changed', (event) => {
      const { status } = event.detail;
      generateTransactionItems(status);
    });
  },
};

export default partnerDashboardBuyingTransaction;
