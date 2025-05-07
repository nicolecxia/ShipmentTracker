namespace Core.DTOs;
using Core.Entities;
public class ImageResultDto
{
    /// <summary>
    /// The unique ID of the image in the database
    /// </summary>
    public Guid ImageId { get; set; }

    /// <summary>
    /// Public URL where the original image can be accessed
    /// </summary>
    public string ImageUrl { get; set; }

    /// <summary>
    /// Public URL where the thumbnail can be accessed (null if not generated)
    /// </summary>
    public string ThumbnailUrl { get; set; }

    /// <summary>
    /// Detailed metadata about the processed image
    /// </summary>
    public ImageMetadata Metadata { get; set; }

}