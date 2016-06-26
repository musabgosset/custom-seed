using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CustomSeed.Web.Controllers
{
    [Route("api/[controller]")]
    public class ValueController : Controller
    {
        public ActionResult Index()
        {
            return Ok(new string[] { "A", "B", "C" });
        }
    }
}
