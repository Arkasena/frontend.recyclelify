import sortbutton from '../../../utils/sortbutton-function';
import { mainPages, setLayoutDefault } from '../../templates/template-creator';

const mitra = {
  async render() {
    return mainPages('mitraContainer');
  },

  async afterRender() {
    setLayoutDefault();
    const section = document.querySelector('#hero');
    const hero = document.createElement('hero-element');
    hero.heroData = {
      header: 'Langkah Berarti Menuju Lingkungan yang Lebih Hijau!',
      firstDesc: 'Jual beli sampah bukan sekadar transaksi, tapi juga sebuah petualangan untuk menuju masa depan yang bersih dan berkelanjutan.',
      lastDesc: 'Temukan rekanan terbaik untuk menjual sampah Anda dengan mudah dan cepat',
      placeholder: 'Cari kolaborator yang tepat untuk menjual sampahmu',
    };
    section.append(hero);
    const filterContainer = document.querySelector('#filterContainer');
    filterContainer.innerHTML = '<filter-mitra></filter-mitra>';
    const mitraContainer = document.querySelector('#mitraContainer');
    const data = {
      id: 1231231,
      photo: 'https://cdn.acehonline.co/files/images/wp-ilustrasi-sampah.jpg',
      name: 'PT Asri Indah',
      description: 'PT Asri Indah fokus mendaur ulang  PVC dan limbah plastik Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem possimus maiores, dolores in tenetur dolorum eligendi architecto impedit facilis consequatur eaque perspiciatis debitis quasi voluptas ullam eveniet autem neque mollitia.',
      price: 3000,
      address: 'Bandung',
      material: 'PVC',
    };
    for (let i = 0; i < 6; i += 1) {
      const mitraItem = document.createElement('mitra-item');
      mitraItem.setAttribute('id', i);
      mitraItem.mitraData = data;
      mitraContainer.append(mitraItem);
    }
    const sortButton = document.querySelector('#sort');
    sortbutton(sortButton);
    const currentUrl = new URLSearchParams((window.location.href).split('?')[1]);
    let curentPages;
    if (currentUrl.has('page')) {
      curentPages = currentUrl.get('page');
    } else {
      curentPages = 1;
    }
    if (currentUrl.has('search')) {
      document.querySelector('#title').innerHTML = `Hasil pencarian untuk "${currentUrl.get('search')}"`;
    }
    const contentContainer = document.querySelector('#contentContainer');
    const pagination = document.createElement('pagination-bar');
    pagination.dataPages = { totalPage: 20, curentPage: Number(curentPages) };
    contentContainer.append(pagination);
  },
};

export default mitra;
