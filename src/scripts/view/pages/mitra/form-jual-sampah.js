import { setLayoutDefault } from '../../templates/template-creator';

const formJualSampah = {
  async render() {
    return `
    <section class="w-full flex justify-center pb-10">
            <div class="w-full max-w-[1500px] flex flex-col px-6" id="content">
                <div class="flex flex-row gap-4 items-center py-10 w-full">
                    <span class="text-lime-700 font-medium">Katalog</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="text-lime-700 font-medium">Pencarian</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span id="mitraNameContainer" class="text-lime-700 font-medium"></span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="text-gray-400">Formulir Penjualan</span>
                </div>
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
    const materialInformationContainer = document.querySelector('#materialInformationContainer');
    const allMaterial = ['pet', 'hdpe', 'pvc', 'hdpe', 'pvc', 'hdpe'];
    const infoSampah = document.createElement('info-sampah');
    infoSampah.materialType = allMaterial;
    materialInformationContainer.append(infoSampah);
    const formPenjualan = document.createElement('form-penjualan');
    const formContent = document.querySelector('#formContent');
    const partnerData = {
      id: (window.location.hash).split('/')[2],
      name: 'PT Asri Indah',
      phone_number: 88899991092,
      address: 'Komplek Industri Trikencana Kav.12A Cilampeni Katapang Bandung',
    };
    formPenjualan.partnerData = partnerData;
    formContent.append(formPenjualan);
    const mitraNameContainer = document.querySelector('#mitraNameContainer');
    mitraNameContainer.textContent = partnerData.name;
    document.querySelector('#linkJual').remove();
  },
};

export default formJualSampah;
// page bakal buat halaman baru
