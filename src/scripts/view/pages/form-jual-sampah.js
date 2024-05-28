const formJualSampah = {
  async render() {
    return `
    <section class="w-full flex justify-center pb-10">
            <div class="w-full max-w-[1500px] flex flex-col px-6" id="content">
                <div class="flex flex-row gap-4 items-center py-10 w-full">
                    <span class="text-lime-700 font-medium">Katalog</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="text-lime-700 font-medium">Pencarian</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span id="productNameContainer" class="text-lime-700 font-medium">PT Asri Indah</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="text-gray-400">Formulir Penjualan</span>
                </div>
                <div class="flex flex-row w-full gap-36">
                    <div class="flex flex-col flex-grow" id="formContent">
                        
                        <form-penjualan></form-penjualan>
                        
                    </div>
                    <div class="flex flex-col" id="materialInformationContainer">
    
                    </div>   
                </div>
            </div>
        </section>  
          `;
  },

  async afterRender() {
    const materialInformationContainer = document.querySelector('#materialInformationContainer');
    const allMaterial = ['pet', 'hdpe', 'pvc', 'hdpe', 'pvc', 'hdpe'];
    const infoSampah = document.createElement('info-sampah');
    infoSampah.materialType = allMaterial;
    materialInformationContainer.append(infoSampah);

  },
};

export default formJualSampah;
// page bakal buat halaman baru
