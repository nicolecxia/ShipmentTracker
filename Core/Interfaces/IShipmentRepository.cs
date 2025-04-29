using Core.Entities; 
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IShipmentRepository : IRepository<Shipment>
{
       Task<IEnumerable<Shipment>> GetAllShipmentsAsync();
        Task<IEnumerable<Shipment>> GetFilteredShipmentsAsync(string carrier, string status);
       Task<Shipment> AddShipmentAsync(Shipment shipment);
       Task<bool> UpdateShipmentStatusAsync(string trackingNumber, string status);
       Task<IEnumerable<Shipment>> GetShipmentsByIDAsync(int id);
    
}