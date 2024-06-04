import { setLayoutDefault } from "../templates/template-creator";

const tambahProduk = {
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
  },
};

export default tambahProduk;
// page bakal buat halaman baru
