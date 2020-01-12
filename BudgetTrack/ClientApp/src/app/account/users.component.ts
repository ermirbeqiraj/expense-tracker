import { Component, OnInit } from "@angular/core";
import { AccountService } from "../services/account.service";

@Component({
  selector: 'users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  errMessage = "";
  users: string[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.accountService.getUsers().subscribe(data => {
      this.users = data;
    }, error => this.errMessage = error);
  }

  delete(user) {
    this.accountService.delete(user).subscribe(() => this.getUsers(), error => this.errMessage = error);
  }
}
