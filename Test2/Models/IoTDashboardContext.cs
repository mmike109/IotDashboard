using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Test2.Models;

namespace Test2.Models
{
    public partial class IoTDashboardContext : DbContext
    {
        public IoTDashboardContext()
        {
        }

        public IoTDashboardContext(DbContextOptions<IoTDashboardContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Project> Project { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=localhost;Database=IoTDashboard;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.ControllerName)
                    .HasColumnName("controller_name")
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.ProjectName)
                    .HasColumnName("project_name")
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.ShowOnDashboard).HasColumnName("show_on_dashboard");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
