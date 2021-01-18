import {Smart} from "./smart.js";
import {typeDescriptions} from "../util/const.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';


const createStatisticsTemplate = () => {

  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
};

class Stats extends Smart {
  constructor() {
    super();
    this._barHeight = 55;
    this._data = {};
  }

  _renderMoneyChart(points) {
    const moneyCtx = document.querySelector(`.statistics__chart--money`);
    moneyCtx.height = this._barHeight * 8;

    const getPointsTypePrice = (pointsType) => {
      let pointsTypeFullPrice = 0;
      for (const point of this._getTypePoints(points, pointsType)) {
        pointsTypeFullPrice += point.price;
      }
      return pointsTypeFullPrice;
    };

    return new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`, `FLIGHT`, `CHECK-IN`, `SIGHTSEEING`, `RESTAURANT`],
        datasets: [{
          data: [
            getPointsTypePrice(typeDescriptions[0].type),
            getPointsTypePrice(typeDescriptions[1].type),
            getPointsTypePrice(typeDescriptions[2].type),
            getPointsTypePrice(typeDescriptions[3].type),
            getPointsTypePrice(typeDescriptions[4].type),
            getPointsTypePrice(typeDescriptions[5].type),
            getPointsTypePrice(typeDescriptions[6].type),
            getPointsTypePrice(typeDescriptions[7].type),
            getPointsTypePrice(typeDescriptions[8].type),
            getPointsTypePrice(typeDescriptions[9].type)
          ],
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `€ ${val}`
          }
        },
        title: {
          display: true,
          text: `MONEY`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  _renderTypeChart(points) {
    const typeCtx = document.querySelector(`.statistics__chart--transport`);
    typeCtx.height = this._barHeight * 8;

    const getPointsTypeRepeat = (pointsType) => {
      return this._getTypePoints(points, pointsType).length;
    };

    return new Chart(typeCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`, `FLIGHT`, `CHECK-IN`, `SIGHTSEEING`, `RESTAURANT`],
        datasets: [{
          data: [
            getPointsTypeRepeat(typeDescriptions[0].type),
            getPointsTypeRepeat(typeDescriptions[1].type),
            getPointsTypeRepeat(typeDescriptions[2].type),
            getPointsTypeRepeat(typeDescriptions[3].type),
            getPointsTypeRepeat(typeDescriptions[4].type),
            getPointsTypeRepeat(typeDescriptions[5].type),
            getPointsTypeRepeat(typeDescriptions[6].type),
            getPointsTypeRepeat(typeDescriptions[7].type),
            getPointsTypeRepeat(typeDescriptions[8].type),
            getPointsTypeRepeat(typeDescriptions[9].type)
          ],
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: `TYPE`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  _renderTimeSpendChart(points) {
    const timeCtx = document.querySelector(`.statistics__chart--time`);
    timeCtx.height = this._barHeight * 8;

    const getPointsTimeSpend = (pointsType) => {
      const diffTime = [];
      const modules = {
        hour: 24,
      };
      let diffTimeHour = 0;
      for (const point of this._getTypePoints(points, pointsType)) {
        diffTimeHour += point.endDateTime.diff(point.startDateTime, `h`);
      }
      let diffTimeDay = Math.floor(diffTimeHour / modules.hour);

      if (diffTimeDay !== 0) {
        diffTime.push(diffTimeDay);
      }
      return Number(diffTime.join(` `));
    };

    return new Chart(timeCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`, `FLIGHT`, `CHECK-IN`, `SIGHTSEEING`, `RESTAURANT`],
        datasets: [{
          data: [
            getPointsTimeSpend(typeDescriptions[0].type),
            getPointsTimeSpend(typeDescriptions[1].type),
            getPointsTimeSpend(typeDescriptions[2].type),
            getPointsTimeSpend(typeDescriptions[3].type),
            getPointsTimeSpend(typeDescriptions[4].type),
            getPointsTimeSpend(typeDescriptions[5].type),
            getPointsTimeSpend(typeDescriptions[6].type),
            getPointsTimeSpend(typeDescriptions[7].type),
            getPointsTimeSpend(typeDescriptions[8].type),
            getPointsTimeSpend(typeDescriptions[9].type)
          ],
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}D`
          }
        },
        title: {
          display: true,
          text: `TIME-SPEND`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  renderCharts(allTrip) {
    this._renderMoneyChart(allTrip);
    this._renderTypeChart(allTrip);
    this._renderTimeSpendChart(allTrip);
  }

  destroy() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }

  _getTypePoints(points, pointsType) {
    return points.filter((trip) => {
      return trip.type === pointsType;
    });
  }
}

export {
  Stats
};
