import { Component, OnInit } from '@angular/core';

import { ExpenseGroupModel } from '../models/ExpenseGroupModel';
import { ExpenseGroupsService } from '../services/expese-group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  groups: ExpenseGroupModel[] = [];
  constructor(private groupsService: ExpenseGroupsService) {
  }

  ngOnInit(): void {
    this.groupsService.getGroups().subscribe(result => {
      this.groups = result;
    }, err => console.log(err));
  }
}
