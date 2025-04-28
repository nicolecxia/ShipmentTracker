using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<Shipment> Shipments { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed some initial data
        modelBuilder.Entity<Shipment>().HasData(
            new Shipment
            {
                Id = 1,
                TrackingNumber = "TN12345678",
                Origin = "New York",
                Destination = "Los Angeles",
                Carrier = "UPS",
                Status = "In Transit",
                ShipDate = DateTime.UtcNow.AddDays(-2),
                ETA = DateTime.UtcNow.AddDays(3),
            },
            new Shipment
            {
                Id = 2,
                TrackingNumber = "TN87654321",
                Origin = "Chicago",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Delivered",
                ShipDate = DateTime.UtcNow.AddDays(-5),
                ETA = DateTime.UtcNow.AddDays(-1),
            }
        );
    }
}