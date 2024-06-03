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
        <div id="transaction-item" class="w-full h-full grid grid-cols-12 gap-2">
        </div>
      </div>
    `;
  }
}

customElements.define('selling-transaction-list', SellingTransactionList);
