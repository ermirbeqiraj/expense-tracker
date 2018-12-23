export class CategoryDistributionModel {
  id: number;
  name: string;
  ammount: number;
}

export class GroupDistributionModel {
  id: number;
  name: string;
  ammount: number;
  percentage: number;
  categories: string[];
}

export class GroupDistributionMonthlyModel {
  id: number;
  name: string;
  ammount: number;
  month: Date;
}
