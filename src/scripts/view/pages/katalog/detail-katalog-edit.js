/* eslint-disable no-script-url */
import ProductResources from '../../../data/product-resources';
import UserResources from '../../../data/user-resources';
import API_ENDPOINT from '../../../global/api-endpoint';
import UrlParser from '../../../routes/url-parser';
import Cookies from '../../../utils/cookies.';
import { setLayoutDefault } from '../../templates/template-creator';

const detailKatalogEdit = {
  async render() {
    return `
    <section class="w-full flex flex-col items-center grow pb-10">
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
    const contentContainer = document.querySelector('#content');
    const loading = document.getElementById('loading');
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const product = await ProductResources.detailProduct(url.id);
      if (!product) {
        loading.remove();
        const alert = document.createElement('error-alert');
        alert.alertData = {
          header: 'Produk tidak ditemukan!',
          desc: 'Produk yang di cari tidak dapat ditemukan',
          button: 'Cari Produk',
          link: '#/my-profile',
        };
        document.querySelector('main').append(alert);
      } else {
        const partner = await UserResources.detailPartner(product.partnerId);
        loading.remove();
        const catalogData = {
          photo: product.photo,
          name: product.name,
          description: product.description,
          price: product.price,
          link: product.link,
          partnerName: partner.name,
          partnerUsername: partner.username,
          partnerDescription: partner.description,
          partnerEmail: partner.email,
          partnerPhoto: partner.photo,
          partnerAddress: (partner.address).replaceAll('+', ', '),
          partnerPhoneNumber: partner.phoneNumber,
          partnerWebsite: partner.website,
        };
        contentContainer.insertAdjacentHTML('afterbegin', `
        <div class="flex flex-row gap-4 items-center py-10 w-full">
          <span class="text-lime-700 font-medium">Katalog</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
          <span class="text-lime-700 font-medium">Pencarian</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
          <span id="productNameContainer">${product.name}</span>
        </div>
      `);
        const detailCatalog = document.createElement('detail-katalog');
        detailCatalog.addEventListener('detailCatalogRendered', () => {
          const otherContainer = document.querySelector('#content > detail-katalog > div > div.flex.flex-col.w-full.gap-4');
          otherContainer.remove();
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
          const productInfoContainer = document.querySelector('#productInfoContainer');
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
          document.querySelector('#okButton').addEventListener('click', () => {
            const options = {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.getToken()}`,
              },
            };
            document.querySelector('main').innerHTML += `
              <div id="loading" class="top-0 right-0 fixed z-30 flex justify-center items-center w-full h-full bg-white">
                  <div class="loading z-[999]"></div>
              </div>`;
            fetch(API_ENDPOINT.DETAIL_PRODUCT(url.id), options)
              .then((response) => response.json())
              .then((result) => {
                if (result.error) {
                  document.querySelector('#loading').remove();
                  const alert = document.createElement('error-alert');
                  alert.alertData = {
                    header: 'Tambah Produk Gagal',
                    desc: result.error.details[0].message,
                    button: 'Muat ulang',
                    link: null,
                  };
                  document.querySelector('main').append(alert);
                } else {
                  window.location.href = `${window.location.origin}/#/my-profile`;
                  console.log(result);
                }
              });
          });
        });
        detailCatalog.catalogData = catalogData;
        contentContainer.append(detailCatalog);
        detailCatalog.dispatchEvent(new Event('detailCatalogRendered'));
      }
    } catch (error) {

    }
  },
};

export default detailKatalogEdit;
// page bakal buat halaman baru
