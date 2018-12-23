using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BudgetTrack.Entities
{
    /// <summary>
    /// Hold exact categories, which will belong to a specific group.
    /// </summary>
    public class ExpenseCategory
    {
        public ExpenseCategory()
        {
            Expense = new HashSet<Expense>();
        }

        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public int ExpenseGroupId { get; set; }

        public virtual ExpenseGroup ExpenseGroup { get; set; }
        public virtual ICollection<Expense> Expense { get; set; }
    }
}
