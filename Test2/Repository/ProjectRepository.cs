using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
//using Microsoft.Data.SqlClient;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Test2.Models;

namespace Test2.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        string connectionString = "";
        private readonly IHubContext<SignalServer> _context;
        public ProjectRepository(IConfiguration configuration, IHubContext<SignalServer> context)
        {
            connectionString = configuration.GetConnectionString("IOTDB");
            _context = context;
        }
        public List<barometricpressure> GetAllBarometricPressure()
        {
            var barometricpressures = new List<barometricpressure>();
            using(SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                SqlDependency.Start(connectionString);
                string cmdText = "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.barometricpressure where [sensor_number] ='E110-sensortag-01' UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.barometricpressure where [sensor_number] ='E110-sensortag-02' UNION " +
                    "select TOP(10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.barometricpressure where[sensor_number] = 'E110-sensortag-03' UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.barometricpressure where [sensor_number] ='E110-sensortag-04'UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.barometricpressure where [sensor_number] ='E110-sensortag-05'";
                
                
                SqlCommand cmd = new SqlCommand(cmdText, conn);
                SqlDependency dependency = new SqlDependency(cmd);

                dependency.OnChange += dbChangeNotification;

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    var barometricpressureInfo = new barometricpressure
                    {
                        time = Convert.ToInt64(reader["time"]),
                        name = reader["name"].ToString(),
                        sensor_number = reader["sensor_number"].ToString(),
                        sensor_type = reader["sensor_type"].ToString(),
                        value = (float)Convert.ToDouble(reader["value"])

                    };
                    barometricpressures.Add(barometricpressureInfo);
                }
            }
            return barometricpressures;
        }

        public List<battery> GetAllBatteries()
        {
            var batteryList = new List<battery>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                SqlDependency.Start(connectionString);
                string cmdText = "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.battery where [sensor_number] ='E110-sensortag-01' UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.battery where [sensor_number] ='E110-sensortag-02' UNION " +
                    "select TOP(10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.battery where[sensor_number] = 'E110-sensortag-03' UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.battery where [sensor_number] ='E110-sensortag-04'UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.battery where [sensor_number] ='E110-sensortag-05'"
                    ;


                SqlCommand cmd = new SqlCommand(cmdText, conn);
                SqlDependency dependency = new SqlDependency(cmd);

                dependency.OnChange += dbChangeNotification;

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    var batteryInfo = new battery
                    {
                        time = Convert.ToInt64(reader["time"]),
                        name = reader["name"].ToString(),
                        sensor_number = reader["sensor_number"].ToString(),
                        sensor_type = reader["sensor_type"].ToString(),
                        value = Convert.ToInt16(reader["value"])

                    };
                    batteryList.Add(batteryInfo);
                }
            }
            return batteryList;
        }

        public List<humidity> GetAllHumidities()
        {
            var humidityList = new List<humidity>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                
                conn.Open();
                SqlDependency.Start(connectionString);
                string cmdText = "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.humidity where [sensor_number] ='E110-sensortag-01' UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.humidity where [sensor_number] ='E110-sensortag-02' UNION " +
                    "select TOP(10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.humidity where[sensor_number] = 'E110-sensortag-03' UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.humidity where [sensor_number] ='E110-sensortag-04'UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.humidity where [sensor_number] ='E110-sensortag-05'";


                SqlCommand cmd = new SqlCommand(cmdText, conn);
                SqlDependency dependency = new SqlDependency(cmd);

                dependency.OnChange += dbChangeNotification;

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    var humidityInfo = new humidity
                    {
                        name = reader["name"].ToString(),
                        time = Convert.ToInt64(reader["time"]),
                        sensor_number = reader["sensor_number"].ToString(),
                        sensor_type = reader["sensor_type"].ToString(),
                        value = (float)Convert.ToDouble(reader["value"])

                    };
                    humidityList.Add(humidityInfo);
                } 

            }
            return humidityList;
        }

        public List<luminance> GetAllLuminance()
        {
            var luminanceList = new List<luminance>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {

                conn.Open();
                SqlDependency.Start(connectionString);
                string cmdText = "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.luminance where [sensor_number] ='E110-sensortag-01' UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.luminance where [sensor_number] ='E110-sensortag-02' UNION " +
                    "select TOP(10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.luminance where[sensor_number] = 'E110-sensortag-03' UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.luminance where [sensor_number] ='E110-sensortag-04'UNION " +
                    "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.luminance where [sensor_number] ='E110-sensortag-05'";


                SqlCommand cmd = new SqlCommand(cmdText, conn);
                SqlDependency dependency = new SqlDependency(cmd);

                dependency.OnChange += dbChangeNotification;

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    var luminanceInfo = new luminance
                    {
                        name = reader["name"].ToString(),
                        time = Convert.ToInt64(reader["time"]),
                        sensor_number = reader["sensor_number"].ToString(),
                        sensor_type = reader["sensor_type"].ToString(),
                        value = (float)Convert.ToDouble(reader["value"])

                    };
                    luminanceList.Add(luminanceInfo);
                }

            }
            return luminanceList;
        }

        public List<temperature> GetAllTemperatures()
        {
            var luminanceList = new List<temperature>();
            using (SqlConnection conn = new SqlConnection(connectionString))
            {

                conn.Open();
                SqlDependency.Start(connectionString);
                string cmdText = "select TOP (10)[name],[time],[sensor_number],[sensor_type],[value] from dbo.temperature";


                SqlCommand cmd = new SqlCommand(cmdText, conn);
                SqlDependency dependency = new SqlDependency(cmd);

                dependency.OnChange += dbChangeNotification;

                if (conn.State == ConnectionState.Closed)
                    conn.Open();
                var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    var temperatureInfo = new temperature
                    {
                        name = reader["name"].ToString(),
                        time = Convert.ToInt64(reader["time"]),
                        sensor_number = reader["sensor_number"].ToString(),
                        sensor_type = reader["sensor_type"].ToString(),
                        value = (float)Convert.ToDouble(reader["value"])

                    };
                    luminanceList.Add(temperatureInfo);
                }

            }
            return luminanceList;
        }

        private void dbChangeNotification(object sender, SqlNotificationEventArgs e)
        {
                _context.Clients.All.SendAsync("refreshBarometric");
        }


    }
}
