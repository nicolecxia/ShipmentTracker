using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Core.DTOs;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImagesController : ControllerBase
{
    // private readonly IWebHostEnvironment _environment;
    private readonly IImageService _imageService;
    private readonly IImageRepository _repository;

    public ImagesController(IImageService imageService,IImageRepository repository)
    {
        // _environment = environment;
        _imageService = imageService;
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllImages([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try{
        var images = await _repository.GetAllImagesAsync();
            
        return Ok(images);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadImage([FromForm] ImageUploadDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (model.ImageFile == null || model.ImageFile.Length == 0)
        {
            return BadRequest("No image file provided.");
        }

        // Validate file type
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
        var fileExtension = Path.GetExtension(model.ImageFile.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(fileExtension))
        {
            return BadRequest("Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed.");
        }

        // Validate file size (e.g., 5MB limit)
        if (model.ImageFile.Length > 5 * 1024 * 1024)
        {
            return BadRequest("File size exceeds the 5MB limit.");
        }

        // Process the image
        try
        {
            var result = await _imageService.ProcessAndSaveImageAsync(model);
            
            return Ok(new 
            {
                Success = true,
                Message = "Image uploaded successfully",
                ImageId = result.ImageId,
                ImageUrl = result.ImageUrl,
                ThumbnailUrl = result.ThumbnailUrl,
                Metadata = result.Metadata
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetImageMetadata(Guid id)
    {
        try{
             var image = await _repository.GetByIdAsync(id);
        
        if (image == null)
        {
            return NotFound();
        }
        
          var fileBytes = System.IO.File.ReadAllBytes(image.FilePath);
          return File(fileBytes, image.ContentType);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
       
    }

   
}