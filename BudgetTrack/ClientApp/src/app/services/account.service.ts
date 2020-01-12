import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResult, UpdatePasswordDto } from '../models/LoginResult';
import { RegisterUserDto } from '../models/RegisterModels';

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

  registerUser(model: RegisterUserDto) {
    const url = `${this.apiUrl}/Register`;
    return this.http.post(url, model);
  }

  getUsers() {
    const url = `${this.apiUrl}/Users`;
    return this.http.get<string[]>(url);
  }

  delete(user: string) {
    const url = `${this.apiUrl}/Delete?email=${user}`;
    return this.http.delete(url);
  }
}
