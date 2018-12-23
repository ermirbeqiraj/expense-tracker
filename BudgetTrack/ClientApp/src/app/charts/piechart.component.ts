import { Component, Input, OnInit } from '@angular/core';
import { PieChartConfig } from '../models/google-chart-models';
import { GooglePieChartService } from '../services/google-charts-service';

declare var google: any;

@Component({
  selector: 'pie-chart',
  template:`<div id="{{elementId}}" style="height: 400px;"></div>`
})
export class PieChartComponent implements OnInit {

  @Input() data: any[];
  @Input() config: PieChartConfig;
  @Input() elementId: string;

  constructor(private _pieChartService: GooglePieChartService) { }

  ngOnInit(): void {
    this._pieChartService.BuildPieChart(this.elementId, this.data, this.config);
  }
}
