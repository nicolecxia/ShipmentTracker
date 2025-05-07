using Core.Entities; 
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.DTOs;

public interface IImageService
{
     /// <summary>
        /// Processes and saves an uploaded image with metadata
        /// </summary>
        /// <param name="model">Image upload data</param>
        /// <returns>Processing result containing URLs and metadata</returns>
       Task<ImageResultDto> ProcessAndSaveImageAsync(ImageUploadDto model);

    //    /// <summary>
    //     /// Gets the dimensions of an image file
    //     /// </summary>
    //     /// <param name="imagePath">Path to the image file</param>
    //     /// <returns>Tuple containing width and height</returns>
       Task<(int width, int height)> GetImageDimensionsAsync(string imagePath);

    //     /// <summary>
    //     /// Creates a thumbnail version of an image
    //     /// </summary>
    //     /// <param name="originalImagePath">Path to the original image</param>
    //     /// <returns>Path to the generated thumbnail</returns>
        Task<string> CreateThumbnailAsync(string originalImagePath);
    
}