import UserResources from '../../../data/user-resources';
import UrlParser from '../../../routes/url-parser';
import { setLayoutDefault } from '../../templates/template-creator';

const formJualSampah = {
  async render() {
    return `
    <section class="w-full flex flex-col items-center grow pb-10">
            <div id="loading" class="flex w-full grow items-center justify-center">
                <div class="loading"></div>
            </div>
            <div class="w-full max-w-[1500px] flex flex-col px-6" id="content">
                <div class="flex flex-col 890:flex-row w-full gap-8 lg:gap-16 xl:gap-36">
                    <div class="flex order-2 890:-order-10 flex-col flex-grow" id="formContent">
                        
                    </div>
                    <div class="flex flex-col 890:max-w-[352px]" id="materialInformationContainer">
                        
                    </div>   
                </div>
            </div>
        </section>  
          `;
  },

  async afterRender() {
    setLayoutDefault();
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const loading = document.getElementById('loading');
    try {
      const partner = await UserResources.detailPartner(url.id, 'relations=acceptanceRules');
      if (!partner) {
        loading.remove();
        const alert = document.createElement('error-alert');
        alert.alertData = {
          header: 'Mitra tidak ditemukan!',
          desc: 'Mitra yang di cari tidak dapat ditemukan',
          button: 'Cari Mitra',
          link: '#/find-partner',
        };
        document.querySelector('main').append(alert);
      } else {
        loading.remove();
        const jenisPlastic = ['PETE', 'HDPE', 'LDPE', 'PVC', 'PP', 'PS'];
        const acceptTrash = [];
        partner.acceptanceRules.forEach((rules) => {
          acceptTrash.push({
            name: jenisPlastic[Number(rules.plasticId) - 1],
            accept: rules.status,
            minimumTransactionWeight: rules.minimumTransactionWeight,
            maximumTransactionWeight: 999,
            pricePerKilogram: rules.pricePerKilogram,
          });
        });
        const materialInformationContainer = document.querySelector('#materialInformationContainer');
        const infoSampah = document.createElement('info-sampah');
        infoSampah.materialType = acceptTrash;
        materialInformationContainer.append(infoSampah);
        const formPenjualan = document.createElement('form-penjualan');
        const formContent = document.querySelector('#formContent');
        const partnerData = {
          id: url.id,
          name: partner.name,
          phone_number: partner.phoneNumber,
          address: (partner.address).replaceAll('+', ', '),
        };
        formPenjualan.partnerData = partnerData;
        formPenjualan.acceptRules = acceptTrash;
        formContent.append(formPenjualan);
        document.querySelector('#content').insertAdjacentHTML('afterbegin', `<div class="flex flex-row gap-4 items-center py-10 w-full"><span class="text-lime-700 font-medium">Mitra</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="text-lime-700 font-medium">Pencarian</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span>${partnerData.name}</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="text-gray-400">Formulir Penjualan</span></div>`);

        document.querySelector('#linkJual').remove();
      }
    } catch (error) {

    }
  },
};

export default formJualSampah;
// page bakal buat halaman baru
