// chart.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTooltip,
  ApexFill,
  ApexMarkers,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  fill: ApexFill;
  markers: ApexMarkers;
};

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    <div class="chart-container">
      <apx-chart
        [series]="chartOptions.series"
        [chart]="chartOptions.chart"
        [xaxis]="chartOptions.xaxis"
        [yaxis]="chartOptions.yaxis"
        [dataLabels]="chartOptions.dataLabels"
        [stroke]="chartOptions.stroke"
        [tooltip]="chartOptions.tooltip"
        [fill]="chartOptions.fill"
        [markers]="chartOptions.markers"
      >
      </apx-chart>
    </div>
  `,
  styles: [
    `
      .chart-container {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class ChartComponent implements OnChanges {
  @Input() series: number[] | null = null;

  chartOptions: ChartOptions = {
    series: [
      {
        name: 'Audio Features',
        data: [],
      },
    ],
    chart: {
      height: 350,
      type: 'bar',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ['#000', '#aeaeb2', '#ffffff'],
      },
    },
    stroke: {
      curve: 'straight',
    },
    xaxis: {
      categories: ['Energy', 'Valence', 'Danceability'],
      labels: {
        style: {
          colors: ['#ffffff', '#ffffff', '#ffffff'],
        },
      },
    },
    fill: {
      colors: ['#6644ae', '#8562c4', '#a480da'],
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: function (val) {
          return val + '%';
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: false,
      followCursor: true,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: 'dark',
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      x: {
        show: true,
        format: 'dd MMM',
        formatter: undefined,
      },
      y: {
        formatter: function (val) {
          return val + '%';
        },
        title: {
          formatter: function (seriesName) {
            return seriesName + ': ';
          },
        },
      },
      z: {
        formatter: undefined,
        title: 'Size: ',
      },
      marker: {
        show: true,
        fillColors: ['#6644ae', '#8562c4', '#a480da'],
      },
    },
    markers: {
      size: 6,
      colors: ['#ffffff'],
      strokeColors: ['#6644ae', '#8562c4', '#a480da'],
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: 'circle',

      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
      hover: {
        size: 8,
        sizeOffset: 3,
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series'] && this.series) {
      console.log('Chart received series data:', this.series);
      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            name: 'Audio Features',
            data: this.series.map((num) => Math.round(num * 100)),
          },
        ],
        dataLabels: {
          enabled: false,
          style: {
            colors: ['#000'],
          },
        },
        yaxis: {
          min: 0,
          max: 100,
          labels: {
            style: {
              colors: [
                '#ffffff',
                '#ffffff',
                '#ffffff',
                '#ffffff',
                '#ffffff',
                '#ffffff',
              ],
            },
            formatter: function (val) {
              return val + '%';
            },
          },
        },
        markers: {
          size: 6,
          colors: ['#ffffff'],
          strokeColors: ['#6644ae', '#8562c4', '#a480da'],
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: 'circle',

          offsetX: 0,
          offsetY: 0,
          showNullDataPoints: true,
          hover: {
            size: 8,
            sizeOffset: 3,
          },
        },
      };
    }
  }
}
