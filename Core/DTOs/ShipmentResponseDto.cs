namespace Core.DTOs;

public class ShipmentResponseDto
{
    public int Id { get; set; }
    public string TrackingNumber { get; set; } = string.Empty;
    public string? Origin { get; set; }
    public string? Destination { get; set; }
    public string? Carrier { get; set; } // Could be CarrierResponseDto if nested
    public string Status { get; set; } = "Pending";
    public string? ShipDate { get; set; }
    public string? ETA { get; set; }
    public DateTime CreatedAt { get; set; }
}


