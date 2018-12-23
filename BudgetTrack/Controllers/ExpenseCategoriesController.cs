using BudgetTrack.Data;
using BudgetTrack.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTrack.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ExpenseCategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ExpenseCategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> GetCategories()
        {
            var expenseCategories = await _context.ExpenseCategory
                                        .Select(x => new ExpenseCategoryModel
                                        {
                                            Id = x.Id,
                                            Name = x.Name,
                                            Description = x.Description,
                                            GroupId = x.ExpenseGroupId,
                                            GroupName = x.ExpenseGroup.Name
                                        })
                                        .ToListAsync();
            return Ok(expenseCategories);
        }

        public async Task<IActionResult> GetCategoriesFromGroup(int groupId)
        {
            var expenseCategories = await _context.ExpenseCategory
                                        .Where(x => x.ExpenseGroupId == groupId)
                                        .Select(x => new ExpenseCategoryModel
                                        {
                                            Id = x.Id,
                                            Name = x.Name,
                                            Description = x.Description
                                        })
                                        .ToListAsync();

            return Ok(expenseCategories);
        }
    }
}