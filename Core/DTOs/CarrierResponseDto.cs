namespace Core.DTOs;

public class CarrierResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? ContactInfo { get; set; }
    public DateTime CreatedAt { get; set; }
    
}
