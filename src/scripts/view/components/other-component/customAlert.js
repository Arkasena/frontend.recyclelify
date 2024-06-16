/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
class customAlert extends HTMLElement {
  constructor() {
    super();
    this._alertData = {
      header: null,
      desc: null,
      button: null,
      link: null,
    };
  }

  connectedCallback() {
    this.render();
    this.closeButtonFunction();
    setTimeout(() => {
      document.querySelector('#alertContainer').classList.remove('top-[-200px]');
      document.querySelector('#alertContainer').classList.add('top-24');
    }, 120);
  }

  set alertData(value) {
    this._alertData = value;
    this.render();
  }

  get alertData() {
    return this._alertData;
  }

  closeButtonFunction() {
    const closeButton = document.querySelectorAll('#closeButton');
    closeButton.forEach((button) => {
      button.addEventListener('click', () => {
        this.remove();
      });
    });
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.classList.add('w-full', 'h-full', 'fixed', 'top-0', 'right-0', 'bg-black', 'z-50', 'bg-opacity-40', 'flex', 'justify-center');
    this.innerHTML += `
            <div id="alertContainer" class="flex flex-col ease-in duration-500 gap-4 h-fit px-10 py-5 rounded-2xl relative max-w-[400px] bg-white top-[-200px]">
                <button id="closeButton" class="absolute top-4 right-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
                <h3 class="font-bold text-center text-black">${this.alertData.header}</h3>
                <p class="text-center text-sm">${this.alertData.desc}</p>
                <div class="grid grid-cols-2 w-full gap-2 pt-3">
                    <button id="closeButton" class="border-lime-600 border text-lime-600 rounded-xl w-full py-1">Tutup</button>
                    <a href="${this.alertData.link}"><button class="border-lime-600 border bg-lime-600 text-slate-50 w-full rounded-xl py-1">${this.alertData.button}</button></a>
                </div>
            </div>
        `;
  }
}
customElements.define('custom-alert', customAlert);
