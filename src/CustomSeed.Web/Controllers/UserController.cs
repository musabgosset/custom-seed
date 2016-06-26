using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CustomSeed.Web.Controllers
{
    public class LoginViewModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    [Route("api/[controller]")]
    public class UserController : Controller
    {
        [HttpPost]
        [Route("SignIn")]
        public async Task<ActionResult> SignIn([FromBody]LoginViewModel viewModel)
        {
            if (viewModel.Username != "Me" || viewModel.Password != "MyPassword")
            {
                return new BadRequestResult();
            }
            
            IIdentity identity = new GenericIdentity("Me", CookieAuthenticationDefaults.AuthenticationScheme);
            GenericPrincipal principal = new GenericPrincipal(identity, new string[0]);

            await HttpContext.Authentication.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            return Ok();
        }

        [HttpPost]
        [Authorize]
        [Route("SignOut")]
        public async Task<ActionResult> SignOut()
        {
            await HttpContext.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok();
        }
    }
}
