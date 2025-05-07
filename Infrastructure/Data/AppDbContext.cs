using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
    public DbSet<Shipment> Shipments { get; set; }
    public DbSet<Carrier> Carriers { get; set; } // 单独承运商表

    public DbSet<ImageMetadata> Images { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       // 配置实体关系或约束
        modelBuilder.Entity<Shipment>(entity =>
        {
            entity.HasIndex(s => s.TrackingNumber).IsUnique();
            entity.Property(s => s.Status).HasMaxLength(20);
        });

        modelBuilder.Entity<Carrier>(entity =>
        {
            entity.HasIndex(c => c.Name).IsUnique();
            entity.Property(c => c.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<ImageMetadata>(entity =>
        {
            entity.HasIndex(i => i.OriginalFileName);
            entity.Property(i => i.ContentType).HasMaxLength(50);
            entity.Property(i => i.FilePath).HasMaxLength(200);
            entity.Property(i => i.ThumbnailPath).HasMaxLength(200);
        });


     
        SeedData(modelBuilder);
    }

       private void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Carrier>().HasData(
            new Carrier { Id = 1, Name = "UPS" },
            new Carrier { Id = 2, Name = "FedEx" },
            new Carrier { Id = 3, Name = "DHL" },
            new Carrier { Id = 4, Name = "USPS" }
        );


         modelBuilder.Entity<Shipment>().HasData(
           new Shipment
            {
                Id = 1,
                TrackingNumber = "TN12345678",
                Origin = "New York",
                Destination = "Los Angeles",
                Carrier = "UPS",
                Status = "In Transit",
                ShipDate = DateTime.UtcNow.AddDays(-2).ToString("yyyy-MM-dd"),
                ETA = DateTime.UtcNow.AddDays(3).ToString("yyyy-MM-dd"),
                ImageId = Guid.Parse("4b9376e8-2cdc-4d8f-b9ef-bc3543a9844b") // Example ImageId
            },
            new Shipment
            {
                Id = 2,
                TrackingNumber = "TN87654321",
                Origin = "Chicago",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Delivered",
                ShipDate = DateTime.UtcNow.AddDays(-5).ToString("yyyy-MM-dd"),
                ETA = DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-dd"),
            },
            new Shipment
            {
                Id = 3,
                TrackingNumber = "TN87654391",
                Origin = "Toronto",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Pending",
                ShipDate = DateTime.UtcNow.AddDays(-5).ToString("yyyy-MM-dd"),
                ETA = DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-dd"),
            },
            new Shipment
            {
                Id = 4,
                TrackingNumber = "TN37654321",
                Origin = "Tokyo",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Delivered",
                ShipDate = DateTime.UtcNow.AddDays(-5).ToString("yyyy-MM-dd"),
                ETA = DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-dd"),
            },
            new Shipment
            {
                Id = 5,
                TrackingNumber = "TN87688321",
                Origin = "Shenzhen",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Cancelled",
                ShipDate = DateTime.UtcNow.AddDays(-5).ToString("yyyy-MM-dd"),
                ETA = DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-dd"),
            },
            new Shipment
            {
                Id = 6,
                TrackingNumber = "TN87654321",
                Origin = "Hubei",
                Destination = "Miami",
                Carrier = "FedEx",
                Status = "Delivered",
                ShipDate = DateTime.UtcNow.AddDays(-5).ToString("yyyy-MM-dd"),
                ETA = DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-dd"),
            }
            
         );

          modelBuilder.Entity<ImageMetadata>().HasData(
             new ImageMetadata
                    {
                        Id = Guid.Parse("a1b2c3d4-1234-5678-9101-112131415161"),
                        OriginalFileName = "sunset.jpg",
                        StoredFileName = "sunset_a1b2c3d4.jpg",
                        ContentType = "image/jpeg",
                        FileSize = 1024 * 1024 * 2, // 2MB
                        Width = 1920,
                        Height = 1080,
                        Title = "Beautiful Sunset",
                        Description = "Sunset at Malibu Beach",
                        FilePath = "/uploads/sunset_a1b2c3d4.jpg",
                        ThumbnailPath = "/uploads/thumbnails/sunset_a1b2c3d4.jpg",
                        UploadDate = DateTime.UtcNow.AddDays(-7)
                    }
        );

      
    }
}