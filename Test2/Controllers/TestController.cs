using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Test2.Repository;

namespace Test2.Controllers
{
    public class TestController : Controller
    {

        private readonly IProjectRepository _repository;
        public TestController(IProjectRepository repository)
        {
            _repository = repository;
        }

        // GET: Test
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetBarometric()
        {
            return Ok(_repository.GetAllBarometricPressure());
        }

        [HttpGet]
        public IActionResult GetBattery()
        {
            return Ok(_repository.GetAllBatteries());
        }

        [HttpGet]
        public IActionResult GetHumidity()
        {
            return Ok(_repository.GetAllHumidities());
        }

        [HttpGet]
        public IActionResult GetLuminance()
        {
            return Ok(_repository.GetAllLuminance());
        }

        [HttpGet]
        public IActionResult GetTemperature()
        {
            return Ok(_repository.GetAllTemperatures());
        }
    }
}