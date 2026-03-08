using System.Threading.Channels;
using backend.Data;
using backend.Models;
using Microsoft.Extensions.Hosting;

namespace backend.Services;

public class PruningService : BackgroundService
{
   // Global Vars
   private readonly Channel<string> _channel;
   private readonly IServiceScopeFactory _scopeFactory;

   //Constructor
   public PruningService(Channel<string> channel, IServiceScopeFactory scopeFactory)
   {
      _channel = channel;
      _scopeFactory = scopeFactory;

   }

   protected override async Task ExecuteAsync(CancellationToken stoppingToken)
   {
      while(!stoppingToken.IsCancellationRequested)
      {
         var boardName = await _channel.Reader.ReadAsync(stoppingToken);
         using var scope = _scopeFactory.CreateScope();
         var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

      }
   }
}
