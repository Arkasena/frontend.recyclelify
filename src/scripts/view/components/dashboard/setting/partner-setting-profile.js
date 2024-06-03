class PartnerSettingProfile extends HTMLElement {
  constructor() {
    super();
    this._settingProfileData = {
      fullname: null,
      address: null,
      city: null,
      province: null,
      phone: null,
      website: null,
      description: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  set settingProfileData(value) {
    this._settingProfileData = value;
    this.render();
  }

  get settingProfileData() {
    return this._settingProfileData;
  }

  render() {
    this.innerHTML = `
      <div id="profile-setting" class="flex flex-col gap-4">
        <div class="flex flex-row gap-10 items-center">
          <img src="https://yt3.googleusercontent.com/ytc/AIdro_ndItzJEgeNIMkMeMRnFGFjUCxCmCvmzQZ_s-MYCEp6fA=s900-c-k-c0x00ffffff-no-rj" alt="Foto Profil " class="w-[90px] h-[90px] rounded-2xl">
          <div class="flex flex-col pb-4 w-full">
            <label for="name" class="text-base font-regular py-2">Nama</label>
            <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="text" name="name" id="name" placeholder="Nama User" value="${this.settingProfileData.fullname}" required>
          </div>
        </div>
        <div class="flex flex-row justify-between gap-8">
          <div class="flex flex-col pb-4 w-full">
            <label for="address" class="text-base font-medium py-2">Alamat</label>
            <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="text" name="address" id="address" placeholder="Alamat User" value="${this.settingProfileData.address}" required>
          </div>
          <div class="flex flex-col pb-4 w-full">
            <label for="city" class="font-medium text-base py-2">Kota</label>
            <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="text" name="city" id="city" placeholder="Kota User" value="${this.settingProfileData.city}" required>
          </div>
          <div class="flex flex-col pb-4 w-full">
            <label for="province" class="font-medium text-base py-2">Provinsi</label>
            <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="text" name="province" id="province" placeholder="Provinsi User" value="${this.settingProfileData.province}" required>
          </div>
        </div>
        <div class="flex flex-row gap-6 justify-between">
          <div class="flex flex-col pb-4 w-full">
            <label for="phone" class="font-medium text-base py-2">Nomor Telpon</label>
            <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="tel" name="phone" id="phone" placeholder="Nomor Telpon" value="${this.settingProfileData.phone}" required>
          </div>
          <div class="flex flex-col pb-4 w-full">
            <label for="website" class="font-medium text-base py-2">Website</label>
            <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3" type="tel" name="website" id="website" placeholder="Website" value="${this.settingProfileData.website}" required>
          </div>
        </div>
        <div class="flex flex-col pb-4 w-full">
          <label for="description" class="font-medium text-base py-2">Deskripsi Perusahaan</label>
          <textarea class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16  p-4 shadow-md px-3" 
            name="description" id="description" placeholder="Deskripsi Perusahaan" required 
            style="min-height: 176px; resize: none; white-space: pre-wrap;">${this.settingProfileData.description}</textarea>
        </div>
        <div class="place-self-end">
          <solid-button name="Simpan Perubahan"></solid-button>
        </div>
      </div>
    `;
  }
}
customElements.define('partner-setting-profile', PartnerSettingProfile);
