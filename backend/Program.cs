using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=Data/ithchan.db"));

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
