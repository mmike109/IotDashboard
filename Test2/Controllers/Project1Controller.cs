using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Test2.Controllers
{
    public class Project1Controller : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}