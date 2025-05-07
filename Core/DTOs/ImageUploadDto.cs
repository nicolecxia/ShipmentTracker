using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

    /// <summary>
    /// Data transfer object for image upload requests
    /// </summary>
    public class ImageUploadDto
    {
        /// <summary>
        /// The image file to upload
        /// </summary>
        [Required(ErrorMessage = "Image file is required")]
        public IFormFile ImageFile { get; set; }

        /// <summary>
        /// Optional title for the image
        /// </summary>
        [MaxLength(100, ErrorMessage = "Title cannot exceed 100 characters")]
        public string? Title { get; set; }

        /// <summary>
        /// Optional description of the image
        /// </summary>
        [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
        public string? Description { get; set; }


        /// <summary>
        /// Image quality percentage (1-100)
        /// </summary>
        [Range(1, 100, ErrorMessage = "Quality must be between 1 and 100")]
        public int Quality { get; set; } = 80;

        /// <summary>
        /// Whether to generate a thumbnail (default: true)
        /// </summary>
        public bool GenerateThumbnail { get; set; } = true;

        /// <summary>
        /// Optional width to resize the image to (maintains aspect ratio if only width is specified)
        /// </summary>
        [Range(1, 10000, ErrorMessage = "Width must be between 1 and 10000 pixels")]
        public int? TargetWidth { get; set; }

        /// <summary>
        /// Optional height to resize the image to (maintains aspect ratio if only height is specified)
        /// </summary>
        [Range(1, 10000, ErrorMessage = "Height must be between 1 and 10000 pixels")]
        public int? TargetHeight { get; set; }
    }
