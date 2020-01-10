import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from "../services/account.service";
import { LocalStorageManager } from "../services/local-storage.service";

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
    this.accountService.login(form.value.userName, form.value.password).subscribe(result => {
      this.storageManager.SetToken(result.access_token);
      this.storageManager.SetRoles(result.roles);

      this.router.navigate(['']);
    }, err => console.log(err));
  }
}
