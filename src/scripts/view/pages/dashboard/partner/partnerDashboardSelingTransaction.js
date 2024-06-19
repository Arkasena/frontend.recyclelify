import { format } from 'date-fns';
import Auth from '../../../../utils/auth';
import { setLayoutDashboard } from '../../../templates/template-creator';
import Cookies from '../../../../utils/cookies.';
import transactionStatus from '../../../../data/transaction-status';

const partnerDashboardSelingTransaction = {
  async render() {
    return `
    <section class="flex px-[32px] py-[25px]  bg-gray-50 w-full">
      <div class="w-full bg-white rounded-2xl p-6">
        <dashboard-menu-tab-selling-transaction></dashboard-menu-tab-selling-transaction>
        <selling-transaction-list></selling-transaction-list>
      </div>
    </section>
    `;
  },

  async afterRender() {
    Auth.isPartner();
    setLayoutDashboard(2);
    const TransactionListComponent = document.querySelector('selling-transaction-list');

    try {
      const transactionsResponse = await fetch(`https://backend-recyclelify.vercel.app/api/transactions?sellerId=${Cookies.getUserId()}&relations=buyer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.getToken()}`,
        },
      });

      const transactions = await transactionsResponse.json();

      const generateTransactionItems = (status) => {
        const transactionList = TransactionListComponent.querySelector('#selling-transaction-list');
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
              <div class="grid grid-cols-5 col-span-9 justify-between items-center">
                <p class="text-sm font-regular text-gray-400 break-words">${format(data.updatedAt, 'dd MMM yyyy')}</p>
                <p class="text-sm font-regular break-words">${data.weight} kg</p>
                <p class="text-sm font-regular break-words">Rp. ${data.weight * data.pricePerKilogram}</p>
                <p class="text-sm font-regular break-words">${transactionStatus[data.status]}</p>
                <bordered-button name="Lihat Detail" linkTo=""></bordered-button>
              </div>
            `;
            transactionList.append(transactionItem);
          }
        });
      };

      generateTransactionItems('Dikirim');

      const menuTabComponent = document.querySelector('dashboard-menu-tab-selling-transaction');
      menuTabComponent.addEventListener('tab-changed', (event) => {
        const { status } = event.detail;
        generateTransactionItems(status);
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default partnerDashboardSelingTransaction;
