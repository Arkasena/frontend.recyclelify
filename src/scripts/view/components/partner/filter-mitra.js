/* eslint-disable class-methods-use-this */
class FilterMitra extends HTMLElement {
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

  _radioButtonChecked() {
    const url = new URLSearchParams((window.location.href).split('?')[1]);
    console.log(url);
    const plastic = url.getAll('plastic');
    plastic.forEach((value) => {
      const checkbox = document.querySelector(`[value="${value}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }

  _changeEvent() {
    const form = event.target;
    const formData = new FormData(form);
    const formQueryString = new URLSearchParams(formData);
    console.log(formQueryString);
    const currentUrl = new URLSearchParams((window.location.href).split('?')[1]);
    console.log(currentUrl.toString());
    let urlParams;
    if (currentUrl.has('name')) {
      formQueryString.append('name', currentUrl.get('name'));
      urlParams = formQueryString.toString();
    } else {
      urlParams = formQueryString.toString();
    }
    if (currentUrl.has('nameOrder')) {
      formQueryString.append('nameOrder', currentUrl.get('nameOrder'));
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
    window.location.href = `${window.location.origin}/#/find-partner?${urlParams.replace(/\+/g, ' ')}`;
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
     <h2 class="font-semibold text-lg mb-4">Filter</h2>
    <div class="border-gray-300 border-2 w-full md:w-[256px] rounded-2xl p-4 flex flex-col">
        <form id="filter" method="get" class="flex flex-row md:flex-col gap-6">
            <div class="grid grid-cols-2 w-full">
                <h3 class="font-medium text-sm mb-2 col-span-2">Jenis Plastik</h3>
                <label for="PETE" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="plastic" id="PETE" value="PETE" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4 ">PETE</label>
                <label for="HDPE" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="plastic" id="HDPE" value="HDPE" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">HDPE</label>
                <label for="PVC" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="plastic" id="PVC" value="PVC" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">PVC</label>
                <label for="LDPE" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="plastic" id="LDPE" value="LDPE" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">LDPE</label>
                <label for="PP" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="plastic" id="PP" value="PP" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">PP</label>
                <label for="PS" class="text-sm px-2 py-2 flex flex-row items-center"><input type="radio" name="plastic" id="PS" value="PS" class="mr-2  accent-lime-400 cursor-pointer w-4 h-4 ">PS</label>
            </div>
        </form>
    </div>
      `;
    const form = document.querySelector('#filter');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._changeEvent();
    });
    this._radioButtonChecked();
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((radio) => {
      radio.addEventListener('change', () => {
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
customElements.define('filter-mitra', FilterMitra);
