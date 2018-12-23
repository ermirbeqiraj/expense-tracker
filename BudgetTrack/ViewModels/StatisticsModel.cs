using System;
using System.Collections.Generic;
using System.Linq;

namespace BudgetTrack.ViewModels
{
    public class GroupDistributionModel
    {
        public GroupDistributionModel()
        {
            Categories = Enumerable.Empty<string>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> Categories { get; set; }
        public decimal Ammount { get; set; }
        public float Percentage { get; set; }
    }

    public class GroupDistributionMonthlyModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Month { get; set; }
        public decimal Ammount { get; set; }
    }
}
