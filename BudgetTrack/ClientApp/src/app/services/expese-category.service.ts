import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ExpenseCategoryModel } from '../models/ExpenseCategoryModel';

@Injectable()
export class ExpenseCategoriesService {
  private apiUrl = '/api/ExpenseCategories';
  constructor(private http: HttpClient) { }

  getCategories() {
    const url = `${this.apiUrl}/GetCategories`;
    return this.http.get<ExpenseCategoryModel[]>(url);
  }

  getCategoriesFromGroup(groupId: number) {
    const url = `${this.apiUrl}/GetCategoriesFromGroup?groupId=${groupId}`;
    return this.http.get<ExpenseCategoryModel[]>(url);
  }
}
