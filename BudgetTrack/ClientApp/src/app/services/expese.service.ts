import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExpenseModel, ExpenseIndexModel } from '../models/ExpenseModel';

@Injectable()
export class ExpensesService {
  private apiUrl = '/api/Expenses';
  constructor(private http: HttpClient) { }

  getExpenses(startDate: string, endDate: string, category?: number) {
    let url = `${this.apiUrl}/GetExpenses?startDate=${startDate}&endDate=${endDate}`;
    if (category)
      url += `&category=${category}`;
    return this.http.get<ExpenseIndexModel[]>(url);
  }

  postExpense(model: ExpenseModel) {
    const url = `${this.apiUrl}/PostExpense`;
    return this.http.post(url, model);
  }

  putExpense(id: number, model: ExpenseModel) {
    const url = `${this.apiUrl}/PutExpense?id=${id}`;
    return this.http.put(url, model);
  }

  getExpenseById(id: number) {
    const url = `${this.apiUrl}/GetExpenseById?id=${id}`;
    return this.http.get<ExpenseModel>(url);
  }

  deleteExpense(id: number) {
    const url = `${this.apiUrl}/DeleteExpense?id=${id}`;
    return this.http.delete(url);
  }
}
