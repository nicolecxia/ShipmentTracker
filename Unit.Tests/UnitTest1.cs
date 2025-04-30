namespace Unit.Tests;
using Moq;
using Xunit;
using API.Controllers;
using Core.Entities;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;

public class UnitTest1
{
    [Fact]
    public async Task GetShipments()
    {
        // Mock the repository and logger if needed
        var mockRepository = new Mock<IShipmentRepository>();
        var mockLogger = new Mock<ILogger<ShipmentsController>>();

    // Setup mock repository to return test data
    // mockRepository.Setup(x => x.GetAllAsync()) 
    //     .ReturnsAsync(new List<Shipment> { new Shipment() });

        var controller = new ShipmentsController(mockRepository.Object, mockLogger.Object);
        // Call the method to test
        var result = await controller.GetAll();
        // Assert the result
        Assert.NotNull(result);
        var okResult = Assert.IsType<OkObjectResult>(result);
        var shipments = Assert.IsType<Shipment[]>(okResult.Value);
        Assert.Single(shipments); // Verify one item was returned
    }
}
