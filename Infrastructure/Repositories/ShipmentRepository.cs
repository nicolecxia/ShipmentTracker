// Infrastructure/Repositories/ShipmentRepository.cs
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ShipmentRepository : Repository<Shipment>, IShipmentRepository
    {
        // private readonly AppDbContext _context;

        public ShipmentRepository(AppDbContext context) : base(context){ }

        // 实现缺失的方法
        public async Task<IEnumerable<Shipment>> GetShipmentsByStatusAsync(string status)
        {
            return await _context.Shipments
                .Where(s => s.Status == status)
                .AsNoTracking()
                .ToListAsync();
        }

        // 已存在的方法
        public async Task<IEnumerable<Shipment>> GetFilteredShipmentsAsync(string carrier, string status)
        {
            var query = _context.Shipments.AsQueryable();

            if (!string.IsNullOrEmpty(carrier))
                query = query.Where(s => s.Carrier == carrier);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(s => s.Status == status);

            return await query.AsNoTracking().ToListAsync();
        }
    }
}