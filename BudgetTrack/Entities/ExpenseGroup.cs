using System.Collections.Generic;

namespace BudgetTrack.Entities
{
    /// <summary>
    /// Group simmilar expense categories into groups for groupped analysis
    /// </summary>
    public class ExpenseGroup
    {
        public ExpenseGroup()
        {
            ExpenseCategory = new HashSet<ExpenseCategory>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<ExpenseCategory> ExpenseCategory { get; set; }
    }
}
