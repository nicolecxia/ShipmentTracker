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

        public async Task<IEnumerable<Shipment>> GetShipmentsByStatusAsync(string status)
        {
            return await _context.Shipments
                .Where(s => s.Status == status)
                .AsNoTracking()
                .ToListAsync();
        }

   
        public async Task<IEnumerable<Shipment>> GetFilteredShipmentsAsync(string carrier, string status)
        {
            var query = _context.Shipments.AsQueryable();

            if (!string.IsNullOrEmpty(carrier))
                query = query.Where(s => s.Carrier == carrier);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(s => s.Status == status);

            return await query.AsNoTracking().ToListAsync();
        }

        public async Task<Shipment> AddShipmentAsync(Shipment shipment)
        {
            _context.Shipments.Add(shipment);
            await _context.SaveChangesAsync();
            return shipment;
        }
    }
}