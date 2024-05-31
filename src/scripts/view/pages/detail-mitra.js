import { setLayoutDefault } from '../templates/template-creator';

const detailMitra = {
  async render() {
    return `
    <section class="w-full flex justify-center pb-10">
            <div class="w-full max-w-[1500px] flex flex-col px-6">
                <div class="flex flex-row gap-4 items-center py-10 w-full">
                    <span class="text-lime-700 font-medium">Mitra</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="text-lime-700 font-medium">Pencarian</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span id="partnerNameContainer"></span>
                </div>
                <div class="flex flex-row w-full gap-36">
                    <div class="flex flex-col flex-grow" id="partnerInformationContainer">
                        
                    </div>
                    <div class="flex flex-col w-full" id="materialInformationContainer">
                    </div>   
                </div>
            </div>
        </section>  
          `;
  },

  async afterRender() {
    setLayoutDefault();
    const partnerData = {
      id: 6969,
      username: 'ptasriindah',
      name: 'PT Asri Indah',
      description: 'PT Asri Indah fokus mendaur ulang  PVC dan limbah plastik lainnya. Daur ulang (PVC) dapat digunakan untuk membuat banyak produk baru, termasuk Polyester staple fiber /filamen yang digunakan untuk pakaian, tekstil rumah (selimut, bantal, karpet), suku cadang otomotif (karpet, insulasi suara, lapisan boot, sarung jok) dan barang-barang keperluan industri (geotekstil dan insulasi atap), dan kemasan botol PVC baru untuk produk makanan dan non-makanan. Ini umumnya dicampur dalam rasio virgin PVC untuk didaur ulang, tergantung pada aplikasi yang diperlukan.',
      phone_number: 882233334455,
      email: 'contact@asriindah.com',
      address: 'Komplek Industri Trikencana Kav.12A Cilampeni Katapang Bandung',
      website: 'ptasriindah.com',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR00ZT1jtWcl-wpBOre7RCPoL-_DicUYQnrOw&s',
    };
    // deklarasi all container
    const partnerNameContainer = document.querySelector('#partnerNameContainer');
    const partnerInformationContainer = document.querySelector('#partnerInformationContainer');
    const materialInformationContainer = document.querySelector('#materialInformationContainer');
    // end deklarasi - start isi > nama mitra
    partnerNameContainer.innerHTML = partnerData.name;
    // end isi nama mitra - start menambah detail mitra ke kontainer
    const detailMitraContent = document.createElement('detail-mitra');
    detailMitraContent.partnerData = partnerData;
    detailMitraContent.classList.add('flex', 'flex-col', 'gap-8', 'w-full');
    partnerInformationContainer.append(detailMitraContent);
    // end tambah detail mitra - start tambah info sampah
    const allMaterial = ['pet', 'hdpe', 'pvc', 'hdpe', 'pvc', 'hdpe'];
    const infoSampah = document.createElement('info-sampah');
    infoSampah.materialType = allMaterial;
    materialInformationContainer.append(infoSampah);
    // end button jenis sampah
  },
};

export default detailMitra;
