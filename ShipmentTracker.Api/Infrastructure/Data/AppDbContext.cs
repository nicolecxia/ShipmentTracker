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
        _ = modelBuilder.Entity<Shipment>().HasData(
            new Shipment
            {
                Id = 1,
                TrackingNumber = "TN12345678",
                Origin = "New York",
                Destination = "Los Angeles",
                Carrier = "UPS",
                Status = "In Transit",
                ShipDate = DateTime.UtcNow.AddDays(-2).ToString("O"),
                ETA = DateTime.UtcNow.AddDays(3).ToString("O"),
            },
            new Shipment
            {
                Id = 2,
                TrackingNumber = "TN87654321",
                Origin = "Chicago",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Delivered",
                ShipDate = DateTime.UtcNow.AddDays(-5).ToString("O"),
                ETA = DateTime.UtcNow.AddDays(-1).ToString("O"),
            }
            ,
            new Shipment
            {
                Id = 3,
                TrackingNumber = "TN87654391",
                Origin = "Toronto",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Delivered",
                ShipDate = DateTime.UtcNow.AddDays(-5).ToString("O"),
                ETA = DateTime.UtcNow.AddDays(-1).ToString("O"),
            },
            new Shipment
            {
                Id = 4,
                TrackingNumber = "TN37654321",
                Origin = "Tokyo",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Delivered",
                ShipDate = DateTime.UtcNow.AddDays(-5).ToString("O"),
                ETA = DateTime.UtcNow.AddDays(-1).ToString("O"),
            },
            new Shipment
            {
                Id = 5,
                TrackingNumber = "TN87654321",
                Origin = "Shenzhen",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Delivered",
                ShipDate = DateTime.UtcNow.AddDays(-5).ToString("O"),
                ETA = DateTime.UtcNow.AddDays(-1).ToString("O"),
            },
            new Shipment
            {
                Id = 6,
                TrackingNumber = "TN87654321",
                Origin = "Hubei",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Delivered",
                ShipDate = DateTime.UtcNow.AddDays(-5).ToString("O"),
                ETA = DateTime.UtcNow.AddDays(-1).ToString("O"),
            }
        );
    }
}