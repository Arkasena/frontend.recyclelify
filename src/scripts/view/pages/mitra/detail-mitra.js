import UserResources from '../../../data/user-resources';
import UrlParser from '../../../routes/url-parser';
import { setLayoutDefault } from '../../templates/template-creator';

const detailMitra = {
  async render() {
    return `
   <section class="w-full flex grow flex-col items-center pb-10">
            <div id="loading" class="flex w-full grow items-center justify-center">
                <div class="loading"></div>
            </div>
            <div class="w-full max-w-[1500px] flex flex-col px-6">
                
                <div class="flex flex-row gap-4 items-center py-10 w-full" id="partnerNameContainer">
                    
                </div>
                <div class="flex flex-col 890:flex-row w-full gap-8 lg:gap-16 xl:gap-36">
                    <div class="flex flex-col" id="partnerInformationContainer">
                        
                    </div>
                    <div class="flex flex-col 890:max-w-[352px] 890:flex-grow w-full" id="materialInformationContainer">
                    </div>   
                </div>
            </div>
        </section>  
          `;
  },

  async afterRender() {
    setLayoutDefault();
    const partnerNameContainer = document.querySelector('#partnerNameContainer');
    const partnerInformationContainer = document.querySelector('#partnerInformationContainer');
    const materialInformationContainer = document.querySelector('#materialInformationContainer');
    const loading = document.getElementById('loading');
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
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
        const partnerData = {
          id: partner.id,
          username: partner.username,
          name: partner.name,
          description: partner.description,
          phoneNumber: (partner.phoneNumber).replaceAll('+62', ''),
          email: partner.email,
          address: (partner.address).replaceAll('+', ', '),
          website: partner.website,
          photo: partner.photo,
        };
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
        // end deklarasi - start isi > nama mitra
        partnerNameContainer.innerHTML = `<span class="text-lime-700 font-medium">Mitra</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="text-lime-700 font-medium">Pencarian</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span>${partnerData.name}</span>`;
        const detailMitraContent = document.createElement('detail-mitra');
        detailMitraContent.partnerData = partnerData;
        detailMitraContent.classList.add('flex', 'flex-col', 'gap-8', 'w-full');
        partnerInformationContainer.append(detailMitraContent);
        const infoSampah = document.createElement('info-sampah');
        infoSampah.materialType = acceptTrash;
        materialInformationContainer.append(infoSampah);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      loading.style.display = 'none';
    }
  },
};

export default detailMitra;
