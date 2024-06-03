class buyingTransactionList extends HTMLElement {
  constructor() {
    super();
    this._transactionData = [];
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

  render() {
    this.innerHTML = `
      <div id="buying-transaction-list">
        <div id="transaction-item" class="w-full h-full grid grid-cols-12 gap-2">
        <p>sdasdas</p>
        </div>
      </div>
    `;
  }
}

customElements.define('buying-transaction-list', buyingTransactionList);
