using BudgetTrack.Extentions;
using BudgetTrack.Utility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BudgetTrack.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<object> Login([FromBody] LoginDto model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

            if (result.Succeeded)
            {
                var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email || r.UserName == model.Email);

                var userRoles = await _userManager.GetRolesAsync(appUser);

                var token = GenerateJwtToken(model.Email, appUser, userRoles.ToList());
                var obj = new
                {
                    access_token = token,
                    roles = userRoles.ToList()
                };

                return Ok(obj);
            }
            return BadRequest("Invalid login attempt");
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var user = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            var error = string.Join(", ", result.Errors.SelectMany(e => e.Description));
            return BadRequest(error);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> UpdatePassword([FromBody]UpdatePasswordDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is not valid.");

            var userId = User.GetUserId();
            var dbUser = await _userManager.FindByIdAsync(userId);
            if (dbUser == null)
                return NotFound();

            var updatePasswordResult = await _userManager.ChangePasswordAsync(dbUser, model.OldPassword, model.Password);
            if (updatePasswordResult.Succeeded)
                return Ok();
            else
                return BadRequest(updatePasswordResult.Errors.Select(x => x.Description).FirstOrDefault());
        }

        [HttpGet]
        [Authorize(Roles = Roles.ADMIN)]
        public async Task<IActionResult> Users()
        {
            var users = await _userManager.Users.Select(x => x.Email).ToListAsync();
            return Ok(users);
        }

        [HttpDelete]
        [Authorize(Roles = Roles.ADMIN)]
        public async Task<IActionResult> Delete(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound();

            await _userManager.DeleteAsync(user);
            return Ok();
        }

        private object GenerateJwtToken(string email, IdentityUser user, List<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, email),
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfigs:JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtConfigs:JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtConfigs:JwtIssuer"],
                _configuration["JwtConfigs:JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public class LoginDto
        {
            [Required]
            public string Email { get; set; }

            [Required]
            public string Password { get; set; }

        }

        public class RegisterDto
        {
            [Required]
            public string Email { get; set; }

            [Required]
            [StringLength(100, ErrorMessage = "PASSWORD_MIN_LENGTH", MinimumLength = 6)]
            public string Password { get; set; }
        }

        public class UpdatePasswordDto
        {
            [Required]
            public string OldPassword { get; set; }

            [Required]
            [StringLength(100, ErrorMessage = "PASSWORD_MIN_LENGTH", MinimumLength = 6)]
            public string Password { get; set; }

            [Compare("Password", ErrorMessage = "New password and confirm password does not match")]
            [Required]
            public string PasswordConfirm { get; set; }
        }
    }
}
