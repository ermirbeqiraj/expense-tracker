import { GoogleChartsBaseService } from './google-charts.base.service';
import { Injectable } from '@angular/core';
import { PieChartConfig, ComboChartConfig } from '../models/google-chart-models';

declare var google: any;

@Injectable()
export class GooglePieChartService extends GoogleChartsBaseService {
  constructor() { super(); }

  public BuildPieChart(elementId: string, data: any[], config: PieChartConfig): void {
    let chartFunc = () => { return new google.visualization.PieChart(document.getElementById(elementId)); };
    let options = {
      pieHole: config.pieHole,
      chartArea: { width: '90%', height: '80%' },
      legend: { position: 'bottom' }
    };

    this.buildChart(data, chartFunc, options);
  }
}

@Injectable()
export class GoogleComboChartService extends GoogleChartsBaseService {
  constructor() { super(); }

  public BuildComboChart(elementId: string, data: any[], config: ComboChartConfig): void {
    let chartFunc = () => { return new google.visualization.ComboChart(document.getElementById(elementId)); };
    let options = {
      seriesType: config.seriesType,
      chartArea: { left: 80 , width : '100%', height: '80%' },
      legend: { position: 'bottom' }
    };

    this.buildChart(data, chartFunc, options);
  }
}
