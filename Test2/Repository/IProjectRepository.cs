using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test2.Models;

namespace Test2.Repository
{
    public interface IProjectRepository
    {
        List<barometricpressure> GetAllBarometricPressure();
        List<battery> GetAllBatteries();
        List<humidity> GetAllHumidities();
        List<luminance> GetAllLuminance();
        List<temperature> GetAllTemperatures();
    }
}
