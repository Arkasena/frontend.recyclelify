import ProductResources from '../../../data/product-resources';
import UserResources from '../../../data/user-resources';
import UrlParser from '../../../routes/url-parser';
import { setLayoutDefault } from '../../templates/template-creator';

const detailKatalog = {
  async render() {
    return `
      <section class="w-full flex flex-col items-center grow pb-10">
        <div id="loading" class="flex w-full grow items-center justify-center">
          <div class="loading"></div>
        </div>
        <div class="w-full max-w-[1500px] flex flex-col px-6" id="content">
          <div id="detailCatalogContainer"></div>
        </div>
      </section>  
    `;
  },

  async afterRender() {
    setLayoutDefault();
    const contentContainer = document.querySelector('#content');
    const detailCatalogContainer = document.getElementById('detailCatalogContainer');
    const loading = document.getElementById('loading');
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const product = await ProductResources.detailProduct(url.id, 'relations=partner');
      if (!product) {
        loading.remove();
        const alert = document.createElement('error-alert');
        alert.alertData = {
          header: 'Produk tidak ditemukan!',
          desc: 'Produk yang di cari tidak dapat ditemukan',
          button: 'Cari Produk',
          link: '#/catalog',
        };
        document.querySelector('main').append(alert);
      } else {
        const allProduct = await ProductResources.product();
        console.log(allProduct);
        loading.remove();
        const catalogData = {
          photo: product.photo,
          name: product.name,
          description: product.description,
          price: product.price,
          link: product.link,
          partnerName: product.partner.name,
          partnerUsername: product.partner.username,
          partnerDescription: product.partner.description,
          partnerEmail: product.partner.email,
          partnerPhoto: product.partner.photo,
          partnerAddress: (product.partner.address).replaceAll('+', ', '),
          partnerPhoneNumber: product.partner.phoneNumber,
          partnerWebsite: product.partner.website,
        };
        const detailCatalog = document.createElement('detail-katalog');
        detailCatalog.catalogData = catalogData;
        detailCatalog.addEventListener('detailCatalogRendered', () => {
          const otherProduct = detailCatalog.querySelector('#otherProduct');
          const productCategories = ['Aksesoris', 'Dekorasi', 'Busana', 'Furnitur', 'Lainnya'];
          for (let i = 0; i < 4; i += 1) {
            const katalogItem = document.createElement('katalog-item');
            katalogItem.setAttribute('id', (allProduct.data)[i].id);
            katalogItem.katalogData = {
              endpoint: `catalog/${(allProduct.data)[i].id}`,
              photo: (allProduct.data)[i].photo,
              name: (allProduct.data)[i].name,
              description: (allProduct.data)[i].description,
              price: (allProduct.data)[i].price,
              category: { name: productCategories[Number(allProduct.data[i].categories[0].categoryId) - 1], total: allProduct.data[i].categories.length },
            };
            katalogItem.classList.add('w-full');
            otherProduct.append(katalogItem);
          }
        });

        contentContainer.insertAdjacentHTML('afterbegin', `
          <div class="flex flex-row gap-4 items-center py-10 w-full">
            <span class="text-lime-700 font-medium">Katalog</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            <span class="text-lime-700 font-medium">Pencarian</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            <span id="productNameContainer">${product.name}</span>
          </div>
        `);
        detailCatalogContainer.append(detailCatalog);
        detailCatalog.dispatchEvent(new Event('detailCatalogRendered'));
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  },
};

export default detailKatalog;
