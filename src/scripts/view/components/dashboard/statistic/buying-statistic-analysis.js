class BuyingStatisticAnalysis extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._statisticAnalysisData = {
      totalWeight: null,
    };
  }

  connectedCallback() {
    this.render();
  }

  set statisticAnalysisData(value) {
    this._statisticAnalysisData = value;
    this.render();
  }

  get statisticAnalysisData() {
    return this._statisticAnalysisData;
  }

  _Content() {
    this.innerHTML = '';
  }

  render() {
    this._Content();
    this.innerHTML += `
      <div id="statistic-alaysis">
        <div id="statistic-container h-full">
            <p id="headertext-analysis" class="text-base font-semibold mb-2">Selamat, Anda telah menjual ${this.statisticAnalysisData.totalWeight} kg sampah plastik!</p>
            <p id="subheadertext-analysis" >Dengan membeli ${this.statisticAnalysisData.totalWeight} kg sampah plastik, Anda telah berkontribusi besar dalam menjaga kebersihan lingkungan. Angka ini setara dengan : </p>
            <div id="detail-analysis" class="mt-4 flex flex-col gap-1"></div>
        </div>
      </div>
    `;
  }
}
customElements.define('buying-statistic-analysis', BuyingStatisticAnalysis);
