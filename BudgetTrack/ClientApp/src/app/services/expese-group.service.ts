import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ExpenseGroupModel } from '../models/ExpenseGroupModel';

@Injectable()
export class ExpenseGroupsService {
  private apiUrl = '/api/ExpenseGroups';
  constructor(private http: HttpClient) { }

  getGroups() {
    const url = `${this.apiUrl}/GetGroups`;
    return this.http.get<ExpenseGroupModel[]>(url);
  }
}
