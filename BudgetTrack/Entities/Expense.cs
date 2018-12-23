using System;
using System.ComponentModel.DataAnnotations;

namespace BudgetTrack.Entities
{
    public class Expense
    {
        public int Id { get; set; }

        public int ExpenseCategoryId { get; set; }

        public DateTime Date { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public decimal Ammount { get; set; }

        public virtual ExpenseCategory ExpenseCategory { get; set; }

        [MaxLength(50)]
        public string AddedBy { get; set; }

        public string ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public float? Latitude { get; set; }
        public float? Longitude { get; set; }

        public bool? Active { get; set; }
    }
}
