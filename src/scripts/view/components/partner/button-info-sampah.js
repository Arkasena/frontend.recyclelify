class buttonSampah extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._jenisSampah = null;
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

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.classList.add('w-11', 'aspect-auto');
    this.innerHTML += `
    <button><img class="w-11 aspect-auto" src="./images/others/${this.jenisSampah}.svg" alt="${this.jenisSampah}"></button>
      `;
  }
}
customElements.define('button-sampah', buttonSampah);
