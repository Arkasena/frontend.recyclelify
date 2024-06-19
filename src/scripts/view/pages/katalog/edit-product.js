import ProductResources from '../../../data/product-resources';
import UrlParser from '../../../routes/url-parser';
import { setLayoutDefault } from '../../templates/template-creator';

const editProduct = {
  async render() {
    return `
    <section class="w-full flex flex-col item-center justify-center grow pb-10">
    <div id="loading" class="flex w-full grow items-center justify-center">
                <div class="loading"></div>
            </div>
            <div class="w-full max-w-[1500px] flex flex-col px-6" id="content">
            </div>
        </section>  
          `;
  },

  async afterRender() {
    setLayoutDefault();
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const loading = document.getElementById('loading');
    try {
      const product = await ProductResources.detailProduct(url.id, 'relations=categories');
      console.log(product);
      if (!product) {
        loading.remove();
        const alert = document.createElement('error-alert');
        alert.alertData = {
          header: 'Produk tidak ditemukan!',
          desc: 'Produk yang di cari tidak dapat ditemukan',
          button: 'Kembali',
          link: '#/my-profile',
        };
        document.querySelector('main').append(alert);
      } else {
        loading.remove();
        const formProduk = document.createElement('form-produk');
        document.querySelector('#content').append(formProduk);
        // const productCategories = ['Aksesoris', 'Dekorasi', 'Busana', 'Furnitur', 'Lainnya'];
        const currentData = {
          name: product.name,
          price: product.price,
          link: product.link,
          description: product.description,
          category: product.categories.map((item) => item.category.name.toLowerCase()),
        };
        console.log(currentData);
        formProduk.formData = currentData;
        const form = document.querySelector('#productForm');
        const inputId = document.createElement('input');
        inputId.setAttribute('type', 'hidden');
        inputId.setAttribute('name', 'id');
        inputId.setAttribute('id', 'id');
        form.append(inputId);
        form.elements.id.value = product.id;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      loading.style.display = 'none';
    }
  },
};

export default editProduct;
// page bakal buat halaman baru
