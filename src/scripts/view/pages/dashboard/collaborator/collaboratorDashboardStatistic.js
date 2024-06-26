import Auth from '../../../../utils/auth';
import { setLayoutDashboard } from '../../../templates/template-creator';
import Cookies from '../../../../utils/cookies.';

const collaboratorDashboardStatistic = {
  async render() {
    return `
      <section class="pb-10 px-[32px] py-[25px] w-full bg-gray-50">
        <div class="flex flex-row justify-between">
          <p class="text-lg font-medium self-center">Analisis Statistik</p>
          <month-dropdown-menu-statistic></month-dropdown-menu-statistic>
        </div>
        <div class="grid grid-row-2 gap-10">
          <div class="w-full bg-white rounded-2xl p-6 gap-6 flex flex-col">
            <div id="analysis-container" class="grid grid-cols-12 w-full justify-between gap-4">
              <div class="col-span-5">
                <sales-recap></sales-recap>
              </div>
              <div class="col-span-7">
                <selling-statistic-analysis></selling-statistic-analysis>
              </div>
            </div>
            <div id="closing-analysis" class="grid grid-cols-3 justify-between items-center">
              <p class="col-span-2">
                Jangan berhenti sekarang! Setiap tindakan kecil membawa perubahan besar. Teruslah menjadi pahlawan lingkungan!
              </p>
              <solid-button name="Unduh Analisis Statistik" linkTo="#" class="justify-self-end"></solid-button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-8 justify-between">
          <div class="flex flex-col gap-2">
            <p class="text-lg font-medium">Statistik Penjualan</p>
            <bar-chart></bar-chart>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-lg font-medium">Statistik Pendapatan</p>
            <line-chart></line-chart>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    Auth.isCollaborator();
    setLayoutDashboard(1);

    try {
      const statistic = await fetch(`https://backend-recyclelify.vercel.app/api/statistic/sales/${Cookies.getUserId()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.getToken()}`,
        },
      });

      const {
        totalWeightThisMonth, totalIncomeThisMonth, salesRecapData,
      } = await statistic.json();

      // input data ke barchart
      const barChartComponent = document.querySelector('bar-chart');
      const barChartData = {
        labels: ['Minggu-1', 'Minggu-2', 'Minggu-3', 'Minggu-4', 'Minggu-5'],
        datasets: [
          {
            label: 'Total Sampah',
            data: totalWeightThisMonth,
            backgroundColor: '#65A30D',
            borderColor: '#65A30D',
            borderRadius: 4,
          },
        ],
      };
      barChartComponent.chartData = barChartData;

      // input data ke linechart
      const lineChartComponent = document.querySelector('line-chart');
      const lineChartData = {
        labels: ['Minggu-1', 'Minggu-2', 'Minggu-3', 'Minggu-4', 'Minggu-5'],
        datasets: [
          {
            label: 'Pendapatan',
            data: totalIncomeThisMonth,
            backgroundColor: '#65A30D',
            borderColor: '#65A30D',
            borderWidth: 1,
            borderRadius: 20,
          },
        ],
      };
      lineChartComponent.chartData = lineChartData;

      // input data kedalam sales-recap
      const salesRecapComponent = document.querySelector('sales-recap');

      salesRecapComponent.salesRecapData = salesRecapData;

      // statistic analysis
      const statisticAnalysis = document.querySelector('buying-statistic-analysis');
      statisticAnalysis.statisticAnalysisData = { totalWeight: salesRecapData.totalWeight };

      const closingAnalysisDiv = document.getElementById('closing-analysis');
      const statisticContainer = document.getElementById('detail-analysis');
      const headerText = document.getElementById('headertext-analysis');
      const subHeaderText = document.getElementById('subheadertext-analysis');

      if (salesRecapData.totalWeight !== 0) {
        closingAnalysisDiv.style.display = 'grid';
        const analysisHTML = `
          <div class="flex flex-row gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            <p id="trash-analysis"></p>
          </div>
          <div class="flex flex-row gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-orbit"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><path d="M10.4 21.9a10 10 0 0 0 9.941-15.416"/><path d="M13.5 2.1a10 10 0 0 0-9.841 15.416"/></svg>
            <p id="carbon-analysis"></p>
          </div>
          <div class="flex flex-row gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
            <p id="energy-analysis"></p>
          </div>
          <div class="flex flex-row gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fuel"><line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>
            <p id="oil-analysis"></p>
          </div>
          <div class="flex flex-row gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waves"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>
            <p id="sea-analysis"></p>
          </div>
        `;
        statisticContainer.innerHTML += analysisHTML;

        // deskripsi analisis statistik berdasarkan totalWeight
        if (salesRecapData.totalWeight >= 10 && salesRecapData.totalWeight <= 50) {
          document.getElementById('trash-analysis').innerHTML = 'Mengurangi sebanyak 2 kantong besar sampah plastik di TPA';
          document.getElementById('carbon-analysis').innerHTML = 'Mengurangi emisi karbon sebesar 1.5-7.5kg CO2e';
          document.getElementById('energy-analysis').innerHTML = 'Menghemat energi yang setara dengan 140-700kWh';
          document.getElementById('oil-analysis').innerHTML = 'Menghemat sekitar 10-50 liter minyak bumi';
          document.getElementById('sea-analysis').innerHTML = 'Menyelamatkan 1-5 penyu dari memakan plastik';
        } else if (salesRecapData.totalWeight >= 51 && salesRecapData.totalWeight <= 100) {
          document.getElementById('trash-analysis').innerHTML = 'Mengurangi sebanyak 4-8 kantong besar sampah plastik di TPA';
          document.getElementById('carbon-analysis').innerHTML = 'Mengurangi emisi karbon sebesar 7.5-15kg CO2e';
          document.getElementById('energy-analysis').innerHTML = 'Menghemat energi yang setara dengan 700-1400 kWh';
          document.getElementById('oil-analysis').innerHTML = 'Menghemat sekitar 50-100 liter minyak bumi';
          document.getElementById('sea-analysis').innerHTML = 'Mencegah 5-10 burung laut dari memakan plastik';
        } else if (salesRecapData.totalWeight >= 101 && salesRecapData.totalWeight <= 300) {
          document.getElementById('trash-analysis').innerHTML = 'Mengurangi sebanyak 8-20 kantong besar sampah plastik di TPA';
          document.getElementById('carbon-analysis').innerHTML = 'Mengurangi emisi karbon sebesar 15-45kg CO2e';
          document.getElementById('energy-analysis').innerHTML = 'Menghemat energi yang setara dengan 1400-4200 kWh';
          document.getElementById('oil-analysis').innerHTML = 'Menghemat sekitar 100-300 liter minyak bumi';
          document.getElementById('sea-analysis').innerHTML = 'Menyelamatkan 10-30 lumba-lumba dari terjerat jaring plastik';
        } else if (salesRecapData.totalWeight >= 301 && salesRecapData.totalWeight <= 600) {
          document.getElementById('trash-analysis').innerHTML = 'Mengurangi sebanyak 20-40 kantong besar sampah plastik di TPA';
          document.getElementById('carbon-analysis').innerHTML = 'Mengurangi emisi karbon sebesar 45-90kg CO2e';
          document.getElementById('energy-analysis').innerHTML = 'Menghemat energi yang setara dengan 4200-8400 kWh';
          document.getElementById('oil-analysis').innerHTML = 'Menghemat sekitar 300-600 liter minyak bumi';
          document.getElementById('sea-analysis').innerHTML = 'Menyelamatkan 30-60 anjing laut dari terlilit plastik';
        } else {
          document.getElementById('trash-analysis').innerHTML = 'Mengurangi sebanyak 40-80 kantong besar sampah plastik di TPA';
          document.getElementById('carbon-analysis').innerHTML = 'Mengurangi emisi karbon sebesar 90-150kg CO2e';
          document.getElementById('energy-analysis').innerHTML = 'Menghemat energi yang setara dengan 8400-14000 kWh';
          document.getElementById('oil-analysis').innerHTML = 'Menghemat sekitar 600-1000 liter minyak bumi';
          document.getElementById('sea-analysis').innerHTML = 'Menyelamatkan 60-100 paus dari mengonsumsi plastik';
        }
      } else {
        headerText.textContent = 'Sepertinya Anda belum memulai untuk menjual sampah';
        subHeaderText.textContent = 'Tidak masalah, karena sekaranglah waktu yang tepat untuk beraksi! Jual sampah plastik Anda dan lihatlah seberapa jauh kontribusi luar biasa yang sudah Anda berikan untuk lingkungan! Dengan setiap langkah kecil, kita mendekatkan diri pada masa depan yang lebih bersih dan hijau';
        closingAnalysisDiv.style.display = 'none';
      }
    } catch (error) {
      console.error('PARTNER DASHBOARD STATISTIC:', error);
    }
  },
};

export default collaboratorDashboardStatistic;
