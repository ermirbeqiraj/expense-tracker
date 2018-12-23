using BudgetTrack.Data;
using BudgetTrack.Extentions;
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
    public class ExpensesController : ControllerBase
    {
        private readonly string DATE_FORMAT = "dd-MM-yyyy";
        private readonly ApplicationDbContext _context;
        public ExpensesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetExpenses(string startDate, string endDate, int? category)
        {
            var dbItems = _context.Expenses
                                    .Select(x => new ExpenseIndexModel
                                    {
                                        Id = x.Id,
                                        AddedBy = x.AddedBy,
                                        Ammount = x.Ammount,
                                        Date = x.Date,
                                        Description = x.Description,
                                        Latitude = x.Latitude,
                                        Longitude = x.Longitude,
                                        ExpenseCategoryId = x.ExpenseCategoryId,
                                        ExpenseCategoryName = x.ExpenseCategory.Name
                                    });

            if (!string.IsNullOrEmpty(startDate))
            {
                if (DateTime.TryParseExact(startDate, DATE_FORMAT, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime start))
                    dbItems = dbItems.Where(x => x.Date >= start);
            }

            if (!string.IsNullOrEmpty(endDate))
            {
                if (DateTime.TryParseExact(endDate, DATE_FORMAT, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime end))
                    dbItems = dbItems.Where(x => x.Date <= end);
            }

            if (category.HasValue)
                dbItems = dbItems.Where(x => x.ExpenseCategoryId == category);

            var result = await dbItems.OrderByDescending(d => d.Date).ToListAsync();
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetExpenseById(int id)
        {
            var dbData = await _context.Expenses.Where(x => x.Id == id)
                                          .Select(x => new ExpenseModel
                                          {
                                              Id = x.Id,
                                              Ammount = x.Ammount,
                                              Date = x.Date.ToString(DATE_FORMAT, CultureInfo.InvariantCulture),
                                              Description = x.Description,
                                              ExpenseCategoryId = x.ExpenseCategoryId
                                          }).FirstOrDefaultAsync();
            if (dbData == null)
                return NotFound();
            return Ok(dbData);
        }

        [HttpPost]
        public IActionResult PostExpense([FromBody]ExpenseModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model state is not valid.");

            if (!DateTime.TryParseExact(model.Date, this.DATE_FORMAT, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime modelDate))
            {
                return BadRequest($"Date is not formated correctly. Please use: {DATE_FORMAT} format.");
            }

            _context.Expenses.Add(new Entities.Expense
            {
                ExpenseCategoryId = model.ExpenseCategoryId,
                Description = model.Description,
                Date = modelDate,
                Ammount = model.Ammount,
                AddedBy = User.GetUserId(),
                Latitude = model.Latitude,
                Longitude = model.Longitude
            });
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> PutExpense(int? id, [FromBody]ExpenseModel model)
        {
            if (!id.HasValue)
                return NotFound();

            if (id != model.Id)
                return BadRequest("Identifier of the object does not match");

            if (!ModelState.IsValid)
                return BadRequest("Model state is not valid.");

            if (!DateTime.TryParseExact(model.Date, this.DATE_FORMAT, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime modelDate))
                return BadRequest($"Date is not formated correctly. Please use: {DATE_FORMAT} format.");

            var dbExpense = await _context.Expenses.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (dbExpense == null)
                return NotFound();

            dbExpense.ExpenseCategoryId = model.ExpenseCategoryId;
            dbExpense.Date = modelDate;
            dbExpense.Ammount = model.Ammount;
            dbExpense.Description = model.Description;
            // who changed this
            dbExpense.ModifiedBy = User.GetUserId();
            dbExpense.ModifiedDate = DateTime.UtcNow;

            _context.Entry(dbExpense).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(model);
        }

        public async Task<IActionResult> DeleteExpense(int? id)
        {
            if (!id.HasValue)
                return NotFound();

            var dbItem = await _context.Expenses.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (dbItem == null)
                return NotFound();
            else
            {
                dbItem.ModifiedDate = DateTime.UtcNow;
                dbItem.ModifiedBy = User.GetUserId();
                dbItem.Active = false;
                _context.Entry(dbItem).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}