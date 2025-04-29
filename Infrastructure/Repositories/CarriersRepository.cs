// Infrastructure/Repositories/ShipmentRepository.cs
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CarriersRepository : Repository<Carrier>, ICarrierRepository
    {
    //    private readonly AppDbContext _context;

        public CarriersRepository(AppDbContext context) : base(context){ }
       
        public async Task<IEnumerable<Carrier>> GetAllCarriersAsync()
        {
            return await _context.Carriers.ToListAsync();
        }
      
    }
}