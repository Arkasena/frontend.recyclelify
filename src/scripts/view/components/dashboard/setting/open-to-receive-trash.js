class OpenToReceiveTrash extends HTMLElement {
  constructor() {
    super();
    this._trashData = {
      startDate: null,
      endDate: null,
      peteMin: null,
      peteMax: null,
      petePrice: null,
      hdpeMin: null,
      hdpeMax: null,
      hdpePrice: null,
      pvcMin: null,
      pvcMax: null,
      pvcPrice: null,
      ldpeMin: null,
      ldpeMax: null,
      ldpePrice: null,
      ppMin: null,
      ppMax: null,
      ppPrice: null,
      psMin: null,
      psMax: null,
      psPrice: null,
      peteChecked: null,
      hdpeChecked: null,
      pvcChecked: null,
      ldpeChecked: null,
      ppChecked: null,
      psChecked: null,
    };
  }

  connectedCallback() {
    this.render();
    this.initFlatpickr();
  }

  initFlatpickr() {
    flatpickr('.flatpickr', {
      dateFormat: 'Y/m/d',
    });
  }

  set trashData(value) {
    this._trashData = value;
    this.render();
  }

  get trashData() {
    return this._trashData;
  }

  render() {
    this.innerHTML = `
      <div id="open-to-recieve-trash-setting" class="flex flex-col gap-4">
        <h3 class="font-semibold">Tanggal Penerimaan</h3>
        <div class="flex flex-row justify-between gap-8">
          <div class="flex flex-col pb-4 w-full">
            <label for="startdate" class="text-base font-medium py-2">Tanggal Mulai</label>
            <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3 flatpickr" type="datetime" name="startdate" id="startdate" placeholder="YYYY/MM/DD" required>
          </div>
          <div class="flex flex-col pb-4 w-full">
            <label for="enddate" class="font-medium text-base py-2">Tanggal Berakhir</label>
            <input class="rounded-lg outline-lime-600 relative border-0 text-base w-full h-16 shadow-md px-3 flatpickr" type="datetime" name="enddate" id="enddate" placeholder="YYYY/MM/DD" required>
          </div>
        </div>
        <h3 class="font-semibold">Jenis Sampah Plastik</h3>
        <div class="flex flex-col justify-between">
          <div class="grid grid-cols-4 justify-between">
            <label for="PETE" class="text-base px-2 py-2 flex flex-row items-center"><input type="checkbox" name="plasticType" id="PETE" value="PETE" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">PETE</label>
            <label for="Minimal" class="text-base px-2 py-2 flex flex-row items-center">Minimal<input type="text" id="minimal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Maksimal" class="text-base px-2 py-2 flex flex-row items-center">Maksimal<input type="text" id="maximal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Harga" class="text-base px-2 py-2 flex flex-row items-center">Harga<input type="text" id="harga" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. "></label>
          </div>
          <div class="grid grid-cols-4 justify-between">
            <label for="HDPE" class="text-base px-2 py-2 flex flex-row items-center"><input type="checkbox" name="plasticType" id="HDPE" value="HDPE" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">HDPE</label>
            <label for="Minimal" class="text-base px-2 py-2 flex flex-row items-center">Minimal<input type="text" id="minimal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Maksimal" class="text-base px-2 py-2 flex flex-row items-center">Maksimal<input type="text" id="maximal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Harga" class="text-base px-2 py-2 flex flex-row items-center">Harga<input type="text" id="harga" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. "></label>
          </div>
          <div class="grid grid-cols-4 justify-between">
            <label for="PVC" class="text-base px-2 py-2 flex flex-row items-center"><input type="checkbox" name="plasticType" id="PVC" value="PVC" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">PVC</label>
            <label for="Minimal" class="text-base px-2 py-2 flex flex-row items-center">Minimal<input type="text" id="minimal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Maksimal" class="text-base px-2 py-2 flex flex-row items-center">Maksimal<input type="text" id="maximal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Harga" class="text-base px-2 py-2 flex flex-row items-center">Harga<input type="text" id="harga" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. "></label>
          </div>
          <div class="grid grid-cols-4 justify-between">
            <label for="LDPE" class="text-base px-2 py-2 flex flex-row items-center"><input type="checkbox" name="plasticType" id="LDPE" value="LDPE" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">LDPE</label>
            <label for="Minimal" class="text-base px-2 py-2 flex flex-row items-center">Minimal<input type="text" id="minimal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Maksimal" class="text-base px-2 py-2 flex flex-row items-center">Maksimal<input type="text" id="maximal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Harga" class="text-base px-2 py-2 flex flex-row items-center">Harga<input type="text" id="harga" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. "></label>
          </div>
          <div class="grid grid-cols-4 justify-between">
            <label for="PP" class="text-base px-2 py-2 flex flex-row items-center"><input type="checkbox" name="plasticType" id="PP" value="PP" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">PP</label>
            <label for="Minimal" class="text-base px-2 py-2 flex flex-row items-center">Minimal<input type="text" id="minimal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Maksimal" class="text-base px-2 py-2 flex flex-row items-center">Maksimal<input type="text" id="maximal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Harga" class="text-base px-2 py-2 flex flex-row items-center">Harga<input type="text" id="harga" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. "></label>
          </div>
          <div class="grid grid-cols-4 justify-between">
            <label for="PS" class="text-base px-2 py-2 flex flex-row items-center"><input type="checkbox" name="plasticType" id="PS" value="PS" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">PS</label>
            <label for="Minimal" class="text-base px-2 py-2 flex flex-row items-center">Minimal<input type="text" id="minimal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Maksimal" class="text-base px-2 py-2 flex flex-row items-center">Maksimal<input type="text" id="maximal" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg"></label>
            <label for="Harga" class="text-base px-2 py-2 flex flex-row items-center">Harga<input type="text" id="harga" class="rounded-lg outline-lime-600 relative border-0 text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. "></label>
          </div>
        </div>
        <div class="place-self-end">
          <solid-button name="Simpan Perubahan"></solid-button>
        </div>
      </div>
    `;
  }
}

customElements.define('open-to-receive-trash', OpenToReceiveTrash);
