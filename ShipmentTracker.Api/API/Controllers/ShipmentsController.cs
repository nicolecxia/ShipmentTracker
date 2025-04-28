using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShipmentsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<ShipmentsController> _logger;

    public ShipmentsController(AppDbContext context, ILogger<ShipmentsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Shipment>>> GetShipments(
        [FromQuery] string? status,
        [FromQuery] string? carrier,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            var query = _context.Shipments.AsQueryable();
            
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(s => s.Status == status);
            }
            
            if (!string.IsNullOrEmpty(carrier))
            {
                query = query.Where(s => s.Carrier == carrier);
            }
            
            var totalItems = await query.CountAsync();
            var shipments = await query
                .OrderByDescending(s => s.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            
            return Ok(new
            {
                Shipments = shipments,
                Total = totalItems,
                Page = page,
                PageSize = pageSize
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting shipments");
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    [HttpPost]
    public async Task<ActionResult<Shipment>> CreateShipment(Shipment shipment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        try
        {
            _context.Shipments.Add(shipment);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetShipments), new { id = shipment.Id }, shipment);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating shipment");
            return StatusCode(500, "An error occurred while creating the shipment.");
        }
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
    {
        try
        {
            var shipment = await _context.Shipments.FindAsync(id);
            if (shipment == null)
            {
                return NotFound();
            }
            
            shipment.Status = status;
            shipment.UpdatedAt = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating status for shipment {id}");
            return StatusCode(500, "An error occurred while updating the shipment status.");
        }
    }

    [HttpGet("carriers")]
    public ActionResult<IEnumerable<string>> GetCarriers()
    {
        return Ok(new[] { "UPS", "FedEx", "USPS", "DHL" });
    }

    [HttpGet("count")]
    public ActionResult<IEnumerable<string>> GetCount()
    {
        return Ok(new[] { 4 });
    }
}