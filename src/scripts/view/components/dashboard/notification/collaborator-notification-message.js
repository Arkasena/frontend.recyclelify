class CollaboratorNotificationMessage extends HTMLElement {
  constructor() {
    super();
    this._NotificationData = {
      company_name: null,
      date: null,
      status_message: null,
      shipping_cost: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  set NotificationData(value) {
    this._NotificationData = value;
    this.render();
  }

  get NotificationData() {
    return this._NotificationData;
  }

  _Content() {
    this.innerHTML = '';
  }

  render() {
    this._Content();
    let messageContent = '';

    switch (this._NotificationData.status_message) {
      case 'approval':
        messageContent = `
          <div id="approval_pickup_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words"><b>${this._NotificationData.company_name}</b> menyetujui pengajuan penjualan sampahmu! Penjemputan akan dijadwalkan dalam 3 hari ke depan.</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'shipping_cost':
        messageContent = `
          <div id="shippingcost_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words"><b>${this._NotificationData.company_name} menyetujui</b> pengajuan penjualan sampahmu! <b>Biaya penjemputan sebesar ${this._NotificationData.shipping_cost}.</b> Segera konfirmasi transaksi ini untuk melanjutkan proses penjualan sampah.</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'approval_dropoff':
        messageContent = `
          <div id="approval_dropoff_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words"><b>${this._NotificationData.company_name}</b> menyetujui pengajuan penjualan sampahmu! Silakan antarkan sampah Anda ke lokasi Mitra dalam 3 hari ke depan.</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'declination':
        messageContent = `
          <div id="declination_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words">Mohon maaf, ${this._NotificationData.company_name} <b>menolak</b> pengajuan penjualan sampahmu! Coba lagi di lain kesempatan.</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'reminder':
        messageContent = `
          <div id="reminder_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words"><b>Batas waktu maksimal pengantaran sampah Anda tinggal 1 hari lagi.</b> Pastikan sampah Anda sudah siap untuk diantarkan ke lokasi ${this._NotificationData.company_name}.</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'canceled':
        messageContent = `
          <div id="canceled_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words">Mohon maaf, transaksi pembelian sampah Anda telah <b>dibatalkan</b> karena sampah tidak diantarkan dalam waktu 3 hari. Silakan coba lakukan permintaan penjualan kembali.</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'finished':
        messageContent = `
          <div id="finished_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words">Terima kasih! <b>Transaksi penjualan sampah Anda telah selesai</b>. Akumulasi statistik sampah Anda telah diperbarui. Lanjutkan usaha Anda dalam menjaga kebersihan dan lingkungan!.</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      default:
        messageContent = '<p>No notifications available.</p>';
    }

    this.innerHTML = `<div id="notification-list">${messageContent}</div>`;
  }
}

customElements.define('collaborator-notification-message', CollaboratorNotificationMessage);
