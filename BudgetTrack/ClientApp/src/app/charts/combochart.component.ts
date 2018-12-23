import { Component, Input, OnInit } from '@angular/core';
import { ComboChartConfig } from '../models/google-chart-models';
import { GoogleComboChartService } from '../services/google-charts-service';

declare var google: any;

@Component({
  selector: 'combo-chart',
  template: `<div id="{{elementId}}" style="height: 500px;width:1500px;"></div>`
})
export class ComboChartComponent implements OnInit {

  @Input() data: any[];
  @Input() config: ComboChartConfig;
  @Input() elementId: string;

  constructor(private chartService: GoogleComboChartService) { }

  ngOnInit(): void {
    this.chartService.BuildComboChart(this.elementId, this.data, this.config);
  }
}
