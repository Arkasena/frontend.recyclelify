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

  _radioButtonisChecked() {
    const url = new URLSearchParams((window.location.href).split('?')[1]);
    console.log(url);
    const category = url.get('category');
    if (category) {
      const radio = document.querySelector(`[value="${category}"]`);
      if (radio) {
        radio.checked = true;
      }
    }
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
      <div class="border-gray-300 border-2 w-full md:w-[256px] rounded-2xl p-4 flex flex-col">
          <form id="filter" action="#/partner" method="get" class="flex flex-row md:flex-col gap-6">
              <div class="flex flex-col w-full">
                  <h3 class="font-medium text-sm mb-2">Jenis</h3>
                  <label for="aksesoris" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="category" id="aksesoris" value="Aksesoris" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Aksesoris</label>
                  <label for="dekorasi" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="category" id="dekorasi" value="Dekorasi" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Dekorasi</label>
                  <label for="busana" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="category" id="busana" value="Busana" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Busana</label>
                  <label for="furnitur" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="category" id="furnitur" value="Furnitur" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Furnitur</label>
                  <label for="dapur" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="category" id="dapur" value="Lainnya" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">Lainnya</label>
              </div>
          </form>
      </div>
    `;
    const form = document.querySelector('#filter');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._changeEvent();
    });
    this._radioButtonisChecked();

    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((radio) => {
      radio.addEventListener('change', () => {
        form.dispatchEvent(new Event('submit'));
      });
    });
  }
}
customElements.define('filter-katalog', FilterKatalog);
