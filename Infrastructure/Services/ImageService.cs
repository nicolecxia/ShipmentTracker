using Core.DTOs;
using Core.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats;
using Microsoft.Extensions.Logging; 

namespace Infrastructure.Services
{
public class ImageService : IImageService
{
    private readonly IHostingEnvironment _environment;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<ImageService> _logger;

    public ImageService(
        IHostingEnvironment environment,
        IUnitOfWork unitOfWork,
        ILogger<ImageService> logger)
    {
        _environment = environment;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<ImageResultDto> ProcessAndSaveImageAsync(ImageUploadDto model)
    {
        var imageFile = model.ImageFile;
        
        // Generate unique filename
        var fileExtension = Path.GetExtension(imageFile.FileName).ToLowerInvariant();
        var storedFileName = $"{Guid.NewGuid()}{fileExtension}";
        var uploadsPath = Path.Combine(_environment.WebRootPath, "uploads");
        
        Directory.CreateDirectory(uploadsPath);
        var filePath = Path.Combine(uploadsPath, storedFileName);
        
        // Save original image
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(stream);
        }
        
        // Process image and get dimensions (using ImageSharp)
        var (width, height) = await GetImageDimensionsAsync(filePath);
        
        // Create thumbnail if requested
        string thumbnailPath = null;
        if (model.GenerateThumbnail)
        {
            thumbnailPath = await CreateThumbnailAsync(filePath);
        }
        
        // Create metadata entity
        var imageMetadata = new ImageMetadata
        {
            OriginalFileName = imageFile.FileName,
            StoredFileName = storedFileName,
            ContentType = imageFile.ContentType,
            FileSize = imageFile.Length,
            Width = width,
            Height = height,
            Title = model.Title,
            Description = model.Description,
            FilePath = filePath,
            ThumbnailPath = thumbnailPath
        };
    
        
        // Save to database
        await _unitOfWork.Images.AddAsync(imageMetadata);
        await _unitOfWork.CompleteAsync();
        
        _logger.LogInformation("Image {ImageId} uploaded successfully", imageMetadata.Id);
        
        return new ImageResultDto
        {
            ImageId = imageMetadata.Id,
            ImageUrl = $"/uploads/{storedFileName}",
            ThumbnailUrl = thumbnailPath != null ? $"/uploads/thumbnails/{Path.GetFileName(thumbnailPath)}" : null,
            Metadata = imageMetadata
        };
    }
    
    public async Task<(int width, int height)> GetImageDimensionsAsync(string imagePath)
    {
        using (var image = await Image.LoadAsync(imagePath))
        {
            return (image.Width, image.Height);
        }
    }
    
    public async Task<string> CreateThumbnailAsync(string originalImagePath)
    {
        var thumbnailPath = Path.Combine(
            Path.GetDirectoryName(originalImagePath),
            "thumbnails",
            Path.GetFileName(originalImagePath));
            
        Directory.CreateDirectory(Path.GetDirectoryName(thumbnailPath));
        
        using (var image = await Image.LoadAsync(originalImagePath))
        {
            image.Mutate(x => x.Resize(new ResizeOptions
            {
                Size = new Size(200, 200),
                Mode = ResizeMode.Max
            }));
            
            await image.SaveAsync(thumbnailPath);
        }
        
        return thumbnailPath;
    }
}
}