class LastTransaction extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._transactionData = {
      company_image: null,
      company_name: null,
      weight: null,
      price: null,
      status: null,
      date: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  set transactionData(value) {
    this._transactionData = value;
    this.render();
  }

  get transactionData() {
    return this._transactionData;
  }

  _Content() {
    this.innerHTML = '';
  }

  render() {
    this._Content();
    this.innerHTML += `
      <div id="last-transaction" class="flex flex-col gap-3 w-full h-full">
        <div id="transaction-list" class="flex flex-col p-6 rounded-2xl bg-white gap-2 w-full">
          <div id="transaction-item" class="flex flex-row gap-4 content-center justify-between"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('last-transaction', LastTransaction);
