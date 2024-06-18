/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
class Hero extends HTMLElement {
  constructor() {
    super();
    this._heroData = {
      header: null,
      firstDesc: null,
      lastDesc: null,
      placeholder: null,
    };
  }

  connectedCallback() {
    this.render();
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitForm(form);
    });
    this._isSearchValue();
  }

  set heroData(value) {
    this._heroData = value;
    this.render();
  }

  get heroData() {
    return this._heroData;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  _isSearchValue() {
    const url = new URLSearchParams((window.location.href).split('?')[1]);
    if (url.has('name')) {
      const inputSearch = document.querySelector('#search');
      inputSearch.value = url.get('name');
    }
  }

  _submitForm(form) {
    const searchValue = form.elements.search.value.trim();
    const currentUrl = new URLSearchParams((window.location.href).split('?')[1]);
    let urlParams;
    if (searchValue === '' || searchValue === ' ') {
      currentUrl.delete('name');
    } else if (currentUrl.has('name')) {
      currentUrl.set('name', searchValue);
    } else {
      currentUrl.append('name', searchValue);
    }
    urlParams = currentUrl.toString();
    window.location.href = `${(window.location.hash).split('?')[0]}?${urlParams.replace(/\+/g, ' ')}`;
  }

  render() {
    this._emptyContent();
    this.classList.add('w-full', 'max-w-[1500px]', 'flex', 'flex-col', 'py-10', 'px-4');
    this.innerHTML += `
                <h1 class="text-2xl font-semibold mb-6">${this.heroData.header}</h1>
                <p>${this.heroData.firstDesc}</p>
                <p class="pb-8">${this.heroData.lastDesc}</p>
                <form id="find">
                    <label for='search' class="cursor-pointer w-full bg-white rounded-xl h-14 flex flex-row justify-center items-center px-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <input class="flex-1 px-2 outline-none placeholder-gray-500 cursor-pointer" type="text" name="search" id="search" placeholder="${this.heroData.placeholder}">
                    </label>
                </form>
      `;
  }
}
customElements.define('hero-element', Hero);
