using Core.Entities; 
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq.Expressions; 

public interface IImageRepository : IRepository<ImageMetadata>
{
    Task<ImageMetadata> AddAsync(ImageMetadata image);
    Task<ImageMetadata> GetByIdAsync(Guid id);

      Task<IEnumerable<ImageMetadata>> GetAllImagesAsync(
        Expression<Func<ImageMetadata, bool>> filter = null,
        Func<IQueryable<ImageMetadata>, IOrderedQueryable<ImageMetadata>> orderBy = null,
        int? page = null,
        int? pageSize = null);
    
}