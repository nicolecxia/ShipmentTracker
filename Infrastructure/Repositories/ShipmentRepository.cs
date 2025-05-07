// Infrastructure/Repositories/ShipmentRepository.cs
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ShipmentRepository : Repository<Shipment>, IShipmentRepository
    {
    //    private readonly AppDbContext _context;

        public ShipmentRepository(AppDbContext context) : base(context){ }

       
         public async Task<IEnumerable<Shipment>> GetAllShipmentsAsync()
        {
            return await _context.Shipments.ToListAsync();
        }

 
        public async Task<IEnumerable<Shipment>> GetShipmentsByIDAsync(int id)
        {
            return await _context.Shipments
                .Where(s => s.Id == id)
                .AsNoTracking()
                .ToListAsync();
        }
       
          public async Task<IEnumerable<Shipment>> GetShipmentsByTrackerNumberAsync(string trackingNumber)
        {
           var query = _context.Shipments.AsQueryable();

            if (!string.IsNullOrEmpty(trackingNumber))
                query = query.Where(s => s.TrackingNumber == trackingNumber);

            return await query.ToListAsync();

        }

        // public async Task<IEnumerable<Shipment>> GetShipmentsByStatusAsync(string status)
        // {
        //     return await _context.Shipments
        //         .Where(s => s.Status == status)
        //         .AsNoTracking()
        //         .ToListAsync();
        // }

   
        public async Task<(List<Shipment> Items, int TotalCount)> GetFilteredShipmentsAsync(string carrier, string status, int page, int pageSize)
        {
            var query = _context.Shipments.AsQueryable();

            if (!string.IsNullOrEmpty(carrier))
                query = query.Where(s => s.Carrier == carrier);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(s => s.Status == status);

                  // Get TOTAL count (before pagination)
            int totalCount = await query.CountAsync();

            // Apply pagination and execute query
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
          }

        public async Task<Shipment> AddShipmentAsync(Shipment shipment)
        {
            _context.Shipments.Add(shipment);
            await _context.SaveChangesAsync();
            return shipment;
        }

        public async Task<bool> UpdateShipmentStatusAsync(string trackingNumber, string status)
        {
        // Find single shipment by tracking number
         var shipment = await _context.Shipments
        .FirstOrDefaultAsync(s => s.TrackingNumber == trackingNumber);

        if (shipment == null)
        return false;

          // Update properties
            shipment.Status = status;
            shipment.UpdatedAt = DateTime.UtcNow;
             // Save changes
            await _context.SaveChangesAsync();
            return true;
        }
    }
}