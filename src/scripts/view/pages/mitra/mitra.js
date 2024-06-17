/* eslint-disable max-len */
import UserResources from '../../../data/user-resources';
import Cookies from '../../../utils/cookies.';
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
    const mitraContainer = document.querySelector('#mitraContainer');
    const filterContainer = document.querySelector('#filterContainer');
    const loading = document.getElementById('loading');
    filterContainer.innerHTML = '<filter-mitra></filter-mitra>';
    hero.heroData = {
      header: 'Langkah Berarti Menuju Lingkungan yang Lebih Hijau!',
      firstDesc: 'Jual beli sampah bukan sekadar transaksi, tapi juga sebuah petualangan untuk menuju masa depan yang bersih dan berkelanjutan.',
      lastDesc: 'Temukan rekanan terbaik untuk menjual sampah Anda dengan mudah dan cepat',
      placeholder: 'Cari kolaborator yang tepat untuk menjual sampahmu',
    };
    section.append(hero);
    const currentUrl = new URLSearchParams((window.location.href).split('?')[1]);
    const sortButton = document.querySelector('#sort');
    sortbutton(sortButton);
    try {
      const allPartner = await UserResources.partner(currentUrl.toString());
      loading.style.display = 'none';
      (allPartner.data).forEach((partner) => {
        const mitraItem = document.createElement('mitra-item');
        mitraItem.setAttribute('id', partner.id);
        mitraItem.mitraData = {
          id: partner.id,
          photo: partner.photo,
          name: partner.name,
          description: partner.description,
          price: partner.acceptanceRules && partner.acceptanceRules.length > 0 ? partner.acceptanceRules[0].pricePerKilogram : '0',
          address: (partner.address).split('+')[1],
          material: partner.acceptanceRules && partner.acceptanceRules.length > 0 ? { name: partner.acceptanceRules[0].plastic.name, total: partner.acceptanceRules.length } : null,
        };
        mitraContainer.append(mitraItem);
      });
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
      pagination.dataPages = {
        totalPage: allPartner.meta.page.last,
        curentPage: Number(curentPages),
      };
      contentContainer.append(pagination);
    } catch (error) {

    }
  },
};

export default mitra;
