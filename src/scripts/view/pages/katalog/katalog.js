import ProductResources from '../../../data/product-resources';
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
    const filterContainer = document.querySelector('#filterContainer');
    filterContainer.innerHTML = '<filter-katalog></filter-katalog>';
    const katalogContainer = document.querySelector('#katalogContainer');
    const loading = document.getElementById('loading');
    const currentUrl = new URLSearchParams((window.location.href).split('?')[1]);
    const sortButton = document.querySelector('#sort');
    sortbutton(sortButton);
    hero.heroData = {
      header: 'Jelajahi Produk Daur Ulang!',
      firstDesc: 'Dari perabotan hingga aksesoris, beragam produk berkualitas yang terbuat dari bahan daur ulang untuk mendukung gaya hidup ramah lingkungan.',
      lastDesc: 'Temukan rekanan terbaik untuk menjual sampah Anda dengan mudah dan cepat',
      placeholder: 'Cari produk',
    };
    section.append(hero);
    try {
      const allProduct = await ProductResources.product(currentUrl.toString());
      loading.style.display = 'none';
      (allProduct.data).forEach((product) => {
        const productCategories = ['Aksesoris', 'Dekorasi', 'Busana', 'Furnitur', 'Lainnya'];
        const productItem = document.createElement('katalog-item');
        productItem.setAttribute('id', product.id);
        productItem.katalogData = {
          endpoint: `catalog/${product.id}`,
          photo: product.photo,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.categories[0] ? { name: productCategories[Number(product.categories[0].categoryId) - 1], total: product.categories.length } : null,
        };
        katalogContainer.append(productItem);
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
        totalPage: allProduct.meta.page.last,
        curentPage: Number(curentPages),
      };
      contentContainer.append(pagination);
    } catch (error) {
      console.error('Error fetching data:', error);
      loading.style.display = 'none';
    }
  },
};

export default katalog;
// page bakal buat halaman baru
