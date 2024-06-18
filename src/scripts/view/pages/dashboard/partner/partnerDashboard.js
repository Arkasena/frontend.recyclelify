import { setLayoutDashboard } from '../../../templates/template-creator';
import Cookies from '../../../../utils/cookies.';

const partnerDashboard = {
  async render() {
    return `
      <section class="flex pb-10 px-[32px] py-[25px] bg-gray-50 w-full">
        <div class="grid grid-cols-2 gap-4 w-full">
            <div class="flex flex-col gap-2">
              <p class="text-lg font-medium">Transaksi Pembelian Terakhir</p>
              <last-transaction></last-transaction>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-lg font-medium">Rekap Pembelian</p>
              <sales-recap></sales-recap>
            </div>
        
            <div class="flex flex-col gap-2">
              <p class="text-lg font-medium">Statistik Pembelian Sampah</p>
              <bar-chart></bar-chart>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-lg font-medium">Statistik Pendapatan</p>
              <line-chart></line-chart>
            </div>
        </div>
      </section>`;
  },

  async afterRender() {
    setLayoutDashboard(2);

    try {
      const {
        lastTransactions, totalWeightThisMonth, totalIncomeThisMonth, salesRecapData,
      } = await fetch(`https://backend-recyclelify.vercel.app/api/statistic/purchase/${Cookies.getUserId()}`);

      const lastTransactionComponent = document.querySelector('last-transaction');

      await lastTransactions.forEach((transaction) => {
        const transactionItem = document.createElement('div');
        transactionItem.classList.add('grid', 'grid-cols-5', 'gap-2', 'content-center', 'justify-between', 'w-full', 'h-full');
        transactionItem.innerHTML = `
          <div class="flex flex-col gap-4 w-full h-full col-span-2 md:flex-row">
            <img src="${transaction.partner.photo}" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col place-content-center">
              <p class="text-sm font-medium break-words">${transaction.partner.name}</p>
              <p class="text-sm font-regular text-gray-400 break-words">${transaction.updatedAt}</p>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 col-span-3 w-full items-center">
            <p class="text-sm font-regular break-words">${transaction.weight} kg</p>
            <p class="text-sm font-regular break-words">Rp. ${transaction.weight * transaction.pricePerKilogram}</p>
            <p class="text-sm font-regular break-words">${transaction.status}</p>
          </div>
        `;
        lastTransactionComponent.querySelector('#transaction-list').append(transactionItem);
      });

      // Bar chart
      const barChartComponent = document.querySelector('bar-chart');
      const barChartData = {
        labels: ['Minggu-1', 'Minggu-2', 'Minggu-3', 'Minggu-4', 'Minggu-5'],
        datasets: [
          {
            label: 'Total Sampah',
            data: await totalWeightThisMonth,
            backgroundColor: '#65A30D',
            borderColor: '#65A30D',
            borderRadius: 8,
          },
        ],
      };
      barChartComponent.chartData = barChartData;

      // Line chart
      const lineChartComponent = document.querySelector('line-chart');
      const lineChartData = {
        labels: ['Minggu-1', 'Minggu-2', 'Minggu-3', 'Minggu-4', 'Minggu-5'],
        datasets: [
          {
            label: 'Pendapatan',
            data: await totalIncomeThisMonth,
            backgroundColor: '#65A30D',
            borderColor: '#65A30D',
            borderWidth: 1,
            borderRadius: 20,
          },
        ],
      };
      lineChartComponent.chartData = lineChartData;

      // Input data into sales-recap
      const salesRecapComponent = document.querySelector('sales-recap');

      salesRecapComponent.salesRecapData = await salesRecapData;
    } catch (error) {
      console.error('PARTNER DASHBOARD STATISTIC:', error);
    }
  },
};

export default partnerDashboard;
