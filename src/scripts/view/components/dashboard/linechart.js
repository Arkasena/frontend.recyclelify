import Chart from 'chart.js/auto';

class LineChart extends HTMLElement {
  constructor() {
    super();
    this._chart = null;
    this._options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      font: {
        family: 'Poppins',
      },
    };
  }

  connectedCallback() {
    this.render();
  }

  set chartData(value) {
    this._data = value;
    this.renderChart();
  }

  get chartData() {
    return this._data;
  }

  render() {
    this.innerHTML = `
      <div id="sales-chart" class="w-full h-full p-6 rounded-2xl bg-white">
        <canvas id="lineChart"></canvas>
      </div>
    `;
    this.renderChart();
  }

  renderChart() {
    const ctx = this.querySelector('#lineChart').getContext('2d');
    if (this._chart) {
      this._chart.destroy();
    }
    this._chart = new Chart(ctx, {
      type: 'line',
      data: this._data,
      options: this._options,
    });
  }
}

customElements.define('line-chart', LineChart);
