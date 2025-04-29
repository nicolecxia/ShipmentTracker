using Infrastructure.Data; 
using Microsoft.EntityFrameworkCore;
public class Repository<T> : IRepository<T> where T : class
{
    protected readonly AppDbContext _context;
    
    public Repository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<T?> GetByIdAsync(int id) => await _context.Set<T>().FindAsync(id);
    
    public async Task<IEnumerable<T>> GetAllAsync() => await _context.Set<T>().ToListAsync();
    
    public async Task AddAsync(T entity) => await _context.Set<T>().AddAsync(entity);
    
    public void Update(T entity) => _context.Set<T>().Update(entity);
    
    public void Delete(T entity) => _context.Set<T>().Remove(entity);
}