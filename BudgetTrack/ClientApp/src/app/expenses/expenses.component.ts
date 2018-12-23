import { Component, OnInit } from '@angular/core';
import { ExpenseCategoryModel } from '../models/ExpenseCategoryModel';
import { ExpenseCategoriesService } from '../services/expese-category.service';
import { ExpenseIndexModel } from '../models/ExpenseModel';
import { ExpensesService } from '../services/expese.service';
import * as moment from 'moment';

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent implements OnInit {
  categories: ExpenseCategoryModel[] = [];
  expenses: ExpenseIndexModel[] = [];
  total: number = 0;
  today: string;

  selectedCategory: number;
  startDate: string;
  endDate: string;
  JS_FORMAT = 'YYYY-MM-DD';

  constructor(private categoriesService: ExpenseCategoriesService, private expensesService: ExpensesService) {
    let now = new Date(); // today
    let first = new Date(now.getFullYear(), now.getMonth(), 1); // first date of month

    this.endDate = moment(now).format(this.JS_FORMAT);
    this.startDate = moment(first).format(this.JS_FORMAT);
    this.today = moment(now).format(this.JS_FORMAT);
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(result => {
      this.categories = result;
    }, err => console.log(err));

    this.getExpenses(this.startDate, this.endDate, null);
  }

  getExpenses(startDate: string, endDate: string, category: number) {
    let startStr = moment(startDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
    let endStr = moment(endDate, 'YYYY-MM-DD').format('DD-MM-YYYY');

    this.expensesService.getExpenses(startStr, endStr, category)
      .subscribe(result => {
        this.expenses = result;
        let totalExpenses = 0;
        for (let i = 0; i < this.expenses.length; i++) {
          totalExpenses += this.expenses[i].ammount;
        }

        this.total = totalExpenses;

      }, err => console.log(err));
  }

  deleteExpense(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.expensesService.deleteExpense(id).subscribe(() => this.getExpenses(this.startDate, this.endDate, this.selectedCategory)
        , err => console.log(err));
    }
  }

  getColor(date: any) {
    let dt = moment(date).format(this.JS_FORMAT);
    if (dt == this.today)
      return '#ffeeba';

  }

  search() {
    this.getExpenses(this.startDate, this.endDate, this.selectedCategory);
  }
}
