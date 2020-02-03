import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const noDisplay = {display: false};

const scaleAxes = {
  gridLines: noDisplay,
  ticks: {
    beginAtZero: true,
    fontSize: 20,
  },
};

const makeOptions = ({title, formatter}) => ({
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  label: title.toUpperCase(),
  fontSize: 14,
  options: {
    layout: {
      padding: {
        left: 90,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      xAxes: [Object.assign({}, scaleAxes, noDisplay)],
      yAxes: [scaleAxes],
    },
    legend: noDisplay,
    title: {
      display: true,
      text: title,
      fontSize: 20,
    },
    tooltips: {
      enabled: false,
    },
    plugins: {
      datalabels: {
        formatter,
        clip: true,
        anchor: `start`,
        align: `right`,
        font: {
          size: 16,
        },
      }
    },
  },
});

const makeChartData = ({labels, values}) => ({
  labels,
  datasets: [{
    data: values,
    backgroundColor: `#fff`,
  }],
});

const makeChart = (element, options = {}) =>
  new Chart(element, makeOptions(options));

export {
  makeChartData,
  makeChart
};
