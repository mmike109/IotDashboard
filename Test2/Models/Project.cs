using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Test2.Models
{
    public partial class Project
    {
        public int Id { get; set; }
        [Display(Name = "Project Name")]
        public string ProjectName { get; set; }
        [Display(Name = "Controller Name")]
        public string ControllerName { get; set; }
        [Display(Name = "Show On Dashboard")]
        public bool? ShowOnDashboard { get; set; }
    }
    public partial class barometricpressure
    {
        public string name { get; set; }
        public long time { get; set; }
        public string sensor_number { get; set; }
        public string sensor_type { get; set; }
        public float value { get; set; }
    }
    public partial class battery
    {
        public string name { get; set; }
        public long time { get; set; }
        public string sensor_number { get; set; }
        public string sensor_type { get; set; }
        public int value { get; set; }
    }
    public partial class humidity
    {
        public string name { get; set; }
        public long time { get; set; }
        public string sensor_number { get; set; }
        public string sensor_type { get; set; }
        public float value { get; set; }
    }
    public partial class luminance
    {
        public string name { get; set; }
        public long time { get; set; }
        public string sensor_number { get; set; }
        public string sensor_type { get; set; }
        public float value { get; set; }
    }
    public partial class temperature
    {
        public string name { get; set; }
        public long time { get; set; }
        public string sensor_number { get; set; }
        public string sensor_type { get; set; }
        public float value { get; set; }
    }
}
