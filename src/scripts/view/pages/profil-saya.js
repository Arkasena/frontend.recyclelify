/* eslint-disable max-len */
import ProductResources from '../../data/product-resources';
import UserResources from '../../data/user-resources';
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
      const partner = await UserResources.detailPartner(3);
      const acceptanceRules = await UserResources.acceptanceRules(3);
      const allProduct = await ProductResources.product('partnerId=3');

      // Hide loading spinner after data is fetched
      loading.style.display = 'none';

      const partnerData = {
        id: partner.id,
        username: partner.username,
        name: partner.name,
        description: partner.description,
        phoneNumber: (partner.phoneNumber).replaceAll('+62', ''),
        email: partner.email,
        address: (partner.address).replaceAll('+', ', '),
        website: partner.website,
        photo: partner.photo,
      };

      const jenisPlastic = ['PETE', 'HDPE', 'LDPE', 'PVC', 'PP', 'PS'];
      if (acceptanceRules && acceptanceRules.length > 0) {
        partnerData.plasticType = { name: jenisPlastic[Number(acceptanceRules[0].plasticId) - 1], total: acceptanceRules.length };
        partnerData.price = acceptanceRules[0].pricePerKilogram;
      } else {
        partnerData.plasticType = null;
        partnerData.price = 0;
      }

      myProfile.userData = partnerData;
      section.append(myProfile);

      const katalogContainer = document.querySelector('#katalogContainer');
      const productLength = allProduct.data.length > 4 ? 4 : allProduct.data.length;
      for (let i = 0; i < productLength; i += 1) {
        const katalogItem = document.createElement('katalog-item');
        katalogItem.setAttribute('id', allProduct.data[i].id);
        katalogItem.katalogData = {
          endpoint: `my-product/${allProduct.data[i].id}`,
          photo: allProduct.data[i].photo,
          name: allProduct.data[i].name,
          description: allProduct.data[i].description,
          price: allProduct.data[i].price,
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
