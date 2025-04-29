namespace Core.Entities;

public class Shipment
{
    public int Id { get; set; }
    public string? TrackingNumber { get; set; } = Guid.NewGuid().ToString();
    public string? Origin { get; set; }
    public string? Destination { get; set; }
    public string? Carrier { get; set; }
    public string Status { get; set; } = "Pending";
    public string? ShipDate { get; set; }
    public string? ETA { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}