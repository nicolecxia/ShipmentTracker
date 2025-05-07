using Infrastructure.Data;
using Microsoft.EntityFrameworkCore; 
using Infrastructure.Data;
using Core.Mappings;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("ShipmentTrackerDb"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Add AutoMapper
 builder.Services.AddAutoMapper(typeof(MappingProfile)); 
 
// 注册 DbContext
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseInMemoryDatabase("ShipmentTrackerDb"));

// 注册泛型仓储
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// 注册Repository, 特定仓储,这是框架原生支持接口注入
builder.Services.AddScoped<IShipmentRepository, ShipmentRepository>();
builder.Services.AddScoped<ICarrierRepository, CarriersRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IImageService, ImageService>();

// 注册服务总线发送器 AzureServiceBusSender
builder.Services.AddSingleton<ServiceBusSender>();

// Configure file upload limits
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10 * 1024 * 1024; // 10MB
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowAllOrigins");

// Make sure to enable static file serving
// Create uploads directory if needed
var uploadsDir = Path.Combine(builder.Environment.ContentRootPath, "wwwroot", "uploads");
if (!Directory.Exists(uploadsDir))
{
    Directory.CreateDirectory(uploadsDir);
}
app.UseStaticFiles(new StaticFileOptions
{
     FileProvider = new PhysicalFileProvider(uploadsDir),
     RequestPath = "/uploads"
});

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();
}

app.Run();
