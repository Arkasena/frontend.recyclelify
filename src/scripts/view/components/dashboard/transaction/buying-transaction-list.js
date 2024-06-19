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
      </div>
    `;
  }
}

customElements.define('buying-transaction-list', buyingTransactionList);
