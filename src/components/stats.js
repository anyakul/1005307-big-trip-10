import AbstractComponent from './abstract';
import {createStatsTemplates} from './templates/stats';
import {TYPES} from '../data/types';
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
//import {calcDuration, formatDuration} from './templates/date';
import moment, {duration} from 'moment';

const getSumByType = (type, events) => events
  .reduce((acc, item) => item.type === type
    ? acc + item.price
    : acc, 0);

const getDurationByType = (type, events) => events
  .reduce((acc, item) => item.type === type
    ? acc + duration(moment(item.endDate).diff(item.startDate))
    : acc, 0);

const padding = {
  padding: {
    left: 150,
    right: 0,
    top: 0,
    bottom: 0
  }
};

const scalesConf = {
  xAxes: [{
    display: false,
    ticks: {
      beginAtZero: true,
      fontSize: 20,
    },
    gridLines: {
      display: false
    },
  }],
  yAxes: [{
    ticks: {
      beginAtZero: true,
      fontSize: 20
    },
    gridLines: {
      display: false
    },
  }]
};

const legendConf = {
  display: false
};

const datasetConf = (values, lab) => {
  return [
    {
      label: lab,
      backgroundColor: `#ffffff`,
      fontColor: `#000000`,
      fontSize: 16,
      data: values,
      barThickness: 40,
    }
  ];
};

const emojis = new Map().set(`ship`, String.fromCodePoint())
    .set(`flight`, String.fromCodePoint(0x2708))
    .set(`bus`, String.fromCodePoint(0x1F68C))
    .set(`train`, String.fromCodePoint(0x1F686))
    .set(`ship`, String.fromCodePoint(0x1F6F3))
    .set(`restaurant`, String.fromCodePoint(0x1F374))
    .set(`check-in`, String.fromCodePoint(0x1F3E8))
    .set(`sightseeing`, String.fromCodePoint(0x1F3DB))
    .set(`transport`, String.fromCodePoint(0x1F698))
    .set(`drive`, String.fromCodePoint(0x1F697))
    .set(`taxi`, String.fromCodePoint(0x1F695));

const getUniqueTypes = (events, types) => {
  events.map((point) => {
    if (!types.includes(point.type)) {
      types.push(point.type);
    }
  });
}

const renderMoneyChart = (element, events) => {
  const types = [];
  getUniqueTypes(events, types);

  const chartData = types.map((label) => {
    return {
      name: label,
      total: getSumByType(label, events)
    };
  }).sort((a, b) => b.total - a.total);

  const labels = chartData.map((item) => `${emojis.get(item.name)} ${item.name}`);
  const values = chartData.map((item) => item.total);
  console.log(values);
  return new Chart(element, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    label: `MONEY`,
    fontSize: 16,
    data: {
      labels,
      datasets: datasetConf(values, `Money spent`)
    },
    options: {
      layout: padding,
      title: {
        display: true,
        text: `MONEY`,
        position: `left`,
        fontSize: 20
      },
      plugins: {
        datalabels: {
          formatter(value) {
            return `$ ${value}`;
          }
        }
      },
      scales: scalesConf,
      legend: legendConf,
    }
  });
};

const renderTransportChart = (element, points) => {
  const transportTypes = TYPES.filter((item) => item.type === `transfer`).map((item) => item.name);
  const dataTransport = [];
  points.map((point) => {
    if (transportTypes.includes(point.type)) {
      if (dataTransport[point.type]) {
        dataTransport[point.type]++;
      } else {
        dataTransport[point.type] = 1;
      }
    }
  });

  const labels = Object.keys(dataTransport).sort((a, b) => {
    return dataTransport[b] - dataTransport[a];
  }).map((key) => `${emojis.get(key)} ${key}`);
  const values = Object.values(dataTransport).sort((a, b) => {
    return b - a;
  });

  return new Chart(element, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    label: `TRANSPORT`,
    fontSize: 16,
    data: {
      labels,
      datasets: datasetConf(values, `Count`)
    },
    options: {
      layout: padding,
      title: {
        display: true,
        text: `TRANSPORT`,
        position: `left`,
        fontSize: 20
      },
      plugins: {
        datalabels: {
          formatter(value) {
            return `${value}x`;
          }
        }
      },
      scales: scalesConf,
      legend: legendConf,
    }
  });
};

const formatTimeValue = ([format, value]) => `${String(value).padStart(2, `0`)}${format}`;
const formatDurationTime = (duration) => Object.entries(duration).map(formatTimeValue).join(` `);
const formatDuration = (value) => {
  const {days: D, hours: H, minutes: M} = value;

 // if (D > 0) {
    return formatDurationTime({D, H, M});
 // }
 // if (H > 0) {
  //  return formatDurationTime({H, M});
 // }

 // return formatDurationTime({M});
};

const renderTimeChart = (element, events) => {
  const types = [];
  getUniqueTypes(events, types);

  const chartData = types.map((label) => {
    return {
      name: label,
      duration: getDurationByType(label, events)
    };
  }).sort((a, b) => b.duration - a.duration);

    const labels = chartData.map((item) => `${emojis.get(item.name)} ${item.name}`);
    const values = chartData.map((item) => item.duration);
    console.log(formatDuration(values));

  return new Chart(element, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    label: `TIME`,
    fontSize: 16,
    data: {
      labels,
      datasets: datasetConf(values, `Time spent`)
    },
    options: {
      layout: padding,
      title: {
        display: true,
        text: `TIME`,
        position: `left`,
        fontSize: 20
      },
      plugins: {
        datalabels: {
          formatter(value) {
            return formatDuration(value);
          }
        }
      },
    /*  tooltips: {
        callbacks: {
          label: (value) => {
            return value;
          }
        }
      },*/
      scales: scalesConf,
      legend: legendConf,
    }
  });
};

class StatsComponent extends AbstractComponent {
  constructor(statsTypes, model) {
    super();
    this._statsTypes = statsTypes;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;
    this._events = model.getEventsAll();
    this._renderCharts();
  }

  getTemplate() {
    return createStatsTemplates(this._statsTypes);
  }

  _renderCharts() {
    const element = this.getElement();
    const moneyBlock = element.querySelector(`.statistics__chart--money`);
    const transportBlock = element.querySelector(`.statistics__chart--transport`);
    const timeBlock = element.querySelector(`.statistics__chart--spend`);
 //   this._moneyChart = renderMoneyChart(moneyBlock, this._events);
 //   this._transportChart = renderTransportChart(transportBlock, this._events);
    this._timeChart = renderTimeChart(timeBlock, this._events);
  }
}

export default StatsComponent;
