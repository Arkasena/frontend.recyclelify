/* eslint-disable max-len */
import UserResources from '../../data/user-resources';
import Cookies from '../../utils/cookies.';
import { setLayoutDefault } from '../templates/template-creator';

const profilSaya = {
  async render() {
    return `
    <section class="w-full flex justify-center items-center grow">
        <div id="loading" class="loading"></div>
        </section>
      <div id="katalogContainer" class="katalog-container"></div>
          `;
  },

  async afterRender() {
    setLayoutDefault();
    const section = document.querySelector('section');
    const loading = document.getElementById('loading');
    try {
      const myProfile = document.createElement('my-profile');
      const partner = await UserResources.detailPartner(Cookies.getUserId(), 'relations=acceptanceRules&relations=products&relations=categories');
      loading.style.display = 'none';
      const partnerData = {
        id: partner.id,
        username: partner.username,
        name: partner.name,
        description: partner.description,
        phone_number: (partner.phoneNumber).replace('+62', ''),
        email: partner.email,
        address: (partner.address).replaceAll('+', ', '),
        website: partner.website,
        photo: partner.photo,
      };
      const jenisPlastic = ['PETE', 'HDPE', 'LDPE', 'PVC', 'PP', 'PS'];
      if (partner.acceptanceRules && partner.acceptanceRules.length > 0) {
        partnerData.plasticType = { name: jenisPlastic[Number(partner.acceptanceRules[0].plasticId) - 1], total: partner.acceptanceRules.length };
        partnerData.price = partner.acceptanceRules[0].pricePerKilogram;
      } else {
        partnerData.plasticType = null;
        partnerData.price = 0;
      }
      myProfile.userData = partnerData;
      section.append(myProfile);
      const katalogContainer = document.querySelector('#katalogContainer');
      const productLength = partner.products.length;
      const productCategories = ['Aksesoris', 'Dekorasi', 'Busana', 'Furnitur', 'Lainnya'];
      for (let i = 0; i < productLength; i += 1) {
        const katalogItem = document.createElement('katalog-item');
        katalogItem.setAttribute('id', partner.products[i].id);
        katalogItem.katalogData = {
          endpoint: `my-product/${partner.products[i].id}`,
          photo: partner.products[i].photo,
          name: partner.products[i].name,
          description: partner.products[i].description,
          price: partner.products[i].price,
          category: partner.products[i].categories[0] ? {
            name: productCategories[Number(partner.products[i].categories[0].categoryId) - 1],
            total: partner.products[i].categories.length,
          } : null,
        };
        katalogContainer.append(katalogItem);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      loading.style.display = 'none'; // Hide loading spinner on error as well
      section.innerHTML += '<p>Failed to load data. Please try again later.</p>';
    }
  },
};

export default profilSaya;
