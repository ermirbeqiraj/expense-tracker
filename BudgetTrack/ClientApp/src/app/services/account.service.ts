import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { LoginResult, UpdatePasswordDto } from '../models/LoginResult';

@Injectable()
export class AccountService {
  private apiUrl = '/api/Account';  // URL to web api
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const url = `${this.apiUrl}/Login`;
    return this.http.post<LoginResult>(url, { email: username, password: password });
  }

  updatePassword(model: UpdatePasswordDto) {
    const url = `${this.apiUrl}/UpdatePassword`;
    return this.http.post(url, model);
  }
}
