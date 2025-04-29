using Core.Entities; 
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ICarrierRepository : IRepository<Carrier>
{
      Task<IEnumerable<Carrier>> GetAllCarriersAsync();
    
}