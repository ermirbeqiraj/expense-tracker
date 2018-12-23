import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ExpenseModel } from '../models/ExpenseModel';
import { ExpenseCategoryModel } from '../models/ExpenseCategoryModel';
import { ExpenseCategoriesService } from '../services/expese-category.service';
import { ExpensesService } from '../services/expese.service';

@Component({
  selector: 'expenses-edit',
  templateUrl: './expenses-edit.component.html',
})
export class ExpensesEditComponent implements OnInit {
  categories: ExpenseCategoryModel[] = [];
  expenseId: number;
  form: FormGroup;
  errMessage: string = '';
  successMessage: string = '';

  constructor(private categoriesService: ExpenseCategoriesService, private expensesService: ExpensesService,
    private aRoute: ActivatedRoute, private fb: FormBuilder) {
    this.aRoute.params.subscribe(param => this.expenseId = param['id']);

    this.form = this.fb.group({
      id: ['', [Validators.required]],
      expenseCategoryId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      ammount: ['', [Validators.required]],
      description: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(result => {
      this.categories = result;
      this.initDefaults();
    }, err => this.errMessage = err);
  }

  initDefaults() {
    this.expensesService.getExpenseById(this.expenseId).subscribe(response => {
      this.form.patchValue({
        id: response.id,
        expenseCategoryId: response.expenseCategoryId,
        date: moment(response.date, "DD-MM-YYYY").format('YYYY-MM-DD'),
        ammount: response.ammount,
        description: response.description
      });
    }, err => this.errMessage = err);
  }

  onSubmit({ value, valid }: { value: ExpenseModel, valid: boolean }) {
    if (valid) {
      this.errMessage = "";
      this.successMessage = "";
      value.date = moment(value.date).format('DD-MM-YYYY');

      this.expensesService.putExpense(this.expenseId, value).subscribe(respose => {
        this.successMessage = "Updated successfully";
        this.form.reset();
        this.initDefaults();
      }, err => {
        this.errMessage = err;
      });
    }
    else {
      this.errMessage = "Form is not valid.";
    }
  }
}
