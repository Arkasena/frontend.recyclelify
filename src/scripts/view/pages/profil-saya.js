import { setLayoutDefault } from '../templates/template-creator';

const profilSaya = {
  async render() {
    return `
    <section class="w-full flex justify-center">
          
        </section>
          `;
  },

  async afterRender() {
    setLayoutDefault();
    const section = document.querySelector('section');
    const myProfile = document.createElement('my-profile');
    const partnerData = {
      id: 6969,
      username: 'ptasriindah',
      name: 'PT Asri Indah',
      description: 'PT Asri Indah fokus mendaur ulang  PVC dan limbah plastik lainnya. Daur ulang (PVC) dapat digunakan untuk membuat banyak produk baru, termasuk Polyester staple fiber /filamen yang digunakan untuk pakaian, tekstil rumah (selimut, bantal, karpet), suku cadang otomotif (karpet, insulasi suara, lapisan boot, sarung jok) dan barang-barang keperluan industri (geotekstil dan insulasi atap), dan kemasan botol PVC baru untuk produk makanan dan non-makanan. Ini umumnya dicampur dalam rasio virgin PVC untuk didaur ulang, tergantung pada aplikasi yang diperlukan.',
      phone_number: 882233334455,
      email: 'contact@asriindah.com',
      address: 'Komplek Industri Trikencana Kav.12A Cilampeni Katapang, Bandung',
      website: 'ptasriindah.com',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR00ZT1jtWcl-wpBOre7RCPoL-_DicUYQnrOw&s',
      price: 5000,
      plasticType: 'PVC',
    };
    myProfile.userData = partnerData;
    section.append(myProfile);
    const katalogContainer = document.querySelector('#katalogContainer');
    const katalogData = {
      endpoint: 'my-product/2929',
      photo: 'https://www.purwakartapost.co.id/wp-content/uploads/2019/06/Daur-Ulang-Sampah-Plastik.jpeg',
      name: 'Tote Bag',
      description: 'Terbuat dari bahan plastik PVC daur ulang berkualitas tinggi, totebag ini merupakan pilihan sempurna untuk anda',
      price: 30000,
    };
    for (let i = 0; i < 4; i += 1) {
      const katalogItem = document.createElement('katalog-item');
      katalogItem.setAttribute('id', i);
      katalogItem.katalogData = katalogData;
      katalogContainer.append(katalogItem);
    }
  },
};

export default profilSaya;
// page bakal buat halaman baru
