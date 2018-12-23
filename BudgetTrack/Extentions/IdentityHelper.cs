using System;
using System.Security.Claims;

namespace BudgetTrack.Extentions
{
    public static class IdentityHelper
    {
        public static string GetUserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
                throw new ArgumentNullException(nameof(principal));

            var usernameClaim = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return usernameClaim;
        }
    }
}
