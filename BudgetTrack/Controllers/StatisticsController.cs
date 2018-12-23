using BudgetTrack.Data;
using BudgetTrack.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTrack.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StatisticsController : ControllerBase
    {
        private readonly string DATE_FORMAT = "dd-MM-yyyy";
        private readonly ApplicationDbContext _context;
        public StatisticsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetGroupsDistribution(string from, string to)
        {
            if (string.IsNullOrEmpty(from) || string.IsNullOrEmpty(to))
                return BadRequest("Provide a from and to argument formatted as dd-MM-yyyy");

            if (!DateTime.TryParseExact(from, DATE_FORMAT, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime startDate))
                return BadRequest($"Argument '{from}' could not be parsed to a known date.");
            if (!DateTime.TryParseExact(to, DATE_FORMAT, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime endDate))
                return BadRequest($"Argument '{to}' could not be parsed to a known date.");

            var categories = await _context.ExpenseCategory.Select(x => new { x.ExpenseGroupId, x.Name }).ToListAsync();

            var dbData = await (from e in _context.Expenses
                                join eg in _context.ExpenseCategory on e.ExpenseCategoryId equals eg.Id
                                join egg in _context.ExpenseGroup on eg.ExpenseGroupId equals egg.Id
                                where e.Date >= startDate && e.Date <= endDate
                                select new
                                {
                                    egg.Id,
                                    egg.Name,
                                    e.Ammount
                                })
                              .GroupBy(x => new { x.Id, x.Name })
                              .Select(g => new GroupDistributionModel
                              {
                                  Id = g.Key.Id,
                                  Name = g.Key.Name,
                                  Ammount = g.Sum(x => x.Ammount)
                              })
                              .ToListAsync();

            dbData = dbData.OrderByDescending(x => x.Ammount).ToList();
            dbData.ForEach(gr => gr.Categories = categories.Where(x => x.ExpenseGroupId == gr.Id).Select(x => x.Name));

            return Ok(dbData);
        }

        [HttpGet]
        public async Task<IActionResult> GetGroupsMonthlyDistribution(string to)
        {
            if (string.IsNullOrEmpty(to))
                return BadRequest("Provide a 'to' argument formatted as dd-MM-yyyy");

            if (!DateTime.TryParseExact(to, DATE_FORMAT, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime endDate))
                return BadRequest($"Argument '{to}' could not be parsed to a known date.");

            var startDate = endDate.AddMonths(-12);

            var dbData = await (from e in _context.Expenses
                                join eg in _context.ExpenseCategory on e.ExpenseCategoryId equals eg.Id
                                join egg in _context.ExpenseGroup on eg.ExpenseGroupId equals egg.Id
                                where e.Date >= startDate && e.Date <= endDate
                                select new
                                {
                                    egg.Id,
                                    egg.Name,
                                    e.Date,
                                    e.Ammount
                                })
                                .GroupBy(x => new { x.Id, x.Name, x.Date.Month, x.Date.Year })
                                .Select(g => new GroupDistributionMonthlyModel
                                {
                                    Id = g.Key.Id,
                                    Name = g.Key.Name,
                                    Month = new DateTime(g.Key.Year, g.Key.Month, 1),
                                    Ammount = g.Sum(x => x.Ammount)
                                })
                                .ToListAsync();
            dbData = dbData.OrderBy(x => x.Month).ToList();

            return Ok(dbData);
        }

        [HttpGet]
        public async Task<IActionResult> GetCategoryDistribution(int groupId, string from, string to)
        {
            if (string.IsNullOrEmpty(from) || string.IsNullOrEmpty(to))
                return BadRequest("Provide a from and to argument formatted as dd-MM-yyyy");

            if (!DateTime.TryParseExact(from, DATE_FORMAT, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime startDate))
                return BadRequest($"Argument '{from}' could not be parsed to a known date.");
            if (!DateTime.TryParseExact(to, DATE_FORMAT, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime endDate))
                return BadRequest($"Argument '{to}' could not be parsed to a known date.");

            var dbData = await (from e in _context.Expenses
                                join ec in _context.ExpenseCategory on e.ExpenseCategoryId equals ec.Id
                                where e.Date >= startDate && e.Date <= endDate && ec.ExpenseGroupId == groupId
                                select new
                                {
                                    ec.Id,
                                    ec.Name,
                                    e.Ammount
                                })
                              .GroupBy(x => new { x.Id, x.Name })
                              .Select(g => new
                              {
                                  Id = g.Key.Id,
                                  Name = g.Key.Name,
                                  Ammount = g.Sum(x => x.Ammount)
                              })
                              .ToListAsync();
            return Ok(dbData);
        }
    }
}