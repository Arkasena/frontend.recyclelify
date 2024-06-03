class PartnerNotificationMessage extends HTMLElement {
  constructor() {
    super();
    this._NotificationData = {
      seller_name: null,
      date: null,
      status_message: null,
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
      case 'offering':
        messageContent = `
          <div id="offering_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words">Anda mendapatkan <b>tawaran penjualan sampah dari ${this._NotificationData.seller_name}</b></p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'shipping_cost_approval':
        messageContent = `
          <div id="shipping_cost_approval_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words"><b>${this._NotificationData.seller_name} menyetujui konfirmasi tambahan biaya penjemputan sampah!</b>. Silakan jemput sampah  ke lokasi Kolaborator dalam 3 hari ke depan.</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'shipping_cost_rejection':
        messageContent = `
          <div id="shipping_cost_rejection_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words"><b>Mohon maaf, ${this._NotificationData.seller_name} menolak konfirmasi tambahan biaya penjemputan sampah</b>. Coba lagi dilain kesempatan</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'reminder':
        messageContent = `
          <div id="reminder_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words"><b>Batas waktu maksimal penjemputan sampah Anda tinggal 1 hari lagi.</b> Pastikan Anda menjemput sampah dari ${this._NotificationData.seller_name} agar transaksi tidak dibatalkan.</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'canceled-dropoff':
        messageContent = `
          <div id="canceled_dropoff-message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words">Mohon maaf, transaksi pembelian sampah Anda telah <b>dibatalkan</b> karena ${this._NotificationData.seller_name} tidak mengantarkan sampahnya dalam waktu 3 hari.</p>
              <p class="text-sm font-regular break-words text-gray-400">${this._NotificationData.date}</p>
            </div>
          </div>`;
        break;
      case 'canceled-pickup':
        messageContent = `
          <div id="canceled_pickup_message" class="w-full h-full flex flex-row gap-4 px-8 py-4 hover:bg-gray-100 rounded-lg">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil Mitra" class="w-[50px] h-[50px] rounded-2xl">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-regular break-words">Mohon maaf, transaksi pembelian sampah Anda telah <b>dibatalkan</b> karena Anda tidak menjemput sampah ${this._NotificationData.seller_name} dalam waktu 3 hari </p>
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

customElements.define('partner-notification-message', PartnerNotificationMessage);
