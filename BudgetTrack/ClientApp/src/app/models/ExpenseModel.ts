export class ExpenseModel {
  id: number;
  expenseCategoryId: number;
  date: string;
  description: string;
  ammount: number;
  addedBy: string;
  latitude?: number;
  longitude?: number;
}


export class ExpenseIndexModel {
  id: number;
  expenseCategoryId: number;
  expenseCategoryName: string;
  date: string;
  description: string;
  ammount: number;
  addedBy: string;
  latitude?: number;
  longitude?: number;
}
