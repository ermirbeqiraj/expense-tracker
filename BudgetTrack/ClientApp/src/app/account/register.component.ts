import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterUserDto } from "../models/RegisterModels";
import { AccountService } from "../services/account.service";

@Component({
  selector: 'register',
  templateUrl : './register.component.html'
})
export class RegisterComponent {
  form: FormGroup;
  successMessage: string;
  errMessage: string;

  constructor(fb: FormBuilder, private accountService: AccountService) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  submit({ value, valid }: { value: RegisterUserDto, valid: boolean }) {
    this.successMessage = this.errMessage = "";

    if (!valid) {
      this.errMessage = "Form is not valid";
    }

    this.accountService.registerUser(value).subscribe(response => {
      this.successMessage = "User created";
      this.form.reset();
    }, err => this.errMessage = err);
  }
}
