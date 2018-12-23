"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GoogleChartsBaseService = /** @class */ (function () {
    function GoogleChartsBaseService() {
        google.charts.load('current', { 'packages': ['corechart'] });
    }
    GoogleChartsBaseService.prototype.buildChart = function (data, chartFunc, options) {
        var func = function (chartFunc, options) {
            var datatable = google.visualization.arrayToDataTable(data);
            chartFunc().draw(datatable, options);
        };
        var callback = function () { return func(chartFunc, options); };
        google.charts.setOnLoadCallback(callback);
    };
    return GoogleChartsBaseService;
}());
exports.GoogleChartsBaseService = GoogleChartsBaseService;
//# sourceMappingURL=google-charts.base.service.js.map