import Chart from 'chart.js/auto';

class BarChart extends HTMLElement {
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
    <div id="sales-chart" class="w-full h-fu;; p-6 rounded-2xl h-full bg-white">
        <canvas id="barChart"></canvas>
    </div>
    `;
    this.renderChart();
  }

  renderChart() {
    const ctx = this.querySelector('#barChart').getContext('2d');
    if (this._chart) {
      this._chart.destroy();
    }
    this._chart = new Chart(ctx, {
      type: 'bar',
      data: this._data,
      options: this._options,
    });
  }
}

customElements.define('bar-chart', BarChart);
