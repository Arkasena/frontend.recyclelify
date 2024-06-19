class SellingTransactionList extends HTMLElement {
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
      <div id="selling-transaction-list">
      </div>
    `;
  }
}

customElements.define('selling-transaction-list', SellingTransactionList);
