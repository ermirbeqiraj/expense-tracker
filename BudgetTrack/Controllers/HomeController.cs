using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetTrack.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTrack.Controllers
{
    /// <summary>
    /// Use this controller for displaying stuff needed in home page like stats, charts etc.
    /// </summary>
    [Route("api/[controller]/[action]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}