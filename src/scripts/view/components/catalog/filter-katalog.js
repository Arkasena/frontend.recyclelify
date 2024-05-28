/* eslint-disable class-methods-use-this */
class FilterKatalog extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  _checkBoxisChecked() {
    const url = new URLSearchParams((window.location.href).split('?')[1]);
    console.log(url);
    const type = url.getAll('type');
    type.forEach((value) => {
      const checkbox = document.querySelector(`[value="${value}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
    const min = url.get('min');
    const minValues = document.querySelector('#min');
    minValues.value = min;
    const max = url.get('max');
    const maxValues = document.querySelector('#max');
    maxValues.value = max;
  }

  _changeEvent() {
    const form = event.target;
    const formData = new FormData(form);
    const formQueryString = new URLSearchParams(formData);
    console.log(formQueryString);
    const currentUrl = new URLSearchParams((window.location.href).split('?')[1]);
    console.log(currentUrl.toString());
    let urlParams;
    if (currentUrl.has('search')) {
      formQueryString.append('search', currentUrl.get('search'));
      urlParams = formQueryString.toString();
    } else {
      urlParams = formQueryString.toString();
    }
    if (currentUrl.has('page')) {
      formQueryString.append('page', currentUrl.get('page'));
      urlParams = formQueryString.toString();
    } else {
      urlParams = formQueryString.toString();
    }
    window.location.href = `${window.location.origin}/#/catalog?${urlParams.replace(/\+/g, ' ')}`;
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
      <h2 class="font-semibold text-lg mb-4">Filter</h2>
      <div class="border-gray-300 border-2 w-[256px] rounded-2xl p-4 flex flex-col">
          <form id="filter" action="#/partner" method="get" class="flex flex-col gap-6">
              <div class="flex flex-col w-full">
                  <h3 class="font-medium text-sm mb-2">Jenis</h3>
                  <label for="aksesoris" class="text-sm px-2 py-2 flex flex-row items-center"><input type="checkbox" name="type" id="aksesoris" value="aksesoris" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Aksesoris</label>
                  <label for="dekorasi" class="text-sm px-2 py-2 flex flex-row items-center"><input type="checkbox" name="type" id="dekorasi" value="dekorasi" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Dekorasi</label>
                  <label for="fashion" class="text-sm px-2 py-2 flex flex-row items-center"><input type="checkbox" name="type" id="fashion" value="fashion" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Fashion</label>
                  <label for="perabotan" class="text-sm px-2 py-2 flex flex-row items-center"><input type="checkbox" name="type" id="perabotan" value="perabotan" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Perabotan</label>
                  <label for="dapur" class="text-sm px-2 py-2 flex flex-row items-center"><input type="checkbox" name="type" id="dapur" value="peralatan dapur" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Peralatan Dapur</label>
              </div>
              <div class="grid grid-cols-2 w-full">
                  <h3 class="font-medium text-sm mb-2 col-span-2">Harga</h3>
                  <label for="min" class="text-sm py-2">Minimal</label> <div class="flex flex-row w-full border border-gray-300 items-center rounded-md px-2 "><span class="font-medium">Rp.</span><input class="placeholder:text-right w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none" type="number" id="min" name="min" placeholder="Angka"></div>
                  <label for="max" class="text-sm py-2">Maksimal</label> <div class="flex flex-row w-full border border-gray-300 items-center rounded-md px-2"><span class="font-medium">Rp.</span><input class="placeholder:text-right w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none" type="number" id="max" name="max" placeholder="Angka"></div>
              </div>
          </form>
      </div>
        `;
    const form = document.querySelector('#filter');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._changeEvent();
    });
    this._checkBoxisChecked();
    const input = document.querySelectorAll('input[type="checkbox"]');
    input.forEach((value) => {
      value.addEventListener('click', () => {
        form.dispatchEvent(new Event('submit'));
      });
    });
    const inputNumber = document.querySelectorAll('input[type="number"]');
    inputNumber.forEach((value) => {
      value.addEventListener('blur', () => {
        form.dispatchEvent(new Event('submit'));
      });
    });
  }
}
customElements.define('filter-katalog', FilterKatalog);
