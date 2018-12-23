using System.ComponentModel.DataAnnotations;

namespace BudgetTrack.ViewModels
{
    public class ExpenseCategoryModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }

        public int GroupId { get; set; }
        public string GroupName { get; set; }
    }
}
