import { setLayoutDefault } from '../templates/template-creator';

const editProduct = {
  async render() {
    return `
    <section class="w-full flex justify-center pb-10">
            <div class="w-full max-w-[1500px] flex flex-col px-6" id="content">
            </div>
        </section>  
          `;
  },

  async afterRender() {
    setLayoutDefault();
    document.querySelector('#content').append(document.createElement('form-produk'));
    const form = document.querySelector('#productForm');
    const inputId = document.createElement('input');
    inputId.setAttribute('type', 'hidden');
    inputId.setAttribute('name', 'id');
    inputId.setAttribute('id', 'id');
    form.append(inputId);
    const currentData = {
      id: 2323,
      name: 'Tote Bag',
      price: 5000,
      link: 'https://www.tokopedia.com/',
      description: 'ini Produk bagus',
    };
    form.elements.name.value = currentData.name;
    form.elements.price.value = currentData.price;
    form.elements.link.value = currentData.link;
    form.elements.description.value = currentData.description;
    form.elements.id.value = currentData.id;
  },
};

export default editProduct;
// page bakal buat halaman baru
