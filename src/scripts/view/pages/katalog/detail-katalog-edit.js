import { setLayoutDefault } from '../../templates/template-creator';

const detailKatalogEdit = {
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
      endpoint: 'my-product/2929',
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
    const productInfoContainer = document.querySelector('#productInfoContainer');
    const editButtonContainer = document.createElement('button');
    editButtonContainer.classList.add('absolute', 'top-0', 'right-0');
    editButtonContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>';
    editButtonContainer.addEventListener('click', () => {
      const dropdown = document.querySelector('#productAction');
      if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        dropdown.classList.add('flex');
      } else {
        dropdown.classList.remove('flex');
        dropdown.classList.add('hidden');
      }
    });
    productInfoContainer.innerHTML += `
    <div id="productAction" class="flex-col border shadow-md bg-white border-gray-200 rounded-lg py-2 w-[168px] absolute right-2  top-10 hidden">
            <a href="${window.location.href}/edit" class="p-3">Edit</a>
            <button id="hapus" class="p-3 text-left">Hapus</button>
        </div>
        <div id="hapusAction" class="w-full h-full bg-black/40 fixed left-0 top-0 z-50 hidden">
            <div class="flex justify-center ">
            <div class="flex w-fit flex-col justify-center items-center bg-white relative pt-16 pb-10 px-8 rounded-2xl top-36 gap-7">
                <button id="closeButton" class="absolute top-0 right-2 p-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <div class="flex flex-col items-center w-[354px] gap-4">
                    <h3 class="font-semibold text-center">Konfirmasi Hapus Produk</h3>
                    <span class="text-center">Apakah anda yakin ingin menghapus produk ini dari katalog?</span>
                </div>
                <div class="flex flex-row w-[354px] gap-2">
                    <button id="closeButton" class="w-full border border-lime-600 text-lime-600 h-10 rounded-xl">Tidak</button>
                    <button id="okButton" class="w-full bg-lime-600 text-gray-50 h-10 rounded-xl">Ya</button>
                </div>
            </div>
        </div>
        </div>
    `;
    productInfoContainer.append(editButtonContainer);
    document.querySelector('#hapus').addEventListener('click', () => {
      const div = document.querySelector('#hapusAction');
      if (div.classList.contains('hidden')) {
        div.classList.remove('hidden');
        div.classList.add('fixed');
      }
    });
    document.querySelectorAll('#closeButton').forEach((element) => {
      element.addEventListener('click', () => {
        const div = document.querySelector('#hapusAction');
        div.classList.remove('fixed');
        div.classList.add('hidden');
      });
    });
  },
};

export default detailKatalogEdit;
// page bakal buat halaman baru
