using Core.Entities; 
using Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ICarrierRepository : IRepository<Carrier>
{
      Task<IEnumerable<CarrierResponseDto>> GetAllCarriersAsync();
    
}