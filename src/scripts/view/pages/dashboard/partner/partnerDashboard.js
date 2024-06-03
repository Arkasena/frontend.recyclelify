import { setLayoutDashboard } from '../../../templates/template-creator';

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
    setLayoutDashboard();
    const lastTransactionComponent = document.querySelector('last-transaction');
    const data = {
      company_image: 'https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj',
      company_name: 'PT Asri Indah',
      price: 150000,
      status: 'Diproses',
      date: '23 April 2024',
      weight: 30,
    };

    for (let i = 0; i < 3; i += 1) {
      const transactionItem = document.createElement('div');
      transactionItem.classList.add('grid', 'grid-cols-5', 'gap-2', 'content-center', 'justify-between', 'w-full', 'h-full');
      transactionItem.innerHTML = `
        <div class="flex flex-col gap-4 w-full h-full col-span-2 md:flex-row">
          <img src="${data.company_image}" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
          <div class="flex flex-col place-content-center">
            <p class="text-sm font-medium break-words">${data.company_name}</p>
            <p class="text-sm font-regular text-gray-400 break-words">${data.date}</p>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 col-span-3 w-full items-center">
          <p class="text-sm font-regular break-words">${data.weight} kg</p>
          <p class="text-sm font-regular break-words">Rp. ${data.price}</p>
          <p class="text-sm font-regular break-words">${data.status}</p>
        </div>
      `;
      lastTransactionComponent.querySelector('#transaction-list').append(transactionItem);
    }
    // Bar chart
    const barChartComponent = document.querySelector('bar-chart');
    const barChartData = {
      labels: ['Minggu-1', 'Minggu-2', 'Minggu-3', 'Minggu-4', 'Minggu-5'],
      datasets: [
        {
          label: 'Total Sampah',
          data: [30, 20, 30, 22, 10],
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
          data: [50000, 20000, 10000, 35000, 5000],
          backgroundColor: '#65A30D',
          borderColor: '#65A30D',
          borderWidth: 1,
          borderRadius: 20,
        },
      ],
    };
    lineChartComponent.chartData = lineChartData;

    // Calculate totalWeight, totalIncome from chart
    const totalWeight = barChartData.datasets[0].data.reduce((acc, value) => acc + value, 0);
    const totalIncome = lineChartData.datasets[0].data.reduce((acc, value) => acc + value, 0);

    // Input data into sales-recap
    const salesRecapComponent = document.querySelector('sales-recap');
    const salesRecapData = {
      total_weight: totalWeight,
      total_partner: 6,
      total_income: totalIncome,
      total_transaction: 50,
    };
    salesRecapComponent.salesRecapData = salesRecapData;
  },
};

export default partnerDashboard;
