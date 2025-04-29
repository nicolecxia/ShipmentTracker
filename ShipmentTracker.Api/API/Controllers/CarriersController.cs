using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarriersController : ControllerBase
{
    // private readonly AppDbContext _context;
    private readonly ICarrierRepository _repository;
    private readonly ILogger<CarriersController> _logger;

//Dependency Injection :使用 IShipmentRepository接口
    public CarriersController(ICarrierRepository repository, ILogger<CarriersController> logger)
    {
        _repository = repository;
        _logger = logger;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Carrier>>> GetCarriers()
    {
        try
        {
            var carriers = await _repository.GetAllCarriersAsync();
            return Ok(carriers);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting carriers");
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    

}