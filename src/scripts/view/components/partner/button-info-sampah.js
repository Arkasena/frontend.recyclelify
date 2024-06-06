class buttonSampah extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._jenisSampah = null;
    this._borderColor = {
      PVC: 'border-red-600',
      LDPE: 'border-green-600',
      PP: 'border-sky-400',
      PS: 'border-purple-600',
      HDPE: 'border-orange-600',
      PET: 'border-yellow-600',
    };
  }

  connectedCallback() {
    this.render();
  }

  set jenisSampah(value) {
    this._jenisSampah = value;
    this.render();
  }

  get jenisSampah() {
    return this._jenisSampah;
  }

  get borderColor() {
    return this._borderColor;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.classList.add('w-18', '890:w-11', 'aspect-auto');
    this.innerHTML += `
            <button>
              <div class="border rounded-lg p-2 ${this.borderColor[this.jenisSampah.toUpperCase()]}">
                    <img class="890:w-11 aspect-auto" src="./images/others/${this.jenisSampah.toUpperCase()}.svg" alt="${this.jenisSampah}">
                </div>  
            </button>
      `;
  }
}
customElements.define('button-sampah', buttonSampah);
