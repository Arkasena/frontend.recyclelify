import { setLayoutDefault } from '../../templates/template-creator';

const collaboratorTransactionDetail = {
  async render() {
    return `
    <section class="w-full flex justify-center">
        <div class="w-full max-w-[1500px] flex flex-col gap-6 justify-center relative px-6 py-6">
            <collaborator-breadcrumbs-transaction></collaborator-breadcrumbs-transaction>
            <collaborator-transaction-form></collaborator-transaction-form>
        </div>
    </section>
    `;
  },

  async afterRender() {
    setLayoutDefault();

    function toggleChevronIcon(dropdown) {
      const chevronIcon = dropdown.querySelector('.dropdown-icon svg');
      if (chevronIcon) {
        if (chevronIcon.classList.contains('lucide-chevron-down')) {
          chevronIcon.outerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
          `;
        } else {
          chevronIcon.outerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
          `;
        }
      }
    }

    const transactionForm = document.querySelector('collaborator-transaction-form');
    const breadcrumbs = document.querySelector('collaborator-breadcrumbs-transaction');

    if (transactionForm) {
      const dummyData = {
        company_name: 'Company ABC',
        company_address: '123 Main Street',
        company_phone: '123-456-7890',
        trash_category: 'PET',
        trash_quantity: '10',
        collaborator_address: '456 Elm Street',
        collaborator_phone: '987-654-3210',
        transaction_date: '2024-06-08',
        transaction_status: 'Disetujui',
        trash_img: 'https://img.idxchannel.com/media/600/images/idx/Multimedia/2021/06/10/sampah-plastik1.jpg',
        shipping_method: 'Antar langsung',
        trash_cost: '5000',
        shipping_cost: '3000',
        partner_shipping_cost_confirmation: 'unconfirmed',
      };

      const finalIncome = (
        dummyData.trash_cost * dummyData.trash_quantity
      ) - dummyData.shipping_cost;

      transactionForm.transactionData = dummyData;

      if (breadcrumbs) {
        breadcrumbs.breadCrumbsData = {
          company_name: dummyData.company_name,
          transaction_status: dummyData.transaction_status,
        };
      }

      const transactionImage = transactionForm.querySelector('#transaction-img');
      if (transactionImage) {
        transactionImage.innerHTML = `
            <img src="${dummyData.trash_img}" alt="Foto Sampah Plastik" class="rounded-lg w-full h-full object-cover">
        `;
      }

      const contentPartnerDetail = transactionForm.querySelector('#data-partner');
      if (contentPartnerDetail) {
        contentPartnerDetail.innerHTML = `
            <div class="grid grid-cols-3">
                <p>Nama</p>
                <p class="col-span-2">: ${dummyData.company_name}</p>
            </div>
            <div class="grid grid-cols-3">
                <p>Alamat</p>
                <p class="col-span-2">:  ${dummyData.company_address}</p>
            </div>
            <div class="grid grid-cols-3">
                <p>Nomor telepon</p>
                <p class="col-span-2">:  ${dummyData.company_phone}</p>
            </div>
        `;
      }

      const contentTransactionDetail = transactionForm.querySelector('#data-transaction');
      if (contentTransactionDetail) {
        let statusDescription = '';
        switch (dummyData.transaction_status) {
          case 'Diproses':
            statusDescription = 'Menunggu Mitra menyetujui pembelian sampahmu';
            break;
          case 'Disetujui':
            statusDescription = 'Telah disetujui oleh Mitra';
            break;
          case 'Selesai':
          case 'Gagal':
            statusDescription = 'Selesai';
            break;
          default:
            statusDescription = 'Status tidak dikenal';
        }

        contentTransactionDetail.innerHTML = `
            <div class="grid grid-cols-3">
                <p>Kategori</p>
                <p class="col-span-2">:  ${dummyData.trash_category}</p>
            </div>
            <div class="grid grid-cols-3">
                <p>Estimasi Berat Sampah</p>
                <p class="col-span-2">: ${dummyData.trash_quantity}</p>
            </div>
            <div class="grid grid-cols-3">
                <p>Alamat</p>
                <p class="col-span-2">: ${dummyData.collaborator_address}</p>
            </div>
            <div class="grid grid-cols-3">
                <p>Nomor Telepon</p>
                <p class="col-span-2">: ${dummyData.collaborator_phone}</p>
            </div>
            <div class="grid grid-cols-3">
                <p>Tanggal</p>
                <p class="col-span-2">: ${dummyData.transaction_date}</p>
            </div>
            <div class="grid grid-cols-3">
                <p>Pengiriman</p>
                <p class="col-span-2">: ${dummyData.shipping_method}</p>
            </div>
            <div class="grid grid-cols-3">
                <p><b>Status</b></p>
                <p class="col-span-2"><b>: ${statusDescription}</b></p>
            </div>
        `;
      }

      // income detail
      const incomePartnerDetail = transactionForm.querySelector('#income-detail');
      if (incomePartnerDetail) {
        incomePartnerDetail.innerHTML = `
            <div class="flex flex-row justify-between">
                <p>Harga Jual</p>
                <p>Rp. ${dummyData.trash_cost}</p>
            </div>
            <div class="flex flex-row justify-between">
                <p>Estimasi Berat Sampah</p>
                <p>${dummyData.trash_quantity} kg</p>
            </div>
            <div class="flex flex-row justify-between">
                <p>Biaya Pengiriman</p>
                <p>Rp. ${dummyData.shipping_cost}</p>
            </div>
            <div class="flex flex-row justify-between">
                <p><b>Estimasi Total Pendapatan</b></p>
                <p><b>Rp. ${finalIncome}</b></p>
            </div>
        `;
      }

      // Conditional visibility logic
      const deliveryCostMessage = transactionForm.querySelector('#delivery-cost-message');
      const deliveryCostReminder = transactionForm.querySelector('#delivery-cost-reminder');
      const deliveryCostConfirmation = transactionForm.querySelector('#delivery-cost-confirmation');
      const successMessage = transactionForm.querySelector('#success-message');

      // Pengkondisian sesuai permintaan
      if (dummyData.transaction_status === 'Diproses') {
        if (dummyData.shipping_method === 'Antar langsung') {
          deliveryCostMessage?.classList.add('hidden');
          deliveryCostReminder?.classList.add('hidden');
          deliveryCostConfirmation?.classList.add('hidden');
          successMessage?.classList.add('hidden');
        } else if (dummyData.shipping_method === 'Dijemput mitra' && dummyData.partner_shipping_cost_confirmation === 'confirmed') {
          successMessage?.classList.add('hidden');
          deliveryCostReminder?.classList.add('hidden');
        } else if (dummyData.shipping_method === 'Dijemput mitra') {
          deliveryCostMessage?.classList.add('hidden');
          deliveryCostConfirmation?.classList.add('hidden');
          successMessage?.classList.add('hidden');
        }
      } else if (dummyData.transaction_status === 'Disetujui') {
        if (dummyData.shipping_method === 'Antar langsung') {
          deliveryCostMessage?.classList.add('hidden');
          deliveryCostReminder?.classList.add('hidden');
          deliveryCostConfirmation?.classList.add('hidden');
        } else if (dummyData.shipping_method === 'Dijemput mitra') {
          deliveryCostReminder?.classList.add('hidden');
          successMessage?.classList.add('hidden');
        }
      } else if (dummyData.transaction_status === 'Selesai' || dummyData.transaction_status === 'Gagal') {
        deliveryCostMessage?.classList.add('hidden');
        deliveryCostReminder?.classList.add('hidden');
        deliveryCostConfirmation?.classList.add('hidden');
        successMessage?.classList.add('hidden');
      } else {
        deliveryCostMessage?.classList.remove('hidden');
        deliveryCostReminder?.classList.remove('hidden');
        deliveryCostConfirmation?.classList.remove('hidden');
        successMessage?.classList.remove('hidden');
      }

      // Handle dropdowns
      const dropdownPartnerDetail = transactionForm.querySelector('#dropdown-partner-detail');
      const contentPartnerDetailElem = transactionForm.querySelector('#content-partner-detail');
      const dropdownTransactionDetail = transactionForm.querySelector('#dropdown-transaction-detail');
      const contentTransactionDetailElem = transactionForm.querySelector('#content-transaction-detail');

      dropdownPartnerDetail.addEventListener('click', () => {
        contentPartnerDetailElem.classList.toggle('hidden');
        toggleChevronIcon(dropdownPartnerDetail);
      });

      dropdownTransactionDetail.addEventListener('click', () => {
        contentTransactionDetailElem.classList.toggle('hidden');
        toggleChevronIcon(dropdownTransactionDetail);
      });
    }
  },
};

export default collaboratorTransactionDetail;
