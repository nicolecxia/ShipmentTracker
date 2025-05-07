// Infrastructure/Repositories/ShipmentRepository.cs
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions; 

namespace Infrastructure.Repositories
{
    public class ImageRepository : Repository<ImageMetadata>, IImageRepository
    {
        public ImageRepository(AppDbContext context) : base(context){ }
       
        public async Task<ImageMetadata> AddAsync(ImageMetadata image)
        {
            await _context.Images.AddAsync(image);
            return image;
        }
    
        public async Task<ImageMetadata> GetByIdAsync(Guid id)
        {
            return await _context.Images
                .FirstOrDefaultAsync(i => i.Id == id);
        }

     public async Task<IEnumerable<ImageMetadata>> GetAllImagesAsync(
        Expression<Func<ImageMetadata, bool>> filter = null,
        Func<IQueryable<ImageMetadata>, IOrderedQueryable<ImageMetadata>> orderBy = null,
        int? page = null,
        int? pageSize = null)
    {
        IQueryable<ImageMetadata> query = _context.Images;

        // Apply filter
        if (filter != null)
        {
            query = query.Where(filter);
        }

        // Apply ordering
        if (orderBy != null)
        {
            query = orderBy(query);
        }
        else
        {
            query = query.OrderByDescending(i => i.UploadDate);
        }

        // Apply pagination
        if (page.HasValue && pageSize.HasValue)
        {
            query = query.Skip((page.Value - 1) * pageSize.Value)
                       .Take(pageSize.Value);
        }

        return await query.AsNoTracking().ToListAsync();
    }
      
    }
}