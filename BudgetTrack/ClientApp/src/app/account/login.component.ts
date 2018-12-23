import { Component, OnInit, Inject } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginResult } from "../models/LoginResult";
import { Response } from "@angular/http";
import { LocalStorageManager } from "../services/local-storage.service";
import { HttpClient } from "@angular/common/http";
import { AccountService } from "../services/account.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  fg: FormGroup;
  private userName: string;
  private password: string;
  public message: string;
  base: string = '';

  constructor(private router: Router, fb: FormBuilder, private storageManager: LocalStorageManager, private accountService: AccountService) {
    this.fg = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    if (this.storageManager.GetToken()) {
      this.router.navigate(['']);
    }
  }

  login(form: any) {
    let body = {
      email: form.value.userName,
      password: form.value.password
    };

    this.accountService.login(form.value.userName, form.value.password).subscribe(result => {
      this.storageManager.SetToken(result.access_token);
      this.router.navigate(['']);
    }, err => console.log(err));
  }
}
