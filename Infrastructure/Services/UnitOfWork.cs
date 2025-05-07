using Infrastructure.Data; 
using Microsoft.EntityFrameworkCore;
using Infrastructure.Repositories;
public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    
    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        Images = new ImageRepository(_context);
    }
    
    public IImageRepository Images { get; private set; }
    
    public async Task<int> CompleteAsync()
    {
        return await _context.SaveChangesAsync();
    }
    
    public void Dispose()
    {
        _context.Dispose();
    }
}
