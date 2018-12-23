using System;
using System.ComponentModel.DataAnnotations;

namespace BudgetTrack.ViewModels
{
    public class ExpenseModel
    {
        public int Id { get; set; }

        public int ExpenseCategoryId { get; set; }

        public string Date { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Range(0, 1000000)]
        public decimal Ammount { get; set; }

        [MaxLength(50)]
        public string AddedBy { get; set; }

        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
    }

    public class ExpenseIndexModel
    {
        public int Id { get; set; }
        public int ExpenseCategoryId { get; set; }
        public string ExpenseCategoryName { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public decimal Ammount { get; set; }
        public string AddedBy { get; set; }
        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
    }
}
