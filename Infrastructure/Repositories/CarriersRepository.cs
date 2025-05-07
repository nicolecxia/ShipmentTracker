// Infrastructure/Repositories/ShipmentRepository.cs
using Core.Entities;
using Core.DTOs;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CarriersRepository : Repository<Carrier>, ICarrierRepository
    {
    //    private readonly AppDbContext _context;

        public CarriersRepository(AppDbContext context) : base(context){ }
       
        public async Task<IEnumerable<CarrierResponseDto>> GetAllCarriersAsync()
        {
            return await _context.Carriers
              .Select(c => new CarrierResponseDto
                {
                    // Map properties from Carrier to CarrierResponseDto
                    Id = c.Id,
                    Name = c.Name,
                }).ToListAsync();
        }
      
    }
}