using Core.Entities; 
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IShipmentRepository : IRepository<Shipment>
{
       Task<IEnumerable<Shipment>> GetAllShipmentsAsync();
       Task<(List<Shipment> Items, int TotalCount)> GetFilteredShipmentsAsync(string carrier, string status, int page, int pageSize);
       Task<Shipment> AddShipmentAsync(Shipment shipment);
       Task<bool> UpdateShipmentStatusAsync(string trackingNumber, string status);
       Task<IEnumerable<Shipment>> GetShipmentsByIDAsync(int id);
    
}