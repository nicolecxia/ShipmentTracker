namespace Core.Entities;
public class ImageMetadata
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string OriginalFileName { get; set; }
    public string StoredFileName { get; set; }
    public string ContentType { get; set; }
    public long FileSize { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
    public DateTime UploadDate { get; set; } = DateTime.UtcNow;
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string FilePath { get; set; }
    public string ThumbnailPath { get; set; }

}