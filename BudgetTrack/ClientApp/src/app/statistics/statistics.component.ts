import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ExpenseGroupModel } from '../models/ExpenseGroupModel';
import { ExpenseGroupsService } from '../services/expese-group.service';
import { StatisticsService } from '../services/statistics.service';
import { GroupDistributionModel } from '../models/StatisticModels';
import { PieChartConfig, ComboChartConfig } from '../models/google-chart-models';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {
  groupDist: GroupDistributionModel[] = [];
  startDate: string;
  endDate: string;
  endDateGroup: string;
  total: number;
  JS_DATE_FORMAT: string = 'YYYY-MM-DD';
  CS_DATE_FORMAT: string = 'DD-MM-YYYY';
  // data for bar chart, configuration & html element id to render gchart into
  groupMonthData: any[];
  groupMonthConfig: ComboChartConfig;
  groupMonthElement: string = 'groupMonthElement';
  // data for pie chart, configuration & html element id to render categories distribution of the selected group
  groupCatData: any[];
  groupCatConfig: PieChartConfig;
  groupCatElement: string = 'groupCatElement';
  // top label for pie chart
  selectedGroupName: string = '';
  // data for pie chart, configuration & html element id to render categories distribution of all groups (the tabular data)
  groupData: any[];
  groupConfig: PieChartConfig;
  groupElement: string = 'groupElement';

  constructor(private statisticsService: StatisticsService) {
    this.endDateGroup = moment(new Date()).format(this.JS_DATE_FORMAT);
    this.endDate = moment(new Date()).format(this.JS_DATE_FORMAT);
    this.startDate = moment(new Date()).add(-30, 'days').format(this.JS_DATE_FORMAT);
  }

  ngOnInit(): void {
    this.getGroupsDistribution(this.startDate, this.endDate);
    this.getGroupsMonthlyDist(this.endDateGroup);
  }

  getGroupsDistribution(from: string, to: string) {
    // hide group chart dist
    this.groupData = null;
    // parse dates
    from = moment(from, this.JS_DATE_FORMAT).format(this.CS_DATE_FORMAT);
    to = moment(to, this.JS_DATE_FORMAT).format(this.CS_DATE_FORMAT);

    this.statisticsService.getGroupsDistribution(from, to).subscribe(response => {
      this.groupDist = response;
      // find total
      let totalExpenses = 0;
      for (let i = 0; i < this.groupDist.length; i++) {
        totalExpenses += this.groupDist[i].ammount;
      }
      this.total = totalExpenses;
      // find percentage distribution, help in building the chart data
      let firstRow = ['Group', 'Ammount'];
      let chartData = [];
      chartData.push(firstRow);

      for (let i = 0; i < this.groupDist.length; i++) {
        this.groupDist[i].percentage = this.groupDist[i].ammount / this.total;// * 100;
        chartData.push([response[i].name, response[i].ammount]);
      }

      // set values for group chart
      this.groupConfig = new PieChartConfig('', 0.3);
      this.groupData = chartData;

      // get pie chart data for category distribution, default to first item of the list:
      if (this.groupDist.length)
        this.getDetails(this.groupDist[0].id, this.groupDist[0].name);
    }, err => console.log(err));
  }

  getGroupsMonthlyDist(to: string) {
    this.groupMonthData = null;
    to = moment(to, this.JS_DATE_FORMAT).format(this.CS_DATE_FORMAT);
    this.statisticsService.getGroupsMonthlyDistribution(to).subscribe(result => {

      // get all months & groups from response result:
      let months = [];
      let groups = [];
      for (let i = 0; i < result.length; i++) {
        // current date part
        let currentItem = moment(result[i].month).format('MM/YYYY');
        // check if already in months array:
        if (!months.filter(x => x == currentItem).length)
          months.push(currentItem);

        let currentGroup = result[i].name;
        if (!groups.filter(x => x == currentGroup).length)
          groups.push(currentGroup);
      }

      // create the first row of matrix, it should be like: ['Month', 'Category One', 'Category two', '...']
      let firstRow = ['Month'];
      for (let i = 0; i < groups.length; i++) {
        firstRow.push(groups[i]);
      }

      let chartArray = [firstRow];

      // browse for months
      for (let i = 0; i < months.length; i++) {
        let nextRow = [months[i]];
        // browse for groups
        for (let j = 0; j < groups.length; j++) {
          // search result for ammount on this month and group
          let currentAmmount = result.filter(x => x.name == groups[j] && moment(x.month).format('MM/YYYY') == months[i]);
          if (currentAmmount.length)
            nextRow.push(currentAmmount[0].ammount);
          else
            nextRow.push(0);
        }
        chartArray.push(nextRow);
      }

      this.groupMonthConfig = new ComboChartConfig('Groupped months', 'bars');
      this.groupMonthData = chartArray;
    }, err => console.log(err));
  }

  search() {
    this.getGroupsDistribution(this.startDate, this.endDate);
  }

  searchMonthlyDist() {
    this.getGroupsMonthlyDist(this.endDateGroup);
  }

  getDetails(groupId: number, groupName: string) {
    this.groupCatData = null;
    this.selectedGroupName = '';

    let from = moment(this.startDate, this.JS_DATE_FORMAT).format(this.CS_DATE_FORMAT);
    let to = moment(this.endDate, this.JS_DATE_FORMAT).format(this.CS_DATE_FORMAT);
    this.statisticsService.getCategoryDistribution(groupId, from, to).subscribe(response => {
      let firstRow = ['Category', 'Ammount'];
      let chartData = [];
      chartData.push(firstRow);
      for (let i = 0; i < response.length; i++) {
        chartData.push([response[i].name, response[i].ammount]);
      }

      this.groupCatConfig = new PieChartConfig('', 0);
      this.groupCatData = chartData;
      this.selectedGroupName = groupName;
    }, err => console.log(err));
  }
}
