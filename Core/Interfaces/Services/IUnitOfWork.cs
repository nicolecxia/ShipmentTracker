public interface IUnitOfWork : IDisposable
{
    IImageRepository Images { get; }
    Task<int> CompleteAsync();
}