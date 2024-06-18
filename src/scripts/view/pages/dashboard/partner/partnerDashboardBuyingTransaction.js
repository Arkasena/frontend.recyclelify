import Auth from '../../../../utils/auth';
import { setLayoutDashboard } from '../../../templates/template-creator';
import transactionStatus from '../../../../data/transaction-status';

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
    Auth.isPartner();
    setLayoutDashboard(2);
    const TransactionListComponent = document.querySelector('buying-transaction-list');

    try {
      const transactionsResponse = await fetch(`https://backend-recyclelify.vercel.app/api/transactions?sellerId=${Cookies.getUserId()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.getToken()}`,
        },
      });

      const transactions = await transactionsResponse.json();

      const generateTransactionItems = (status) => {
        const transactionList = TransactionListComponent.querySelector('#buying-transaction-list');
        transactionList.innerHTML = '';
        transactions.data.forEach((data) => {
          if (transactionStatus[data.status] === status) {
            const transactionItem = document.createElement('div');
            transactionItem.classList.add('w-full', 'h-full', 'grid', 'grid-cols-12', 'px-8', 'py-4', 'mt-4', 'hover:bg-gray-100', 'rounded-lg');
            transactionItem.innerHTML = `
              <div class="flex flex-row col-span-3 gap-4 items-center">
                <img src="${data.buyer.photo}" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
                <p class="text-sm font-regular break-words">${data.buyer.name}</p>
              </div>
              <div class="grid grid-cols-4 col-span-5">
                <p class="flex items-center justify-center text-sm font-regular text-gray-400 break-words">${data.updatedAt}</p>
                <p class="flex items-center justify-center text-sm font-regular break-words">${data.weight} kg</p>
                <p class="flex items-center justify-center text-sm font-regular break-words">Rp. ${data.weight * data.pricePerKilogram}</p>
                <p class="flex items-center justify-center text-sm font-regular break-words">${transactionStatus[data.status]}</p>
              </div>
              <div class="grid grid-cols-3 col-span-4 justify-end">
                ${transactionStatus[data.status] === 'Dikirim' ? `
                  <div class="flex justify-center">
                    <bordered-button name="Terima" linkTo=""></bordered-button>
                  </div>
                  <div class="flex justify-center">
                    <bordered-button name="Tolak" linkTo=""></bordered-button>
                  </div>
                ` : ''}
                <div class="flex ${transactionStatus[data.status] === 'Dikirim' ? 'justify-end' : 'justify-center col-span-3'}">
                  <bordered-button name="Lihat Detail" linkTo=""></bordered-button>
                </div>
              </div>
            `;
            transactionList.append(transactionItem);
          }
        });
      };

      generateTransactionItems('Dikirim');

      const menuTabComponent = document.querySelector('dashboard-menu-tab-buying-transaction');
      menuTabComponent.addEventListener('tab-changed', (event) => {
        const { status } = event.detail;
        generateTransactionItems(status);
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default partnerDashboardBuyingTransaction;
