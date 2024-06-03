import { setLayoutDashboard } from '../../../templates/template-creator';

const collaboratorDashboardTransaction = {
  async render() {
    return `
    <section class="flex px-[32px] py-[25px] bg-gray-50 w-full">
      <div class="w-full bg-white rounded-2xl p-6">
        <dashboard-menu-tab-selling-transaction></dashboard-menu-tab-selling-transaction>
        <selling-transaction-list></selling-transaction-list>
      </div>
    </section>
    `;
  },

  async afterRender() {
    setLayoutDashboard();
    const TransactionListComponent = document.querySelector('selling-transaction-list');

    const dummyData = [
      {
        company_image: 'https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj',
        company_name: 'PT Asri Indah',
        price: 150000,
        status: 'Diproses',
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
      const transactionList = TransactionListComponent.querySelector('#selling-transaction-list');
      transactionList.innerHTML = '';
      dummyData.forEach(data => {
        if (data.status === status) {
          const transactionItem = document.createElement('div');
          transactionItem.classList.add('w-full', 'h-full', 'grid', 'grid-cols-12', 'px-8', 'py-4', 'mt-4', 'hover:bg-gray-100', 'rounded-lg');
          transactionItem.innerHTML = `
            <div class="flex flex-row col-span-3 gap-4 items-center">
              <img src="${data.company_image}" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
              <p class="text-sm font-regular break-words">${data.company_name}</p>
            </div>
            <div class="grid grid-cols-5 col-span-9 justify-between items-center">
              <p class="text-sm font-regular text-gray-400 break-words">${data.date}</p>
              <p class="text-sm font-regular break-words">${data.weight} kg</p>
              <p class="text-sm font-regular break-words">Rp. ${data.price}</p>
              <p class="text-sm font-regular break-words">${data.status}</p>
              <bordered-button name="Lihat Detail" linkTo="${data.detail_transaction}"></bordered-button>
            </div>
          `;
          transactionList.append(transactionItem);
        }
      });
    };

    generateTransactionItems('Diproses');

    const menuTabComponent = document.querySelector('dashboard-menu-tab-selling-transaction');
    menuTabComponent.addEventListener('tab-changed', (event) => {
      const { status } = event.detail;
      generateTransactionItems(status);
    });
  },
};

export default collaboratorDashboardTransaction;
