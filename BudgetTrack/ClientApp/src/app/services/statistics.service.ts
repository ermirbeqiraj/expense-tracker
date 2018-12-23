import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { GroupDistributionModel, GroupDistributionMonthlyModel, CategoryDistributionModel } from '../models/StatisticModels';

@Injectable()
export class StatisticsService {
  private apiUrl = '/api/Statistics';
  constructor(private http: HttpClient) { }

  getGroupsDistribution(from: string, to: string) {
    const url = `${this.apiUrl}/GetGroupsDistribution?from=${from}&to=${to}`;
    return this.http.get<GroupDistributionModel[]>(url);
  }

  getGroupsMonthlyDistribution(to: string) {
    const url = `${this.apiUrl}/GetGroupsMonthlyDistribution?to=${to}`;
    return this.http.get<GroupDistributionMonthlyModel[]>(url);
  }

  getCategoryDistribution(groupId: number, from: string, to: string) {
    const url = `${this.apiUrl}/GetCategoryDistribution?groupId=${groupId}&from=${from}&to=${to}`;
    return this.http.get<CategoryDistributionModel[]>(url);
  }
}
