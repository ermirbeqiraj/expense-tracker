import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from "../services/account.service";
import { UpdatePasswordDto } from '../models/LoginResult';
@Component({
  selector: 'update-pwd',
  templateUrl: './update-pwd.component.html'
})
export class UpdatePwdComponent {
  form: FormGroup;
  successMessage: string;
  errMessage: string;

  constructor(fb: FormBuilder, private accountService: AccountService) {
    this.form = fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }
  ngOnInit() {
  }

  submit({ value, valid }: { value: UpdatePasswordDto, valid: boolean }) {
    this.successMessage = "";
    this.errMessage = "";
    if (!valid)
      this.errMessage = "Form is not valid";

    this.accountService.updatePassword(value).subscribe(respnose => {
      this.successMessage = "Password updated!";
      this.form.reset();
    }, err => this.errMessage = err);
  }
}
