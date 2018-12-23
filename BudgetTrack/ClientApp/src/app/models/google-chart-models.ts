// pie chart configurations
export class PieChartConfig {
  title: string;
  pieHole: number

  constructor(title: string, pieHole: number) {
    this.title = title;
    this.pieHole = pieHole;
  }
}

export class ComboChartConfig {
  title: string;
  seriesType: string;

  constructor(title: string, seriesType: string) {
    this.title = title;
    this.seriesType = seriesType;
  }
}
