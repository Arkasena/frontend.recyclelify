import { setLayoutDefault } from '../../templates/template-creator';

const detailKatalog = {
  async render() {
    return `
    <section class="w-full flex justify-center pb-10">
            <div class="w-full max-w-[1500px] flex flex-col px-6" id="content">
                <div class="flex flex-row gap-4 items-center py-10 w-full">
                    <span class="text-lime-700 font-medium">Katalog</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span class="text-lime-700 font-medium">Pencarian</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    <span id="productNameContainer"></span>
                </div>
                
            </div>
        </section>  
          `;
  },

  async afterRender() {
    setLayoutDefault();
    const catalogData = {
      photo: 'https://www.purwakartapost.co.id/wp-content/uploads/2019/06/Daur-Ulang-Sampah-Plastik.jpeg',
      name: 'Totebag',
      description: `Terbuat dari bahan plastik PVC daur ulang berkualitas tinggi, totebag ini merupakan pilihan sempurna untuk anda. Desainnya yang sederhana dan serbaguna membuatnya cocok untuk digunakan di berbagai kesempatan, dari belanja harian hingga pergi ke kantor atau piknik akhir pekan.
                    
      Spesifikasi :
      • Dimensi tas: 38,5cm x 13,5cm x 37cm
      • Kuat, tahan lama, dan mudah dibersihkan.
      • Muat untuk banyak barang, termasuk laptop ukuran 15/16 inch.
      • Terdapat kantong dalam yang cukup untuk diisi tablet/ipad/notebook.`,
      price: 30000,
      partnerName: 'PT Asri Indah',
      partnerUsername: 'ptasriindah',
      partnerDescription: 'PT Asri Indah fokus mendaur ulang  PVC dan limbah plastik lainnya. Daur ulang (PVC) dapat digunakan untuk membuat banyak produk baru, termasuk Polyester staple fiber /filamen yang digunakan untuk pakaian, tekstil rumah (selimut, bantal, karpet), suku cadang otomotif (karpet, insulasi suara, lapisan boot, sarung jok) dan barang-barang keperluan industri (geotekstil dan insulasi atap), dan kemasan botol PVC baru untuk produk makanan dan non-makanan. Ini umumnya dicampur dalam rasio virgin PVC untuk didaur ulang, tergantung pada aplikasi yang diperlukan.',
      partnerEmail: 'contact@asriindah.com',
      partnerPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR00ZT1jtWcl-wpBOre7RCPoL-_DicUYQnrOw&s',
      partnerAddress: 'Komplek Industri Trikencana Kav.12A Cilampeni Katapang Bandung',
      partnerPhoneNumber: 89897638382,
      partnerWebsite: 'ptasriindah.com',
    };
    const productNameContainer = document.querySelector('#productNameContainer');
    const contentContainer = document.querySelector('#content');
    productNameContainer.innerHTML = catalogData.name;

    const detailCatalog = document.createElement('detail-katalog');
    detailCatalog.catalogData = catalogData;
    contentContainer.append(detailCatalog);
    const katalogData = {
      endpoint: 'catalog/2929',
      photo: 'https://www.purwakartapost.co.id/wp-content/uploads/2019/06/Daur-Ulang-Sampah-Plastik.jpeg',
      name: 'Tote Bag',
      description: 'Terbuat dari bahan plastik PVC daur ulang berkualitas tinggi, totebag ini merupakan pilihan sempurna untuk anda',
      price: 30000,
    };
    const otherProduct = document.querySelector('#otherProduct');
    for (let i = 0; i < 4; i += 1) {
      const katalogItem = document.createElement('katalog-item');
      katalogItem.setAttribute('id', i);
      katalogItem.katalogData = katalogData;
      katalogItem.classList.add('w-full');
      otherProduct.append(katalogItem);
    }
  },
};

export default detailKatalog;
// page bakal buat halaman baru
