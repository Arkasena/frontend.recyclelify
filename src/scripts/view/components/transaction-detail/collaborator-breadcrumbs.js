class CollaboratorBreadcrumbsTransaction extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._breadCrumbsData = {
      company_name: null,
      transaction_status: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  set breadCrumbsData(value) {
    this._breadCrumbsData = value;
    this.render();
  }

  get breadCrumbsData() {
    return this._breadCrumbsData;
  }

  _Content() {
    this.innerHTML = '';
  }

  render() {
    this._Content();
    this.innerHTML += `
      <div id="breadcrumbs-transaction" class="flex flex-row gap-2">
        <a href="#/collaborator/dashboard" class="text-lime-700">Dashboard</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        <a href="#/collaborator/dashboard/transaction" class="text-lime-700">Transaksi</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        <a href="#" class="text-lime-700">${this._breadCrumbsData.transaction_status}</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        <p class="text-gray-400">${this._breadCrumbsData.company_name}</p>
      </div>
    `;
  }
}

customElements.define('collaborator-breadcrumbs-transaction', CollaboratorBreadcrumbsTransaction);
