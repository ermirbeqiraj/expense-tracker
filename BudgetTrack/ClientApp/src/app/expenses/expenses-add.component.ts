import { Component, OnInit } from '@angular/core';
import { ExpenseCategoryModel } from '../models/ExpenseCategoryModel';
import { ExpenseCategoriesService } from '../services/expese-category.service';
import { ExpensesService } from '../services/expese.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ExpenseModel } from '../models/ExpenseModel';

let lat = 41;
let lon = 19;

@Component({
  selector: 'expenses-add',
  templateUrl: './expenses-add.component.html',
})
export class ExpensesAddComponent implements OnInit {
  categories: ExpenseCategoryModel[] = [];
  groupId: number;
  form: FormGroup;
  errMessage = '';
  successMessage = '';

  constructor(private categoriesService: ExpenseCategoriesService, private expensesService: ExpensesService,
    private aRoute: ActivatedRoute, private fb: FormBuilder) {
    this.aRoute.params.subscribe(param => this.groupId = param['id']);

    this.form = this.fb.group({
      expenseCategoryId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      ammount: ['', [Validators.required]],
      description: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.categoriesService.getCategoriesFromGroup(this.groupId).subscribe(result => {
      this.categories = result;
      this.initDefaults();
    }, err => console.log(err));

    this.getDeviceLocation();
  }

  initDefaults() {
    const today = new Date();
    this.form.patchValue({
      date: moment(today).format('YYYY-MM-DD'),
      expenseCategoryId: this.categories[0].id
    });
  }

  getDeviceLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo, this.handleLocationError, {
        timeout: 5000, enableHighAccuracy: true
      });
    } else {
      console.warn('Geolocation not available in this device.');
    }
  }

  displayLocationInfo(position) {
    lon = position.coords.longitude;
    lat = position.coords.latitude;
  }

  handleLocationError(error) {
    console.log('failed to retrieve device location');
  }

  onSubmit({ value, valid }: { value: ExpenseModel, valid: boolean }) {
    if (valid) {
      this.errMessage = "";
      this.successMessage = "";

      if (lat && lon) {
        value.latitude = lat;
        value.longitude = lon;
      }

      value.date = moment(value.date).format('DD-MM-YYYY');

      this.expensesService.postExpense(value).subscribe(respose => {
        this.successMessage = 'Inserted successfully';
        this.form.reset();
        this.initDefaults();
      });
    } else {
      this.errMessage = 'Form is not valid.';
    }
  }
}
