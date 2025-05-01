using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShipmentsController : ControllerBase
{
    // private readonly AppDbContext _context;
    private readonly IShipmentRepository _repository;
    private readonly ILogger<ShipmentsController> _logger;

//Dependency Injection :使用 IShipmentRepository接口
    public ShipmentsController(IShipmentRepository repository, ILogger<ShipmentsController> logger)
    {
        _repository = repository;
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
             var (shipments, totalItems) = await _repository.GetFilteredShipmentsAsync(carrier, status, page, pageSize);

          _logger.LogInformation($"Total items: {totalItems}, Page: {page}, PageSize: {pageSize}");

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
            var createdShipment = await _repository.AddShipmentAsync(shipment);
            
            return CreatedAtAction(nameof(GetShipments), new { id = shipment.Id }, shipment);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating shipment");
            return StatusCode(500, "An error occurred while creating the shipment.");
        }
    }

     [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var shipments = await _repository.GetAllShipmentsAsync();
            return Ok(shipments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shipment>> GetShipmentsByIDAsync(int id)
        {
            var shipment = await _repository.GetShipmentsByIDAsync(id);
            if (shipment == null)
                return NotFound();
        
            if (shipment == null)
                return NotFound();

            return Ok(shipment);
        }


      [HttpPut("{trackingNumber}/status")]
        public async Task<IActionResult> UpdateStatus(string trackingNumber, [FromBody] StatusUpdateDto dto, [FromServices] ServiceBusSender busSender)
        {
            //   initial logic 
            // var success = await _repository.UpdateShipmentStatusAsync(trackingNumber, dto.Status);
            // if (!success)
            //     return NotFound();

        // Upgrade to use ServiceBusSender
        await _repository.UpdateShipmentStatusAsync(trackingNumber, dto.Status);
    
        // Service Bus send the event
         await busSender.SendStatusUpdateEvent(trackingNumber, dto.Status);

         return NoContent(); // 204 No Content
        }

        public class StatusUpdateDto
        {
            [Required]
            [RegularExpression("Pending|In Transit|Delivered|Cancelled", ErrorMessage = "Invalid status")]
            public string Status { get; set; }
        }  
}