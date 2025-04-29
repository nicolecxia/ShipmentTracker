using Core.Entities; 
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IShipmentRepository : IRepository<Shipment>
{
    Task<IEnumerable<Shipment>> GetShipmentsByStatusAsync(string status);
    Task<IEnumerable<Shipment>> GetFilteredShipmentsAsync(string carrier, string status);

       Task<IEnumerable<Shipment>> GetAllShipmentsAsync();
       Task<Shipment> AddShipmentAsync(Shipment shipment);
        // Task<Shipment?> UpdateShipmentAsync(int id, Shipment shipment);
    
}