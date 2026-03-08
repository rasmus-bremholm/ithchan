using System.Threading.Channels;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace backend.Services;

public class PruningService : BackgroundService
{
   // Global Vars
   private readonly Channel<string> _channel;
   private readonly IServiceScopeFactory _scopeFactory;

   private const int MaxTopicsPerBoard = 200;

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
         await using var scope = _scopeFactory.CreateAsyncScope();
         var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();


         // Ok fuck...lets do this
         // Ill probably follow the old logic way to much...

         var topicCountOnBoard = await context.Topics
         // Cant do this used to get boardName from RouteParams
         //Wait....I DO HAVE BOARDNAME!!
         .Where(t => t.BoardName == boardName)
         .CountAsync();

         if(topicCountOnBoard >= MaxTopicsPerBoard)
         {
            var oldestTopic = await context.Topics
            .Where(t => t.BoardName == boardName)
            .OrderBy(t => t.LastBumpedAt)
            .FirstOrDefaultAsync();

            if(oldestTopic != null)
            {
               context.Topics.Remove(oldestTopic);
               await context.SaveChangesAsync();
            }
         }
      }
   }
}
