import sortbutton from '../../../utils/sortbutton-function';
import { mainPages, setLayoutDefault } from '../../templates/template-creator';

const katalog = {
  async render() {
    return mainPages('katalogContainer');
  },

  async afterRender() {
    setLayoutDefault();
    const section = document.querySelector('#hero');
    const hero = document.createElement('hero-element');
    hero.heroData = {
      header: 'Jelajahi Produk Daur Ulang!',
      firstDesc: 'Dari perabotan hingga aksesoris, beragam produk berkualitas yang terbuat dari bahan daur ulang untuk mendukung gaya hidup ramah lingkungan.',
      lastDesc: 'Temukan rekanan terbaik untuk menjual sampah Anda dengan mudah dan cepat',
      placeholder: 'Cari produk',
    };
    section.append(hero);
    const filterContainer = document.querySelector('#filterContainer');
    filterContainer.innerHTML = '<filter-katalog></filter-katalog>';
    const katalogContainer = document.querySelector('#katalogContainer');
    const katalogData = {
      endpoint: 'catalog/2929',
      photo: 'https://www.purwakartapost.co.id/wp-content/uploads/2019/06/Daur-Ulang-Sampah-Plastik.jpeg',
      name: 'Tote Bag',
      description: 'Terbuat dari bahan plastik PVC daur ulang berkualitas tinggi, totebag ini merupakan pilihan sempurna untuk anda',
      price: 30000,
    };
    for (let i = 0; i < 6; i += 1) {
      const katalogItem = document.createElement('katalog-item');
      katalogItem.setAttribute('id', i);
      katalogItem.katalogData = katalogData;
      katalogContainer.append(katalogItem);
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

export default katalog;
// page bakal buat halaman baru
