class FormLoginImg extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this.classList.add('hidden', 'lg:flex');
    this.innerHTML += `
    <div class="flex items-center max-w-[450px]">
    <img class="px-10" src="./images/others/form-login.png" alt="">
    </div>
    `;
  }
}
customElements.define('login-img', FormLoginImg);
