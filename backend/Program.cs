using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=Data/ithchan.db"));

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
